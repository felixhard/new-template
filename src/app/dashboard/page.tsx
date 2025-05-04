"use client";

import StripePortal from "@/components/dashboard/StripePortal";
import Button from "@/components/ui/Button";
import Text from "@/components/ui/Text";
import withAuth, { WithAuthProps } from "@/hoc/withAuth";
import { useSession } from "next-auth/react";

function DashboardPage({ isAuthenticated }: WithAuthProps) {
    const { data: session } = useSession();

    console.log("Session", session);

    return (
        <div className="bg-background min-h-[100vh]">
            {isAuthenticated && (
                <div className="flex flex-col gap-10 p-10 container mx-auto">
                    <div className="flex justify-between items-center">
                        <Text textStyle="h2">This is the dashboard</Text>

                        <div className="flex items-center gap-4">
                            <Text>
                                Current Plan - {session?.user.subscriptionPlan}
                            </Text>

                            {session?.user.subscriptionPlan === "FREE" && (
                                <Button
                                    onClick={() => {
                                        window.location.href = "/#pricing";
                                    }}
                                >
                                    Upgrade
                                </Button>
                            )}

                            {session?.user.subscriptionPlan !== "FREE" && (
                                <StripePortal />
                            )}
                        </div>
                    </div>

                    <Text>
                        This is where your users will be able to access your
                        service based on if they are authenticated or not.
                    </Text>
                </div>
            )}
        </div>
    );
}

export default withAuth(DashboardPage);
