import axios from "axios";

/**
 * MonitoringTools: Interface for Sentry and Datadog.
 */
export class MonitoringTools {
    private sentryToken: string;
    private datadogApiKey: string;

    constructor() {
        if (!process.env.SENTRY_TOKEN || !process.env.DATADOG_API_KEY) {
            throw new Error("Monitoring credentials (SENTRY/DATADOG) are required.");
        }
        this.sentryToken = process.env.SENTRY_TOKEN;
        this.datadogApiKey = process.env.DATADOG_API_KEY;
    }

    async createSentryProject(organizationSlug: string, teamSlug: string, name: string) {
        const response = await axios.post(
            `https://sentry.io/api/0/teams/${organizationSlug}/${teamSlug}/projects/`,
            { name },
            { headers: { Authorization: `Bearer ${this.sentryToken}` } }
        );
        return response.data;
    }

    async sendDatadogMetric(metric: string, points: number[][]) {
        const response = await axios.post(
            `https://api.datadoghq.com/api/v1/series`,
            { series: [{ metric, points, type: "gauge" }] },
            { headers: { "DD-API-KEY": this.datadogApiKey } }
        );
        return response.data;
    }
}
