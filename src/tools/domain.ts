import axios from "axios";

/**
 * DomainTools: Interface for Name.com API.
 */
export class DomainTools {
    private username: string;
    private apiKey: string;
    private baseUrl = "https://api.name.com/v4";

    constructor() {
        if (!process.env.NAMECOM_USERNAME || !process.env.NAMECOM_API_KEY) {
            throw new Error("NAMECOM credentials are required.");
        }
        this.username = process.env.NAMECOM_USERNAME;
        this.apiKey = process.env.NAMECOM_API_KEY;
    }

    private getAuthHeader() {
        const auth = Buffer.from(`${this.username}:${this.apiKey}`).toString("base64");
        return { Authorization: `Basic ${auth}` };
    }

    async checkAvailability(domainName: string) {
        const response = await axios.post(
            `${this.baseUrl}/domains:checkAvailability`,
            { domainNames: [domainName] },
            { headers: this.getAuthHeader() }
        );
        return response.data;
    }
}
