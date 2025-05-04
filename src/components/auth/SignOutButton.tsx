"use client";

import { signOut } from "next-auth/react";
import { useState } from "react";
import { Button } from "../ui/Button";

export default function SignOutButton() {
  const [isLoading, setIsLoading] = useState(false);

  // Handler for sign out button click
  const handleSignOut = async () => {
    setIsLoading(true);
    await signOut({ callbackUrl: "/" });
  };

  return (
    <Button variant="ghost" onClick={handleSignOut} disabled={isLoading}>
      {isLoading ? "Signing Out..." : "Sign Out"}
    </Button>
  );
}
