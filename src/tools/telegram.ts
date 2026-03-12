import axios from "axios";

/**
 * TelegramTools: Provides push notification capabilities.
 */
export class TelegramTools {
    private botToken: string;
    private chatId: string;

    constructor() {
        if (!process.env.TELEGRAM_BOT_TOKEN) {
            throw new Error("TELEGRAM_BOT_TOKEN is required.");
        }
        if (!process.env.TELEGRAM_CHAT_ID) {
            throw new Error("TELEGRAM_CHAT_ID is required.");
        }
        this.botToken = process.env.TELEGRAM_BOT_TOKEN;
        this.chatId = process.env.TELEGRAM_CHAT_ID;
    }

    async sendAlert(message: string) {
        const url = `https://api.telegram.org/bot${this.botToken}/sendMessage`;
        return await axios.post(url, {
            chat_id: this.chatId,
            text: `🔔 *Omni-Dev Alert*\n\n${message}`,
            parse_mode: "Markdown",
        });
    }
}
