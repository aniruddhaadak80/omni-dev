import { Octokit } from "octokit";

/**
 * GitHubTools: Methods for the agent to manage repositories and issues.
 */
export class GitHubTools {
    private octokit: Octokit;

    constructor() {
        if (!process.env.GITHUB_TOKEN) {
            throw new Error("GITHUB_TOKEN is required.");
        }
        this.octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
    }

    /**
     * Creates a new public/private repository.
     */
    async createRepo(name: string, description: string, isPrivate: boolean = false) {
        return await this.octokit.rest.repos.createForAuthenticatedUser({
            name,
            description,
            private: isPrivate,
        });
    }

    /**
     * Creates an issue in a repository.
     */
    async createIssue(owner: string, repo: string, title: string, body: string) {
        return await this.octokit.rest.issues.create({
            owner,
            repo,
            title,
            body,
        });
    }
}
