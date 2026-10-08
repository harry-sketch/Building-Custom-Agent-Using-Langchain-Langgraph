import { createAgent } from "langchain";
import { groqClient } from "../groq-client/groq-client.js";

export const runAgent = async () => {
  try {
    const agent = createAgent({
      model: groqClient,
    });

    const result = await agent.invoke({
      messages: [{ role: "user", content: "Hii my name is Harsh" }],
    });

    const aiMsg = result.messages[result.messages.length - 1];

    console.log(aiMsg.content);
  } catch (error) {
    console.log("Something went wrong while running agent", error);
  }
};
