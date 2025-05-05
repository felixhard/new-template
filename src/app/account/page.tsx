"use client";

import { auth } from "@/app/auth";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/Button";
import StripePortal from "@/components/dashboard/StripePortal";
import Text from "@/components/ui/Text";
import withAuth, { WithAuthProps } from "@/hoc/withAuth";
import { useSession } from "next-auth/react";
import Navbar from "@/components/Navbar";
import FadeIn from "@/components/ui/FadeIn";
import SignOutButton from "@/components/auth/SignOutButton";
import { formatPlanName } from "@/lib/utils";

function AccountPage({ isAuthenticated }: WithAuthProps) {
  const { data: session } = useSession();

  console.log("Session", session);

  return (
    <div className="bg-background min-h-[100vh]">
      <Navbar />

      {isAuthenticated && (
        <div className="flex flex-col gap-10 p-10 pt-20 container mx-auto">
          <FadeIn duration={250}>
            <div className="flex justify-between items-center">
              <Text fontWeight="font-bold" textStyle="h2">Account</Text>

              <div className="flex items-center gap-4">
                <Text>Current Plan - {formatPlanName(session?.user.subscriptionPlan)}</Text>

                {session?.user.subscriptionPlan === "FREE" && (
                  <Button
                    onClick={() => {
                      window.location.href = "/#pricing";
                    }}
                  >
                    Upgrade
                  </Button>
                )}

                <Button
                variant="outline"
                  onClick={() => {
                    window.location.href = "/";
                  }}
                >
                  Home
                </Button>

                <SignOutButton />
              </div>
            </div>
            
            <div className="mt-20">              
              <div className="flex flex-col gap-4 max-w-full">
                <div className="flex justify-between items-center p-4 border border-border rounded-md">
                  <Text>Hey! {session?.user.email} you are currently on the {formatPlanName(session?.user.subscriptionPlan)} plan</Text>
                  {session?.user.subscriptionPlan !== "FREE" && <StripePortal />}
                </div>
              </div>
            </div>

            <Text className="mt-10">
              This is where your users will be able to access your service based
              on if they are authenticated or not.
            </Text>
          </FadeIn>
        </div>
      )}
    </div>
  );
}

export default withAuth(AccountPage);
