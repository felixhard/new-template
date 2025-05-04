import { db } from "@/db";
import { stripe } from "@/lib/stripe";
import { privateProcedure, router } from "../trpc";

export const userRouter = router({
    // Endpoint to find a user by their ID
    // Only accessible to authenticated users (privateProcedure)
    find: privateProcedure.query(async ({ ctx }) => {
        return db.user.findFirst({
            where: {
                id: ctx.userId,
            },
        });
    }),

    // Endpoint to create or retrieve a Stripe customer for the user
    // Only accessible to authenticated users (privateProcedure)
    createStripeCustomer: privateProcedure.mutation(async ({ ctx }) => {
        // Find the user in the database
        const user = await db.user.findUnique({
            where: {
                id: ctx.userId,
            },
        });

        // Throw error if user doesn't exist
        if (!user) {
            throw new Error("User not found.");
        }

        // Return existing Stripe customer ID if it exists
        if (user.stripeCustomerId) {
            return { stripeCustomerId: user.stripeCustomerId };
        }

        // Handle case where email might be null
        const email = user.email ?? undefined;

        // Create new Stripe customer
        const customer = await stripe.customers.create({
            email: email,
        });

        // Update user in database with new Stripe customer ID
        const updatedUser = await db.user.update({
            where: {
                id: user.id,
            },
            data: {
                stripeCustomerId: customer.id,
            },
        });

        // Return the Stripe customer ID
        return { stripeCustomerId: updatedUser.stripeCustomerId };
    }),
});
