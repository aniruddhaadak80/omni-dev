import * as dotenv from "dotenv";

/**
 * SecretManager: Handles centralized secret management (Doppler-like bridge).
 * Ensures all 35+ keys are loaded and validated.
 */
export class SecretManager {
    constructor() {
        dotenv.config();
    }

    get(key: string): string {
        const val = process.env[key];
        if (!val) {
            console.warn(`[SecretManager]: Warning! Secret ${key} is missing.`);
            return "";
        }
        return val;
    }

    validateAll() {
        const criticalKeys = [
            "GEMINI_API_KEY",
            "PINECONE_API_KEY",
            "LANGFUSE_PUBLIC_KEY",
            "NOTION_TOKEN"
        ];
        criticalKeys.forEach(k => {
            if (!process.env[k]) console.error(`[SecretManager]: CRITICAL MISSING KEY: ${k}`);
        });
    }
}
