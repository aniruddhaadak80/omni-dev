import axios from "axios";

/**
 * BrowserStackTools: Triggers automated UI tests on BrowserStack.
 */
export class BrowserStackTools {
    private username: string;
    private accessKey: string;

    constructor() {
        if (!process.env.BROWSERSTACK_USERNAME || !process.env.BROWSERSTACK_ACCESS_KEY) {
            throw new Error("BROWSERSTACK credentials are required.");
        }
        this.username = process.env.BROWSERSTACK_USERNAME;
        this.accessKey = process.env.BROWSERSTACK_ACCESS_KEY;
    }

    /**
     * Triggers a build/test on BrowserStack Automate.
     * Note: This is an example of triggering via API; real usage depends on the test suite.
     */
    async listBuilds() {
        const auth = Buffer.from(`${this.username}:${this.accessKey}`).toString("base64");
        const response = await axios.get("https://api.browserstack.com/automate/builds.json", {
            headers: { Authorization: `Basic ${auth}` },
        });
        return response.data;
    }
}
