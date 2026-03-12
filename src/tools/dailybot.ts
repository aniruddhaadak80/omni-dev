import axios from "axios";

/**
 * DailyOpsTools: Automated standups and team sync via DailyBot.
 */
export class DailyOpsTools {
    private apiKey: string;

    constructor() {
        if (!process.env.DAILYBOT_API_KEY) {
            throw new Error("DAILYBOT_API_KEY is required.");
        }
        this.apiKey = process.env.DAILYBOT_API_KEY;
    }

    async getCheckIns() {
        const response = await axios.get("https://api.dailybot.com/v1/checkins", {
            headers: { Authorization: `Bearer ${this.apiKey}` },
        });
        return response.data;
    }
}
