import { SubscriptionTier } from "@prisma/client";

// This is the email address that will be used to send emails
const config = {
    resend: {
        admin: "team@nordiqdigital.com",
    },
    stripe: {
        plans: {
            // Figma to Frontend
            ftf: {
                priceId: "price_1RAsI3QOhXfesrNrRrONobNT",
                tier: "FTF" as const,
                name: "Figma to Frontend",
                price: "1,000",
                currency: "USD",
                description: "We turn your design into a fully functional website",
                features: [
                    "Responsive design implementation",
                    "Compatible with all browsers",
                    "SEO optimization",
                    "Pixel perfect Figma conversion",
                    "Custom components",
                ] as string[],
                authUrl: "/auth/signin",
            },
            // Fullstack MVP
            fsmvp: {
                priceId: "price_1RAsIxQOhXfesrNrxTsLUeO6",
                tier: "FSMVP" as const,
                name: "Fullstack MVP",
                price: "3,000",
                currency: "USD",
                description: "For power users",
                features: [
                    "Fullstack MVP",
                    "Email integration",
                    "Payment capabilities",
                    "User Authentication",
                    "Database design and implementation",
                    "Scalable API",
                ] as string[],
                authUrl: "/auth/signin",
            },
            // Enterprise
            enterprise: {
                priceId: "price_1RA65qQOhXfesrNr4UU3zXN8",
                tier: "ENTERPRISE" as const,
                name: "Enterprise Plan",
                price: "500",
                currency: "USD",
                description: "For large organizations",
                features: [
                    "Custom integrations",
                    "Dedicated development team",
                    "Priority support",
                    "Advanced analytics",
                    
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

export function getTierName(tier: SubscriptionTier): string {
    const plans = Object.values(config.stripe.plans);
    const plan = plans.find((plan) => plan.tier === tier);
    return plan?.name || "Free Plan";
}

export default config;