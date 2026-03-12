import axios from "axios";

/**
 * LocalizationTools: Interface for POEditor for automated app translations.
 */
export class LocalizationTools {
    private apiKey: string;

    constructor() {
        if (!process.env.POEDITOR_API_KEY) {
            throw new Error("POEDITOR_API_KEY is required.");
        }
        this.apiKey = process.env.POEDITOR_API_KEY;
    }

    async listProjects() {
        const response = await axios.post("https://api.poeditor.com/v2/projects/list", {
            api_token: this.apiKey,
        }, { headers: { "Content-Type": "application/x-www-form-urlencoded" } });
        return response.data;
    }
}
