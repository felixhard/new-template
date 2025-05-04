/**
 * Authentication Higher-Order Component (HOC)
 *
 * Purpose:
 * This HOC provides authentication protection for React components in a Next.js application.
 * It prevents unauthorized access to protected routes/components by automatically redirecting
 * unauthenticated users to the sign-in page.
 *
 * Features:
 * - Automatic authentication checking using NextAuth
 * - Loading state handling
 * - Automatic redirects for unauthenticated users
 * - TypeScript support with proper type inference
 * - Adds isAuthenticated prop to wrapped components
 *
 * Usage:
 * 1. Import the HOC:
 *    import withAuth from '@/hoc/withAuth';
 *
 * 2. Wrap your component:
 *    interface YourComponentProps {
 *      someProps: string;
 *      // ... other props
 *    }
 *
 *    const YourComponent: React.FC<YourComponentProps & WithAuthProps> = ({ someProps, isAuthenticated }) => {
 *      return <div>Protected Content</div>;
 *    };
 *
 *    export default withAuth(YourComponent);
 *
 * Notes:
 * - Requires NextAuth.js to be properly configured in your application
 * - Requires the NextAuth SessionProvider to be set up in your app's root
 * - The wrapped component will receive an additional 'isAuthenticated' prop
 * - See how this is done in the /app/dashboard/page.tsx file
 */

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ComponentType, useEffect } from "react";

// Define the types that will be added or modified by the HOC
export type WithAuthProps = {
  isAuthenticated: boolean;
};

// Extend component props with the HOC's own props
function withAuth<T extends object>(
  WrappedComponent: ComponentType<T & WithAuthProps>,
) {
  return function AuthComponent(props: T) {
    const router = useRouter();

    const { data: session, status } = useSession();

    const isLoading = status === "loading";
    const isAuthenticated = !!session?.user; // Check if user is authenticated

    useEffect(() => {
      if (!isLoading && !isAuthenticated) {
        router.push("/");
      }
    }, [isAuthenticated, isLoading, router]);

    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
      router.push("/auth/signin");
    }

    return (
      <WrappedComponent {...(props as T)} isAuthenticated={isAuthenticated} />
    );
  };
}

export default withAuth;
