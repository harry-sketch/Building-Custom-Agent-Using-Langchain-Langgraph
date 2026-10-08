import { writeFileSync } from "node:fs";
import { stdin, stdout } from "node:process";
import { createInterface } from "node:readline/promises";
import { MemorySaver } from "@langchain/langgraph";
import { createAgent } from "langchain";
import { groqClient } from "../groq-client/groq-client.js";
import { search } from "../tavily-client/tavily-client.js";
import { calendarTool } from "../tools/tools.js";

export const runAgent = async () => {
  const rl = await createInterface({
    input: stdin,
    output: stdout,
  });
  try {
    const checkpointer = new MemorySaver();

    const agent = createAgent({
      model: groqClient,
      tools: [search, calendarTool],
      checkpointer,
    });

    const drawableGraphStateImg = await agent.drawMermaidPng();

    writeFileSync("./graph.png", new Uint8Array(drawableGraphStateImg.buffer));

    while (true) {
      const q = await rl.question("You: ");

      if (q.trim().toLowerCase() === "bye") {
        return "Good Bye";
      }

      const result = await agent.invoke(
        {
          messages: [
            {
              role: "system",
              content:
                "You are a personal assistant. User provided tools to get the information if you don't have it.",
            },
            {
              role: "user",
              content: q,
            },
          ],
        },
        {
          configurable: {
            thread_id: "1",
          },
        },
      );

      const aiMsg = result.messages[result.messages.length - 1].content;

      console.log(`Assistant: ${aiMsg}`);
    }
  } catch (error) {
    console.log("Something went wrong while running agent", error);
  } finally {
    rl.close();
  }
};
