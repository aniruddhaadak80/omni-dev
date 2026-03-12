import axios from "axios";

/**
 * APMTools: Interface for New Relic and Honeybadger monitoring.
 */
export class APMTools {
    private newRelicApiKey: string;
    private honeybadgerApiKey: string;

    constructor() {
        if (!process.env.NEW_RELIC_API_KEY || !process.env.HONEYBADGER_API_KEY) {
            throw new Error("APM credentials (NEW_RELIC/HONEYBADGER) are required.");
        }
        this.newRelicApiKey = process.env.NEW_RELIC_API_KEY;
        this.honeybadgerApiKey = process.env.HONEYBADGER_API_KEY;
    }

    async getNewRelicSummary() {
        const response = await axios.get("https://api.newrelic.com/v2/applications.json", {
            headers: { "Api-Key": this.newRelicApiKey },
        });
        return response.data;
    }

    async checkHoneybadgerUptime() {
        const response = await axios.get("https://api.honeybadger.io/v1/check_ins", {
            headers: { "X-API-Key": this.honeybadgerApiKey },
        });
        return response.data;
    }
}
