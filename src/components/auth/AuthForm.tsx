"use client";

import { useEffect } from "react";
import toast from "react-hot-toast";
import { Button } from "../ui/Button";
import { signIn } from "next-auth/react";
import { Icon } from "@iconify/react";

// Props type definition for the authentication form
type AuthFormProps = {
  session: any; // Represents the user's session state
};

export default function AuthForm({ session }: AuthFormProps) {
  // Handle Google Sign In
  const handleGoogleSignIn = async () => {
    try {
      await signIn("google", { callbackUrl: "/dashboard" });
    } catch (error) {
      toast.error("Failed to sign in with Google.");
    }
  };

  // Redirect to dashboard if user is already authenticated
  useEffect(() => {
    if (session) {
      window.location.href = "/dashboard";
    }
  }, [session]);

  // Render the sign-in button for Google
  return (
    <div className="flex flex-col gap-4 w-[300px] mt-4">
      <Button onClick={handleGoogleSignIn} size="default">
        <Icon icon="ri:google-fill" className="h-5 w-5" />
        Sign in with Google
      </Button>
    </div>
  );
}
