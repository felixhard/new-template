import { db } from "@/db";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { publicProcedure, router } from "../trpc";

export const leadRouter = router({
    create: publicProcedure
        .input(
            z.object({
                email: z.string().email(),
            })
        )
        .mutation(async ({ input }) => {
            // Check if email already exists
            const existingLead = await db.lead.findUnique({
                where: { email: input.email },
            });

            if (existingLead) {
                throw new TRPCError({
                    code: "CONFLICT",
                    message: "This email is already registered",
                });
            }

            return db.lead.create({
                data: input,
            });
        }),
});
