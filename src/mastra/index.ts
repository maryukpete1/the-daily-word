import { Mastra } from "@mastra/core/mastra";
import { dailyWordAgent } from "./agents/daily-word-agent";

// 1. Import the route definition we just exported
import { a2aAgentRoute } from "./routes/a2a-route";

export const mastra = new Mastra({
  agents: {
    dailyWordAgent,
  },

  // 2. This is the correct property from your previous error: 'apiRoutes' (lowercase 'a')
  server: {
    apiRoutes: [
      a2aAgentRoute 
    ],
  },
});