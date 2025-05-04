import config from "@/config";
import { db } from "@/db";
import { stripe } from "@/lib/stripe";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { SubscriptionTier } from "@prisma/client";
import NextAuth, { DefaultSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// Extend NextAuth's Session type to include a custom user ID field
declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            subscriptionPlan: SubscriptionTier;
            subscriptionStatus?: string;
        } & DefaultSession["user"];
    }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
    // Configure Prisma adapter for database integration
    adapter: PrismaAdapter(db),

    // Set up Google as the provider for authentication
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],

    callbacks: {
        // Handle post-authentication redirects
        // Redirects to dashboard if user lands on home page after auth
        async redirect({ url, baseUrl }) {
            if (url === baseUrl || url === `${baseUrl}/`) {
                return `${baseUrl}/dashboard`;
            }
            return url;
        },

        // Customize session data with additional user information
        // Fetches and includes user ID, email, and name
        session: async ({ session, token }) => {
            if (session?.user) {
                session.user.id = token.uid as string;

                const user = await db.user.findUnique({
                    where: { id: token.uid as string },
                    select: {
                        email: true,
                        name: true,
                        subscriptionPlan: true,
                        subscriptionStatus: true,
                    },
                });

                if (user) {
                    session.user.email = user.email;
                    session.user.name = user.name;
                    session.user.subscriptionPlan = user.subscriptionPlan;
                    session.user.subscriptionStatus =
                        user.subscriptionStatus ?? undefined;
                }
            }
            return session;
        },

        // Handle JWT token creation and Stripe customer initialization
        // Creates a Stripe customer for new users if they don't have one
        jwt: async ({ token, user, account }) => {
            if (account && user) {
                token.uid = user.id;

                const existingUser = await db.user.findUnique({
                    where: { id: user.id },
                    select: { stripeCustomerId: true, email: true },
                });

                if (
                    existingUser &&
                    !existingUser.stripeCustomerId &&
                    user.email
                ) {
                    try {
                        const customer = await stripe.customers.create({
                            email: user.email,
                        });
                        await db.user.update({
                            where: { id: user.id },
                            data: { stripeCustomerId: customer.id },
                        });
                    } catch (error) {
                        console.error("Error creating Stripe customer:", error);
                    }
                }
            }
            return token;
        },
    },

    // Define custom authentication page routes
    pages: {
        signIn: "/auth/signin",
        signOut: "/auth/signout",
        error: "/auth/error",
        verifyRequest: "/auth/verify-request",
    },

    // Configure session handling to use JWT strategy
    // Sessions expire after 30 days
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },

    // Configure JWT token expiration to match session duration
    jwt: {
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
});
