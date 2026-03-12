import { Sandbox } from "@e2b/code-interpreter";

/**
 * ExecutionTools: Provides a secure cloud sandbox for AI to run code.
 */
export class ExecutionTools {
    private apiKey: string;

    constructor() {
        if (!process.env.E2B_API_KEY) {
            throw new Error("E2B_API_KEY is required.");
        }
        this.apiKey = process.env.E2B_API_KEY;
    }

    /**
     * Runs Python code in a secure E2B sandbox.
     */
    async runPython(code: string) {
        const sandbox = await Sandbox.create("base", { apiKey: this.apiKey });
        try {
            const execution = await sandbox.runCode(code);
            return {
                results: execution.results,
                logs: execution.logs,
                error: execution.error,
            };
        } finally {
            await sandbox.kill();
        }
    }
}
