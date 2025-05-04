"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Button from "../ui/Button";
import Input from "../ui/Input";

// Props type definition for the authentication form
type AuthFormProps = {
    session: any; // Represents the user's session state
};

export default function AuthForm({ session }: AuthFormProps) {
    // State management for email input and loading state
    const [email, setEmail] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // Handles the email sign-in form submission
    const handleEmailSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevent default form submission behavior

        setIsLoading(true);
        try {
            // Send POST request to login API endpoint
            const response = await fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: email }),
            });

            const data = await response.json();

            if (!response.ok) {
                toast.error(data.message);
                setIsLoading(false);
                return;
            }

            setIsLoading(false);

            toast.success("Email sent. Check your inbox.");
        } catch (error) {
            toast.error("Failed to send email.");

            setIsLoading(false);
        }
    };

    // Redirect to dashboard if user is already authenticated
    useEffect(() => {
        if (session) {
            window.location.href = "/dashboard";
        }
    }, [session]);

    // Render the sign-in form with email input and submit button
    return (
        <form onSubmit={handleEmailSignIn}>
            <div className="flex flex-col gap-4 w-[300px] mt-4">
                <Input
                    label={"Email"}
                    type="email"
                    name="email"
                    placeholder="jon@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <Button type="submit" isLoading={isLoading} width="w-full">
                    Sign In
                </Button>
            </div>
        </form>
    );
}
