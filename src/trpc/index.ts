import { contactRouter } from "./routers/contact";
import { leadRouter } from "./routers/lead";
import { stripeRouter } from "./routers/stripe";
import { userRouter } from "./routers/user";
import { router } from "./trpc";

export const appRouter = router({
    // Add other routers here as needed after your create them
    user: userRouter,
    stripe: stripeRouter,
    lead: leadRouter,
    contact: contactRouter,
});

export type AppRouter = typeof appRouter;
