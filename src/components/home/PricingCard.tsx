"use client";

import { trpc } from "@/app/_trpc/client";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { Button } from "../ui/Button";
import Card from "../ui/Card";
import Text from "../ui/Text";
import PriceItem from "./PriceItem";
import clsx from "clsx";
import { Check } from "lucide-react";
import Link from "next/link";

interface PricingCardProps {
  plan: {
      name: string;
      price: string;
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
  const [isRedirecting, setIsRedirecting] = useState(false);

  const prepareCheckout = trpc.stripe.prepareCheckout.useMutation({
      onSuccess: ({ url }) => {
          if (url) {
              setIsRedirecting(true);
              window.location.href = url;
          }
      },
      onError: (error: unknown) => {
          console.error("Checkout error:", error);
          setIsLoading(false);
      },
  });

  const handleGetStarted = async () => {
      if (plan.name === "Enterprise Plan") {
          const element = document.getElementById("contact");
          element?.scrollIntoView({ behavior: "smooth" });
          return;
      }

      if (!session) {
          window.location.href = plan.authUrl;
          return;
      }

      setIsLoading(true);

      // Optimistically start the checkout process
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
              plan.name === "Fullstack MVP"
                  ? "border-x-2 border-t-2 border-b-2"
                  : "border-x border-t border-b"
          }
          borderColor={
              plan.name === "Fullstack MVP" ? "border-primary" : "border-border"
          }
          className={
              plan.name === "Fullstack MVP"
                  ? "shadow-[0_0_30px_rgba(64,75,227,0.2)] -mt-0 mb-0 md:-mt-8 md:mb-8"
                  : ""
          }
      >
          <div className="flex flex-col gap-4 h-full">
              <Text fontWeight="font-bold" textStyle="h5">{plan.name}</Text>

              <div className="flex gap-2 items-baseline">
                  {plan.name === "Enterprise Plan" ? (
                      <Text fontWeight="font-bold" textStyle="h3">Book a call</Text>
                  ) : (
                      <>
                          <Text textStyle="h3" fontWeight="font-bold">
                              ${plan.price}
                          </Text>
                          <Text textStyle="body2">/month</Text>
                      </>
                  )}
              </div>

              <Text textStyle="body2">{plan.description}</Text>

              <div className="flex flex-col gap-4">
                  {plan.features.map((feature) => (
                      <PriceItem key={feature} value={feature} />
                  ))}
              </div>

              <Button
                  className="mt-auto w-full backdrop-blur-md hover:border-primary/50 dark:hover:border-primary/70 dark:hover:shadow-[0_0_15px_rgba(59,130,246,0.2)] transition-all duration-300"
                  onClick={handleGetStarted}
                  disabled={isLoading || isRedirecting}
                  variant={plan.name === "Fullstack MVP" ? "default" : "outline"}
              >
                  {isLoading ? "Preparing checkout..." : isRedirecting ? "Redirecting..." : plan.name === "Enterprise Plan" ? "Book a call" : "Get Started"}
              </Button>
          </div>
      </Card>
  );
}
