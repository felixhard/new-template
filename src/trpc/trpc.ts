import { auth } from "@/app/auth";
import { TRPCError, initTRPC } from "@trpc/server";
import { Session } from "next-auth";

// Add context type
type Context = {
    session: Session | null;
};

// Initialize TRPC instance
const t = initTRPC.context<Context>().create();
const middleware = t.middleware;

// Middleware to ensure user is authenticated
const isAuth = middleware(async (opts) => {
    const session = await auth();

    if (!session || !session.user) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    return opts.next({
        ctx: {
            userId: session.user.id,
            role: session.user.role, // Pass user role to context
        },
    });
});

// Middleware for optional authentication - doesn't throw if user isn't logged in
const isOptionalAuth = middleware(async (opts) => {
    const session = await auth();

    return opts.next({
        ctx: session
            ? {
                  userId: session.user.id,
                  role: session.user.role, // Pass user role to context
              }
            : undefined,
    });
});

// Middleware to ensure user is authenticated and has admin role
const isAdmin = middleware(async (opts) => {
    const session = await auth();

    if (!session || !session.user || session.user.role !== "ADMIN") {
        throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    return opts.next({
        ctx: {
            userId: session.user.id,
            role: session.user.role, // Pass user role to context
        },
    });
});

// Export TRPC router and procedures with different authentication levels
export const router = t.router;
export const publicProcedure = t.procedure.use(isOptionalAuth); // Accessible by all, includes auth context if logged in
export const privateProcedure = t.procedure.use(isAuth); // Only accessible by authenticated users
export const adminProcedure = t.procedure.use(isAdmin); // Only accessible by admin users
