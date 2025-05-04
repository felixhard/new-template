"use client";

import Text from "@/components/ui/Text";
import { Button } from "@/components/ui/Button";

// This is Next.js's built-in 404 page component that handles "Not Found" errors
// It is automatically displayed when a page route cannot be found
// or when notFound() is thrown within a page

export default function NotFound() {
  return (
    <div className="flex flex-col gap-4 items-center justify-center h-screen">
      <Text textStyle="h1">404 Not Found</Text>

      <Text textStyle="body2">Sorry, this page could not be found</Text>

      {/* Provides a way for users to return to the homepage when they hit a non-existent route */}
      <Button variant="secondary" onClick={() => (window.location.href = "/")}>
        Go back
      </Button>
    </div>
  );
}
