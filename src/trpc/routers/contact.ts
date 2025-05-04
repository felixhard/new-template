import config from "@/config";
import { sendEmail } from "@/lib/resend";
import { z } from "zod";
import { publicProcedure, router } from "../trpc";

export const contactRouter = router({
    sendContact: publicProcedure
        .input(
            z.object({
                name: z.string().min(1, "Name is required"),
                email: z.string().email("Invalid email address"),
                phone: z.string().optional(),
                budget: z.string().min(1, "Budget is required"),
                message: z.string().min(1, "Message is required"),
            })
        )
        .mutation(async ({ input }) => {
            const { name, email, phone, budget, message } = input;

            await sendEmail({
                to: config.resend.admin,
                subject: `New Contact Form Submission from ${name}`,
                text: `
                Name: ${name}
                Email: ${email}
                Phone: ${phone || "Not provided"}
                Budget: ${budget}
                Message: ${message}
                                `,
                html: `
                <h2>New Contact Form Submission</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
                <p><strong>Budget:</strong> ${budget}</p>
                <p><strong>Message:</strong> ${message}</p>
                                `,
                replyTo: email,
            });

            return { success: true };
        }),
});
