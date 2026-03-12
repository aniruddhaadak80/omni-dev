import { Resend } from "resend";

/**
 * EmailTools: Methods for sending programmatic emails.
 */
export class EmailTools {
    private resend: Resend;

    constructor() {
        if (!process.env.RESEND_API_KEY) {
            throw new Error("RESEND_API_KEY is required.");
        }
        this.resend = new Resend(process.env.RESEND_API_KEY);
    }

    async sendEmail(to: string, subject: string, html: string) {
        return await this.resend.emails.send({
            from: "Omni-Dev <onboarding@resend.dev>",
            to,
            subject,
            html,
        });
    }
}
