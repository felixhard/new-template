"use client";

import { trpc } from "@/app/_trpc/client";
import { isValidEmail } from "@/utils/validation";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { Button } from "../ui/Button";
import Input from "../ui/Input";
import Text from "../ui/Text";

export default function EmailLead() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const { mutate: createLead } = trpc.lead.create.useMutation({
    onSuccess: () => {
      toast.success("Great! We'll be in touch soon.");
      setEmail("");
      setLoading(false);
    },
    onError: (error: any) => {
      toast.error(error.message || "An error occurred");
      setLoading(false);
    },
  });

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setLoading(true);
    createLead({ email });
  };

  return (
    <div className="flex flex-col gap-2 w-full items-center justify-center pointer-events-auto">
      <Text textStyle="h5" alignment="center">
        Join our newsletter
      </Text>

      <Text textStyle="body2" alignment="center">
        Stay up to date with the latest news, updates, and offers.
      </Text>

      <form
        onSubmit={handleEmailSubmit}
        className="flex flex-col md:flex-row gap-2 w-full max-w-lg mt-2"
      >
        <Input
          placeholder="Enter your email"
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full md:flex-1"
        />

        <Button
          type="submit"
          disabled={loading}
        >
          {loading ? "Subscribing..." : "Subscribe"}
        </Button>
      </form>
    </div>
  );
}
