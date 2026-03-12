import { tavily } from "@tavily/core";

/**
 * ResearchTools: Advanced web search for agents.
 */
export class ResearchTools {
    private apiKey: string;

    constructor() {
        if (!process.env.TAVILY_API_KEY) {
            throw new Error("TAVILY_API_KEY is required.");
        }
        this.apiKey = process.env.TAVILY_API_KEY;
    }

    async search(query: string) {
        const tvly = tavily({ apiKey: this.apiKey });
        const response = await tvly.search(query, {
            searchDepth: "advanced",
            maxResults: 5,
        });
        return response;
    }
}
