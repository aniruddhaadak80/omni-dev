import { OmniBrain } from "./utils/brain";
import { OperationsAgent } from "./agents/manager";
import { EngineeringAgent } from "./agents/engineer";
import { ArchitectureAgent } from "./agents/architect";
import { SecretManager } from "./utils/secrets";
import { MemoryManager } from "./utils/memory";
import * as intro from "@clack/prompts";
import chalk from "chalk";

/**
 * Orchestrator: The master brain that routes user requests to specialized agents.
 */
class Orchestrator {
    private brain: OmniBrain;
    private ops: OperationsAgent;
    private eng: EngineeringAgent;
    private arch: ArchitectureAgent;
    private secrets: SecretManager;
    private memory: MemoryManager;

    constructor() {
        this.secrets = new SecretManager();
        this.secrets.validateAll();
        
        this.brain = new OmniBrain();
        this.memory = new MemoryManager();
        
        this.ops = new OperationsAgent(this.brain);
        this.eng = new EngineeringAgent(this.brain);
        this.arch = new ArchitectureAgent(this.brain);
    }

    async run() {
        intro.intro(chalk.cyan.bold("O M N I - D E V   H Y P E R - S W A R M"));
        intro.note("All 35+ Tool Integrations Initialized and Ready.", "System Status");

        while (true) {
            const objective = await intro.text({
                message: "Enter your complex mission objective (or 'exit'):",
                placeholder: "e.g. Build an AI-crypto tracker with Telegram alerts",
            });

            if (intro.isCancel(objective) || objective === "exit") {
                intro.outro("Omni-Dev shutting down. Swarm standby.");
                break;
            }

            const s = intro.spinner();
            s.start("Master Orchestrator analyzing and routing objective...");

            try {
                // 1. Memory recall
                await this.memory.recall(objective as string);

                // 2. Swarm execution
                const plan = await this.ops.handle(objective as string);
                s.message(chalk.yellow("Operations Strategy set. Handing to engineering..."));
                
                const code = await this.eng.handle(objective as string);
                s.message(chalk.magenta("Engineering Strategy codified. Handing to architect..."));
                
                const infra = await this.arch.handle(objective as string);
                
                // 3. Memory storage
                await this.memory.remember(objective as string, "Mission Accomplished");

                s.stop(chalk.green.bold("Mission Accomplished! 🚀"));

                intro.note(
                    `${chalk.bold.yellow("Operations:")} ${plan}\n\n` +
                    `${chalk.bold.magenta("Engineering:")} ${code}\n\n` +
                    `${chalk.bold.cyan("Architecture:")} ${infra}`,
                    "Swarm Intelligence Report"
                );
            } catch (error: any) {
                s.stop(chalk.red("Mission Failed."));
                console.error(chalk.red(`Error: ${error.message}`));
            }
        }
    }
}

const swarm = new Orchestrator();
swarm.run().catch(console.error);
