import { groqClient } from "../groq-client/groq-client.js";

export const runAgent = async () => {
  try {
    const gg = await groqClient.invoke([
      {
        role: "system",
        content:
          "You are a helpful assistant that translates English to French. Translate the user sentence.",
      },
      {
        role: "human",
        content: "I love programming.",
      },
    ]);

    console.log(gg.content);
  } catch (error) {
    console.log("Something went wrong while running agent", error);
  }
};
