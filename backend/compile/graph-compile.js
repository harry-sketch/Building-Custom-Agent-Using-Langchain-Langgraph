import {
  END,
  MemorySaver,
  MessagesAnnotation,
  START,
  StateGraph,
} from "@langchain/langgraph";
import { toolsNode } from "../tools/toolsNode.js";
import { callLLM, whereToGo } from "../utils/config.js";

const checkpointer = new MemorySaver();

const graph = new StateGraph(MessagesAnnotation)
  .addNode("call-llm", callLLM)
  .addNode("tool-node", toolsNode)
  .addEdge(START, "call-llm")
  .addEdge("tool-node", "call-llm")
  .addConditionalEdges("call-llm", whereToGo, {
    "call-tools": "tool-node",
    end: END,
  });

export const llmApp = graph.compile({
  checkpointer,
});
