import { signIn } from "@/app/auth";
import { NextRequest, NextResponse } from "next/server";

// POST handler for the login endpoint
export async function POST(request: NextRequest) {
    try {
        // Parse the JSON request body
        const data = await request.json();
        const email = data.email;

        // Attempt to sign in using SendGrid provider
        // This will trigger an email with a magic link
        await signIn("resend", { email, redirect: false });

        // Return success response if email is sent
        return new NextResponse(
            JSON.stringify({
                message: "Check your email for the login link!",
            }),
            {
                headers: {
                    "Content-Type": "application/json",
                },
                status: 200,
            }
        );
    } catch (error) {
        // Log and handle any errors during the sign-in process
        console.error("Error during sign-in:", error);

        // Return error response with 500 status code
        return new NextResponse(
            JSON.stringify({
                error: "Failed to send email",
                message: error,
            }),
            {
                headers: {
                    "Content-Type": "application/json",
                },
                status: 500,
            }
        );
    }
}
