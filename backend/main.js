import "dotenv/config";
import { runLLmModel } from "./graphs/graph.js";

const main = async () => {
  await runLLmModel();
};

main();
