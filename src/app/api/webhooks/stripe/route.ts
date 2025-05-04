// Import necessary dependencies
import { getTierFromPriceId } from "@/config";
import { db } from "@/db";
import { sendEmail } from "@/lib/resend";
import { stripe } from "@/lib/stripe";
import { SubscriptionTier } from "@prisma/client";
import { headers } from "next/headers";
import Stripe from "stripe";

// Get the webhook secret from environment variables
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

// Define the POST handler for Stripe webhooks
export async function POST(request: Request) {
    try {
        // Get the raw request body as text
        const body = await request.text();
        // Get the Stripe signature from headers for verification
        const signature = headers().get("stripe-signature")!;

        // Verify the webhook signature to ensure it's from Stripe
        // This prevents unauthorized requests
        const event = stripe.webhooks.constructEvent(
            body,
            signature,
            webhookSecret
        );

        // Handle different types of subscription events
        switch (event.type) {
            case "customer.subscription.deleted":
                // Handle subscription cancellation
                const deletedSubscription = event.data
                    .object as Stripe.Subscription;
                console.log("Webhook received:", {
                    type: event.type,
                    subscriptionId: deletedSubscription.id,
                });

                // Find user BEFORE updating
                const cancelledUser = await db.user.findFirst({
                    where: { subscriptionId: deletedSubscription.id },
                });

                // Update user record to remove subscription details
                await db.user.updateMany({
                    where: { subscriptionId: deletedSubscription.id },
                    data: {
                        subscriptionStatus: "cancelled",
                        subscriptionId: null,
                        subscriptionPlan: "FREE" as SubscriptionTier,
                    },
                });

                // Send cancellation email
                if (cancelledUser?.email) {
                    await sendEmail({
                        to: cancelledUser.email,
                        subject: "Subscription Cancelled",
                        text: "Your subscription has been cancelled. We are sorry to see you go!",
                        html: `
                            <h1>Subscription Cancelled</h1>
                            <p>Your subscription has been cancelled. We're sorry to see you go!</p>
                            <p>You can resubscribe at any time to regain access to premium features.</p>
                        `,
                    });
                }
                break;

            case "customer.subscription.updated":
                // Handle subscription updates
                const updatedSubscription = event.data
                    .object as Stripe.Subscription;
                // Update the subscription status in our database
                await db.user.updateMany({
                    where: { subscriptionId: updatedSubscription.id },
                    data: {
                        subscriptionStatus: updatedSubscription.status,
                    },
                });
                break;

            case "checkout.session.completed":
                // Handle successful checkout completion
                const session = event.data.object as Stripe.Checkout.Session;

                // Fetch the complete subscription details from Stripe
                const subscription = await stripe.subscriptions.retrieve(
                    session.subscription as string
                );

                // Get the subscription interval (monthly/yearly)
                const subscriptionType =
                    subscription.items.data[0]?.price.recurring?.interval ||
                    null;

                // Find the user by their Stripe customer ID
                const user = await db.user.findFirst({
                    where: {
                        stripeCustomerId: session.customer as string,
                    },
                });

                // Handle the case where the user is not found
                if (!user) {
                    console.error(
                        "User not found for Stripe customer:",
                        session.customer
                    );
                    break;
                }

                // Get the price ID from the subscription
                const priceId = subscription.items.data[0]?.price.id;
                const subscriptionTier = getTierFromPriceId(priceId);

                // Update user's subscription information in database
                await db.user.update({
                    where: {
                        id: user.id,
                    },
                    data: {
                        subscriptionId: session.subscription as string,
                        subscriptionPlan: subscriptionTier,
                        subscriptionStatus: "active",
                        subscriptionType: subscriptionType,
                    },
                });

                // Send welcome email
                if (user.email) {
                    await sendEmail({
                        to: user.email,
                        subject: "Welcome to Premium!",
                        text: `Thank you for subscribing to our ${subscriptionTier} plan!`,
                        html: `
                            <h1>Welcome to Premium!</h1>
                            <p>Thank you for subscribing to our ${subscriptionTier} plan!</p>
                            <p>You now have access to all ${subscriptionTier} features.</p>
                            <p>Subscription type: ${subscriptionType}</p>
                        `,
                    });
                }
                break;
        }

        // Return success response
        return new Response(JSON.stringify({ received: true }), {
            status: 200,
        });
    } catch (error) {
        // Log and return error response if something goes wrong
        console.error("Webhook error:", error);
        return new Response(
            JSON.stringify({ error: "Webhook handler failed" }),
            {
                status: 400,
            }
        );
    }
}
