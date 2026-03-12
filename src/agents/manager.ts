import { OmniBrain } from "../utils/brain";
import { NotionTools } from "../tools/notion";
import { GitHubTools } from "../tools/github";
import { EmailTools } from "../tools/email";
import { TelegramTools } from "../tools/telegram";
import { StripeTools } from "../tools/stripe";
import { DailyOpsTools } from "../tools/dailybot";
import { LocalizationTools } from "../tools/localization";
import { CryptoTools } from "../tools/crypto";
import { DomainTools } from "../tools/domain";

/**
 * OperationsAgent: Master of project admin, money, and communications.
 */
export class OperationsAgent {
    private brain: OmniBrain;
    private notion: NotionTools;
    private github: GitHubTools;
    private email: EmailTools;
    private telegram: TelegramTools;
    private stripe: StripeTools;
    private daily: DailyOpsTools;
    private l10n: LocalizationTools;
    private crypto: CryptoTools;
    private domain: DomainTools;

    constructor(brain: OmniBrain) {
        this.brain = brain;
        this.notion = new NotionTools();
        this.github = new GitHubTools();
        this.email = new EmailTools();
        this.telegram = new TelegramTools();
        this.stripe = new StripeTools();
        this.daily = new DailyOpsTools();
        this.l10n = new LocalizationTools();
        this.crypto = new CryptoTools();
        this.domain = new DomainTools();
    }

    async handle(task: string) {
        console.log(`[OperationsAgent]: Executing global operations: ${task}`);
        const plan = await this.brain.think(
            `You are the Operations Manager. How do we execute this task using Notion, GitHub, Stripe, and Telegram? Task: ${task}`
        );
        return `Ops Strategy: ${plan}`;
    }
}
