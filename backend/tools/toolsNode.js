import { ToolNode } from "@langchain/langgraph/prebuilt";
import { searchTool } from "../tavily-client/tavily-client.js";
import { calendarTool } from "./tools.js";

export const tools = [calendarTool, searchTool];

export const toolsNode = new ToolNode(tools);
