import axios from "axios";

/**
 * AppwriteTools: Orchestrates Appwrite cloud/self-hosted backend services.
 */
export class AppwriteTools {
    private endpoint: string;
    private projectId: string;
    private apiKey: string;

    constructor() {
        if (!process.env.APPWRITE_ENDPOINT || !process.env.APPWRITE_PROJECT_ID || !process.env.APPWRITE_API_KEY) {
            throw new Error("APPWRITE credentials are required.");
        }
        this.endpoint = process.env.APPWRITE_ENDPOINT;
        this.projectId = process.env.APPWRITE_PROJECT_ID;
        this.apiKey = process.env.APPWRITE_API_KEY;
    }

    private getHeaders() {
        return {
            "X-Appwrite-Project": this.projectId,
            "X-Appwrite-Key": this.apiKey,
            "Content-Type": "application/json",
        };
    }

    async createDatabase(name: string) {
        const response = await axios.post(
            `${this.endpoint}/databases`,
            { databaseId: "unique()", name },
            { headers: this.getHeaders() }
        );
        return response.data;
    }

    async createCollection(databaseId: string, name: string) {
        const response = await axios.post(
            `${this.endpoint}/databases/${databaseId}/collections`,
            { collectionId: "unique()", name, permissions: ["read(\"any\")"] },
            { headers: this.getHeaders() }
        );
        return response.data;
    }
}
