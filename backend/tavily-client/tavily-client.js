import { TavilySearch } from "@langchain/tavily";

export const search = new TavilySearch({
  maxResults: 3,
  topic: "general",
});
