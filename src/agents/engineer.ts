import { OmniBrain } from "../utils/brain";
import { ExecutionTools } from "../tools/execution";
import { ResearchTools } from "../tools/research";
import { ZyteTools } from "../tools/zyte";
import { LambdaTestTools } from "../tools/lambdatest";
import { TestmailTools } from "../tools/testmail";
import { HuggingFaceTools } from "../tools/huggingface";
import { BrowserStackTools } from "../tools/browserstack";

/**
 * EngineeringAgent: High-speed autonomous developer loop.
 */
export class EngineeringAgent {
    private brain: OmniBrain;
    private execution: ExecutionTools;
    private research: ResearchTools;
    private zyte: ZyteTools;
    private lt: LambdaTestTools;
    private testmail: TestmailTools;
    private hf: HuggingFaceTools;
    private browserstack: BrowserStackTools;

    constructor(brain: OmniBrain) {
        this.brain = brain;
        this.execution = new ExecutionTools();
        this.research = new ResearchTools();
        this.zyte = new ZyteTools();
        this.lt = new LambdaTestTools();
        this.testmail = new TestmailTools();
        this.hf = new HuggingFaceTools();
        this.browserstack = new BrowserStackTools();
    }

    async handle(task: string) {
        console.log(`[EngineeringAgent]: Starting autonomous dev/test cycle: ${task}`);
        const codeStrategy = await this.brain.think(
            `You are the Senior Engineer. Plan the code execution and QA testing for: ${task}. Mention tools like E2B, Tavily, and BrowserStack.`
        );
        return `Engineering Strategy: ${codeStrategy}`;
    }
}
