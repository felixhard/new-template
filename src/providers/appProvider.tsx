"use client";

import { trpc } from "@/app/_trpc/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { SessionProvider } from "next-auth/react";
import { useState } from "react";

// Helper function to generate absolute URLs for API endpoints
// Handles different environments (browser, Vercel, local development)
const absoluteUrl = (path: string) => {
  if (typeof window !== "undefined") return path; // In browser, use relative path
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}${path}`; // In Vercel environment
  return `http://localhost:${process.env.PORT ?? 3000}${path}`; // Local development
};

// Main provider component that wraps the application
const AppProviders = ({
  children,
  session,
}: {
  children: React.ReactNode;
  session: any;
}) => {
  // Initialize QueryClient with default settings
  // Using useState to ensure the client is only created once
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false, // Prevent auto-refetch when window regains focus
          },
        },
      }),
  );

  // Initialize tRPC client with batch link configuration
  // Using useState to ensure the client is only created once
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: absoluteUrl("/api/trpc"), // Configure API endpoint URL
        }),
      ],
    }),
  );

  // Provider composition pattern - wrapping multiple providers
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <SessionProvider session={session}>{children}</SessionProvider>
      </QueryClientProvider>
    </trpc.Provider>
  );
};

export default AppProviders;
