import { GoogleGenerativeAI } from "@google/generative-ai";
import { Langfuse } from "langfuse";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * OmniBrain: The centralized reasoning engine powered by Gemini 3 Flash Preview.
 * Integrates Langfuse for observability.
 */
export class OmniBrain {
    private genAI: GoogleGenerativeAI;
    private langfuse: Langfuse;

    constructor() {
        if (!process.env.GEMINI_API_KEY) {
            throw new Error("GEMINI_API_KEY is required.");
        }
        this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        this.langfuse = new Langfuse({
            publicKey: process.env.LANGFUSE_PUBLIC_KEY,
            secretKey: process.env.LANGFUSE_SECRET_KEY,
        });
    }

    async think(prompt: string, context: string = "") {
        const trace = this.langfuse.trace({
            name: "orchestrator-think",
            input: { prompt, context },
        });

        const model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" }); // Using Flash for speed/cost
        
        try {
            const result = await model.generateContent(prompt);
            const response = result.response.text();
            
            trace.update({
                output: response,
            });

            return response;
        } catch (error: any) {
            trace.update({
                output: error.message,
            });
            throw error;
        } finally {
            await this.langfuse.flushAsync();
        }
    }
}
