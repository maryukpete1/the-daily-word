// This is the new, correct code for index.ts
import { Mastra } from "@mastra/core/mastra";

// 1. We import our NEW agent's "brain"
import { dailyWordAgent } from "./agents/daily-word-agent";

// 2. We tell Mastra to load our NEW agent
export const mastra = new Mastra({
  agents: {
    dailyWordAgent,
  },
});