import axios from "axios";

/**
 * LambdaTestTools: Triggers parallel browser tests on LambdaTest.
 */
export class LambdaTestTools {
    private username: string;
    private accessKey: string;

    constructor() {
        if (!process.env.LT_USERNAME || !process.env.LT_ACCESS_KEY) {
            throw new Error("LambdaTest credentials are required.");
        }
        this.username = process.env.LT_USERNAME;
        this.accessKey = process.env.LT_ACCESS_KEY;
    }

    async listBuilds() {
        const auth = Buffer.from(`${this.username}:${this.accessKey}`).toString("base64");
        const response = await axios.get("https://api.lambdatest.com/automation/api/v1/builds", {
            headers: { Authorization: `Basic ${auth}` },
        });
        return response.data;
    }
}
