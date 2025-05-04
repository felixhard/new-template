import { SubscriptionTier } from "@prisma/client";

const config = {
    resend: {
        admin: "team@yoururl.com",
    },
    stripe: {
        plans: {
            starter: {
                priceId: "price_123",
                tier: "STARTER" as const,
                name: "Starter Plan",
                price: 10.0,
                currency: "USD",
                description: "Perfect for getting started",
                features: [
                    "100 PDF pages per month",
                    "5 chats per PDF",
                    "2MB file size limit",
                    "Basic support",
                ] as string[],
                authUrl: "/auth/sigin",
            },
            pro: {
                priceId: "price_123",
                tier: "PRO" as const,
                name: "Pro Plan",
                price: 100.0,
                currency: "USD",
                description: "For power users",
                features: [
                    "Unlimited PDF pages",
                    "Unlimited chats",
                    "10MB file size limit",
                    "Priority support",
                    "Advanced analytics",
                ] as string[],
                authUrl: "/auth/signin",
            },
            enterprise: {
                priceId: "price_123",
                tier: "ENTERPRISE" as const,
                name: "Enterprise Plan",
                price: 500.0,
                currency: "USD",
                description: "For large organizations",
                features: [
                    "Unlimited PDF pages",
                    "Unlimited chats",
                    "50MB file size limit",
                    "24/7 Premium support",
                    "Advanced analytics",
                    "Custom integrations",
                    "Dedicated account manager",
                ] as string[],
                authUrl: "/auth/signin",
            },
        },
    },
} as const;

export function getTierFromPriceId(priceId: string): SubscriptionTier {
    const plans = Object.values(config.stripe.plans);
    const plan = plans.find((plan) => plan.priceId === priceId);
    return (plan?.tier ?? "FREE") as SubscriptionTier;
}

export default config;
