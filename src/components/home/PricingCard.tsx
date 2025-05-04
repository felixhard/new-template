"use client";

import { trpc } from "@/app/_trpc/client";
import { useSession } from "next-auth/react";
import { useState } from "react";
import Button from "../ui/Button";
import Card from "../ui/Card";
import Text from "../ui/Text";
import PriceItem from "./PriceItem";

interface PricingCardProps {
    plan: {
        name: string;
        price: number;
        authUrl: string;
        currency: string;
        features: string[];
        description: string;
        priceId: string;
    };
}

export default function PricingCard({ plan }: PricingCardProps) {
    const { data: session } = useSession();

    const [isLoading, setIsLoading] = useState(false);

    const prepareCheckout = trpc.stripe.prepareCheckout.useMutation({
        onSuccess: ({ url }) => {
            if (url) window.location.href = url;
        },
        onError: (error: unknown) => {
            console.error("Checkout error:", error);
            setIsLoading(false);
        },
    });

    const handleGetStarted = async () => {
        if (!session) {
            window.location.href = plan.authUrl;
            return;
        }

        setIsLoading(true);

        await prepareCheckout.mutate({
            email: session.user?.email || "",
            planId: plan.priceId,
        });
    };

    return (
        <Card
            width="w-full"
            padding="p-8"
            bgColor="bg-background"
            border={
                plan.name === "Pro Plan"
                    ? "border-x-2 border-t-2"
                    : "border-x border-t"
            }
            borderColor={
                plan.name === "Pro Plan" ? "border-primary" : "border-border"
            }
            className={
                plan.name === "Pro Plan"
                    ? "shadow-orange -mt-0 mb-0 md:-mt-8 md:mb-8"
                    : ""
            }
        >
            <div className="flex flex-col gap-4 h-full">
                <Text textStyle="h5">{plan.name}</Text>

                <div className="flex gap-2 items-baseline">
                    <Text textStyle="h3">
                        ${plan.price} {plan.currency}
                    </Text>

                    <Text textStyle="body2">/month</Text>
                </div>

                <Text textStyle="body2">{plan.description}</Text>

                <div className="flex flex-col gap-4">
                    {plan.features.map((feature) => (
                        <PriceItem key={feature} value={feature} />
                    ))}
                </div>

                <Button
                    width="w-full"
                    className="mt-auto"
                    onClick={handleGetStarted}
                    disabled={isLoading}
                    variant={plan.name === "Pro Plan" ? "primary" : "tertiary"}
                >
                    {isLoading ? "Loading..." : "Get Started"}
                </Button>
            </div>
        </Card>
    );
}
