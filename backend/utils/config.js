import { groqClient } from "../groq-client/groq-client.js";

export const memoryConfig = {
  configurable: {
    thread_id: "1",
  },
};

export const callLLM = async (state) => {
  const response = await groqClient.invoke(state.messages);

  return {
    messages: [response],
  };
};

export const whereToGo = (state) => {
  const isToolCalled =
    state.messages[state.messages.length - 1].tool_calls?.length > 0;

  if (isToolCalled) {
    return "call-tools";
  }
  return "end";
};
