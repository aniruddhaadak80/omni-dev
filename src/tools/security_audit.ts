import axios from "axios";

/**
 * SecurityAuditTools: Interface for AstraSecurity scans and Codecov reports.
 */
export class SecurityAuditTools {
    private codecovToken: string;

    constructor() {
        if (!process.env.CODECOV_TOKEN) {
            throw new Error("CODECOV_TOKEN is required.");
        }
        this.codecovToken = process.env.CODECOV_TOKEN;
    }

    async getCodeCoverage(owner: string, repo: string) {
        const response = await axios.get(`https://codecov.io/api/v2/github/${owner}/repos/${repo}`, {
            headers: { Authorization: `token ${this.codecovToken}` },
        });
        return response.data;
    }

    async triggerScan(url: string) {
        return { message: `AstraSecurity scan queued for ${url}` };
    }
}
