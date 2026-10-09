// Todo: => Step 1 => Start => llm => conditoinal-edge (Tools) => llm => end

import { writeFileSync } from "node:fs";
import { stdin as input, stdout as output } from "node:process";
import { createInterface } from "node:readline/promises";
import { llmApp } from "../compile/graph-compile.js";
import { memoryConfig } from "../utils/config.js";

export const runLLmModel = async () => {
  const drawableGraphState = await llmApp.getGraphAsync();

  const drawableGraphStateImg = await drawableGraphState.drawMermaidPng();

  const graphStateArrayBuffer = await drawableGraphStateImg.arrayBuffer();

  writeFileSync("./re-act-llm.png", new Uint8Array(graphStateArrayBuffer));

  const rl = createInterface({
    input,
    output,
  });

  try {
    while (true) {
      const question = await rl.question("You: ");

      if (question.trim().toLowerCase() === "bye") {
        return "Good-Bye";
      }

      const aiMsg = await llmApp.invoke(
        {
          messages: [
            {
              role: "system",
              content:
                "You are a smart peronsal assistant name Siri who delivers answers very politely. Only use preferred tool according to the question when necessary.",
            },
            {
              role: "human",
              content: question,
            },
          ],
        },
        memoryConfig,
      );

      console.log(
        `Assistant: ${aiMsg.messages[aiMsg.messages.length - 1].content}`,
      );
    }
  } catch (error) {
    console.log("Something went wrong", error);
  } finally {
    rl.close();
  }
};
