import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error(
        "STRIPE_SECRET_KEY is not configured in environment variables"
    );
}

// Export a singleton Stripe instance
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2024-04-10",
});
