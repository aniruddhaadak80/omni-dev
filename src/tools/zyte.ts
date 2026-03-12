import axios from "axios";

/**
 * ZyteTools: Uses Zyte (Scrapy Cloud) for advanced fetching and health checks.
 */
export class ZyteTools {
    private apiKey: string;

    constructor() {
        if (!process.env.ZYTE_API_KEY) {
            throw new Error("ZYTE_API_KEY is required.");
        }
        this.apiKey = process.env.ZYTE_API_KEY;
    }

    /**
     * Uses Zyte API to crawl a page with high reliability.
     */
    async fetchPage(url: string) {
        const auth = Buffer.from(`${this.apiKey}:`).toString("base64");
        const response = await axios.post(
            "https://api.zyte.com/v1/extract",
            { url, browserHtml: true },
            { headers: { Authorization: `Basic ${auth}`, "Content-Type": "application/json" } }
        );
        return response.data;
    }
}
