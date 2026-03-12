import axios from "axios";

/**
 * CryptoTools: Real-time blockchain and crypto data via Blockchair.
 */
export class CryptoTools {
    private apiKey?: string;

    constructor() {
        this.apiKey = process.env.BLOCKCHAIR_API_KEY;
    }

    async getAddressInfo(chain: string, address: string) {
        const url = `https://api.blockchair.com/${chain}/dashboards/address/${address}${this.apiKey ? `?key=${this.apiKey}` : ""}`;
        const response = await axios.get(url);
        return response.data;
    }
}
