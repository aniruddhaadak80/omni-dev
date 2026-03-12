import { Client } from "@notionhq/client";

/**
 * NotionTools: Methods for the agent to interact with Notion workspaces.
 */
export class NotionTools {
    private notion: Client;

    constructor() {
        if (!process.env.NOTION_TOKEN) {
            throw new Error("NOTION_TOKEN is required.");
        }
        this.notion = new Client({ auth: process.env.NOTION_TOKEN });
    }

    /**
     * Creates a new page within a parent page.
     */
    async createProject(title: string, parentPageId: string) {
        return await this.notion.pages.create({
            parent: { 
                type: "page_id",
                page_id: parentPageId 
            },
            properties: {
                title: {
                    title: [{ text: { content: title } }]
                },
            },
        });
    }

    /**
     * Creates a task database (Kanban board) under a page.
     */
    async createTasksDatabase(pageId: string, title: string) {
        return await (this.notion.databases.create as any)({
            parent: { 
                type: "page_id",
                page_id: pageId 
            },
            title: [{ text: { content: title } }],
            properties: {
                Name: { title: {} },
                Status: {
                    select: {
                        options: [
                            { name: "To Do", color: "red" },
                            { name: "In Progress", color: "yellow" },
                            { name: "Done", color: "green" },
                        ],
                    },
                },
            },
        });
    }
}
