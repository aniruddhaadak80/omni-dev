import axios from "axios";

/**
 * TestmailTools: Programmatic email inboxes for testing auth/onboarding.
 */
export class TestmailTools {
    private apiKey: string;
    private namespace: string;

    constructor() {
        if (!process.env.TESTMAIL_API_KEY || !process.env.TESTMAIL_NAMESPACE) {
            throw new Error("Testmail credentials are required.");
        }
        this.apiKey = process.env.TESTMAIL_API_KEY;
        this.namespace = process.env.TESTMAIL_NAMESPACE;
    }

    async getEmails() {
        const response = await axios.get(
            `https://api.testmail.app/api/json?apikey=${this.apiKey}&namespace=${this.namespace}&liveconfig=true`
        );
        return response.data;
    }
}
