"use client";

import { trpc } from "@/app/_trpc/client";
import { isValidEmail } from "@/utils/validation";
import { useState } from "react";
import toast from "react-hot-toast";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Text from "../ui/Text";

export default function EmailLead() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    const {
        mutateAsync: createLead,
        isPending,
        isSuccess,
    } = trpc.lead.create.useMutation({
        onSuccess: () => {
            toast.success("You're subscribed!");
            setEmail("");
        },
        onError: () => {
            toast.error("Something went wrong.");
        },
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        setError("");
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!email) {
            setError("Email is required");
            return;
        }

        if (!isValidEmail(email)) {
            setError("Please enter a valid email address");
            return;
        }

        await createLead({ email });
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
                <Input
                    placeholder="Email"
                    name="Email"
                    onChange={handleChange}
                    className={error ? "border-red-500" : ""}
                />

                <Button
                    type="submit"
                    disabled={isPending || isSuccess}
                    isLoading={isPending}
                >
                    Subscribe
                </Button>
            </form>

            {error && (
                <Text textStyle="body1" alignment="center" color="text-red-100">
                    {error}
                </Text>
            )}
        </div>
    );
}
