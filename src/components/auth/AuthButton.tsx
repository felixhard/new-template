import { useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "../ui/Button";
import SignOutButton from "./SignOutButton";

// Component that displays different buttons based on user authentication status
export default function AuthButton() {
  // Get current session status using Next-Auth hook
  const session = useSession();

  return (
    <>
      {/* If user is authenticated, show Dashboard and Sign Out buttons */}
      {session.status === "authenticated" ? (
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-0">
          <Link href="/dashboard">
            <Button variant="ghost">Dashboard</Button>
          </Link>

          <SignOutButton />
        </div>
      ) : (
        // If user is not authenticated, show Sign In button
        <Link href="/auth/signin">
          <Button size="sm" variant="default">
            Sign In
          </Button>
        </Link>
      )}
    </>
  );
}
