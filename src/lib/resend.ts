import config from "@/config";
import { Resend } from "resend";

if (!process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY is not set");
}

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Sends an email using the Resend service
 * @param {string | string[]} to - Recipient email address(es)
 * @param {string} subject - Email subject line
 * @param {string} text - Plain text version of email content
 * @param {string} html - HTML version of email content
 * @param {string | string[]} [replyTo] - Optional reply-to address(es)
 * @returns {Promise} Response data from Resend API
 */
export const sendEmail = async ({
    to,
    subject,
    text,
    html,
    replyTo,
}: {
    to: string | string[];
    subject: string;
    text: string;
    html: string;
    replyTo?: string | string[];
}) => {
    // Send email using Resend API
    const { data, error } = await resend.emails.send({
        from: config.resend.admin, // Sender address from config
        to,
        subject,
        text,
        html,
        ...(replyTo && { replyTo }), // Conditionally add replyTo if provided
    });

    // Handle any errors that occur during sending
    if (error) {
        console.error("Error sending email:", error.message);
        throw error;
    }

    return data;
};
