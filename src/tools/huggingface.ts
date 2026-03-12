import axios from "axios";

/**
 * HuggingFaceTools: Accesses open-source AI models for specialized tasks (Vision, Audio, etc).
 */
export class HuggingFaceTools {
    private apiKey: string;

    constructor() {
        if (!process.env.HF_TOKEN) {
            throw new Error("HF_TOKEN is required.");
        }
        this.apiKey = process.env.HF_TOKEN;
    }

    async queryModel(modelId: string, data: any) {
        const response = await axios.post(
            `https://api-inference.huggingface.co/models/${modelId}`,
            data,
            { headers: { Authorization: `Bearer ${this.apiKey}` } }
        );
        return response.data;
    }
}
