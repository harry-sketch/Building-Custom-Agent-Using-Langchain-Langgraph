import { ChatGroq } from "@langchain/groq";

export const groqClient = new ChatGroq({
  model: "openai/gpt-oss-20b",
  apiKey: process.env.GROQ_API_KEY,
  temperature: 0.2,
  maxRetries: 3,
});
