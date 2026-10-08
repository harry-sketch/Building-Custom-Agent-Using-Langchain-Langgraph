import "dotenv/config";
import { runAgent } from "./agent/agent.js";

const main = async () => {
  await runAgent();
};

main();
