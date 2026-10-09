import { writeFileSync } from "node:fs";
import { MessagesAnnotation, START, StateGraph } from "@langchain/langgraph";

// Info: Step 1 => Cut the Vegetables
const cutVegetables = (state) => {
  console.log("cut the vegetables");

  return state;
};

// Info: Step 2 => Boil the rice
const boilRice = (state) => {
  console.log("boil the rice");
  return state;
};

// Info: Step 3 => Add the Salt
const addSalt = (state) => {
  console.log("adding salt");
  return state;
};

// Info: Step 4 => Taste the Briyani
const tasteBriyani = (state) => {
  console.log("tasting briyani");
  return state;
};

const decisionMaking = () => {
  const gg = true;
  if (gg) {
    return "__end__";
  } else {
    return "addTheSalt";
  }
};

const firstGraph = new StateGraph(MessagesAnnotation)
  .addNode("cutTheVegetables", cutVegetables)
  .addNode("boilTheRice", boilRice)
  .addNode("addTheSalt", addSalt)
  .addNode("tastingTheBriyani", tasteBriyani)
  .addEdge(START, "cutTheVegetables")
  .addEdge("cutTheVegetables", "boilTheRice")
  .addEdge("boilTheRice", "addTheSalt")
  .addEdge("addTheSalt", "tastingTheBriyani")
  .addConditionalEdges("tastingTheBriyani", decisionMaking, {
    __end__: "__end__",
    addTheSalt: "addTheSalt",
  });

const app = firstGraph.compile();

const run = async () => {
  // Building the Graph
  const drawableGraphState = await app.getGraphAsync();

  const drawableGraphStateImg = await drawableGraphState.drawMermaidPng();

  const graphStateArrayBuffer = await drawableGraphStateImg.arrayBuffer();

  writeFileSync("./lang-graph.png", new Uint8Array(graphStateArrayBuffer));

  const finalState = await app.invoke({
    messages: [],
  });

  console.log({ finalState });
};

run();
