import "next-auth";

declare module "next-auth" {
    interface User {
        role: string; // Use role instead of isAdmin
    }

    interface Session {
        user: {
            id: string;
            role: string; // Use role instead of isAdmin
        };
    }

    interface JWT {
        uid: string;
        role: string; // Use role instead of isAdmin
        stripeCustomerId?: string;
    }
}
