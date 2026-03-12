import axios from "axios";

/**
 * CloudTools: Interface for DigitalOcean API.
 */
export class CloudTools {
    private apiToken: string;
    private baseUrl = "https://api.digitalocean.com/v2";

    constructor() {
        if (!process.env.DO_TOKEN) {
            throw new Error("DO_TOKEN is required.");
        }
        this.apiToken = process.env.DO_TOKEN;
    }

    private getHeaders() {
        return {
            Authorization: `Bearer ${this.apiToken}`,
            "Content-Type": "application/json",
        };
    }

    async listDroplets() {
        const response = await axios.get(`${this.baseUrl}/droplets`, { headers: this.getHeaders() });
        return response.data;
    }

    async createDroplet(name: string, region: string = "nyc1", size: string = "s-1vcpu-1gb") {
        const response = await axios.post(
            `${this.baseUrl}/droplets`,
            {
                name,
                region,
                size,
                image: "ubuntu-20-04-x64",
            },
            { headers: this.getHeaders() }
        );
        return response.data;
    }
}
