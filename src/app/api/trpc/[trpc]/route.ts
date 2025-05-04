// Import the main tRPC router instance and the fetch adapter handler
import { appRouter } from "@/trpc";
import { createContext } from "@/trpc/context";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

// Create a request handler function that processes incoming HTTP requests
const handler = async (req: Request) =>
    fetchRequestHandler({
        // Define the base endpoint for all tRPC API routes
        endpoint: "/api/trpc",
        // Pass through the incoming request
        req,
        // Use the main tRPC router instance
        router: appRouter,
        // Create context with session information
        createContext,
        // Error handling middleware
        onError: ({ error, path }) => {
            console.error(`[tRPC] Error in ${path ?? "<no-path>"}:`, error);
        },
    });

// Export the handler for both GET and POST HTTP methods
export { handler as GET, handler as POST };
