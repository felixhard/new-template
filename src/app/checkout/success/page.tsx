"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CheckoutSuccessPage() {
  const router = useRouter();

  useEffect(() => {
    // Give a small delay to allow webhook to process
    const timeout = setTimeout(() => {
      router.replace("/dashboard");
    }, 2000);

    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <div>
      <h1>Checkout Success</h1>

      <p>Your subscription is being activated...</p>
    </div>
  );
}
