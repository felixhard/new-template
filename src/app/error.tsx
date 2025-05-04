"use client";

import Button from "@/components/ui/Button";
import Text from "@/components/ui/Text";

// This is a global error page component in Next.js that automatically handles runtime errors
// It serves as a fallback UI when an error occurs in the application
// The component will be rendered when an error is caught in the nearest error boundary

export default function Error() {
    return (
        <div className="flex flex-col gap-4 items-center justify-center h-screen">
            <Text textStyle="h1">Oops something went wrong</Text>

            <Text textStyle="body2">Please try again later</Text>

            {/* Provides a way for users to navigate back to the homepage when an error occurs */}
            <Button
                variant="secondary"
                onClick={() => (window.location.href = "/")}
            >
                Go back
            </Button>
        </div>
    );
}
