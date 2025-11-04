// ---- FIX #1: Import 'registerApiRoute' (lowercase 'r') ----
import { registerApiRoute } from "@mastra/core/server";
import type { Mastra } from "@mastra/core/mastra";
import type { Context } from "hono";

// This type definition (the "guest list") is correct
type AppEnv = {
  Variables: {
    mastra: Mastra;
  };
};

// ---- FIX #2: Call 'registerApiRoute' (lowercase 'r') ----
export const a2aAgentRoute = registerApiRoute(
  "/a2a/agent/:agentId", // The path with a variable

  // The second argument is an OBJECT
  {
    method: "POST",

    // The handler function is *inside* that object
    handler: async (c: Context<AppEnv>) => {

      const mastra = c.get("mastra");
      const { agentId } = c.req.param();
      const body = await c.req.json();

      // 1. Validate the A2A request (This is all correct)
      if (body.jsonrpc !== "2.0" || !body.id || !body.params) {
        return c.json({
          jsonrpc: "2.0",
          id: body.id || null,
          error: { code: -32600, message: "Invalid Request. Must be JSON-RPC 2.0" },
        });
      }

      // 2. Find the agent (This is all correct)
      const agent = mastra.getAgent(agentId);
      if (!agent) {
        return c.json({
          jsonrpc: "2.0",
          id: body.id,
          error: { code: -32601, message: `Agent '${agentId}' not found` },
        });
      }

      // 3. Extract the user's message (This is all correct)
      const userMessage = body.params.message?.parts?.[0]?.text || "";
      const channelId = body.params.context?.channel_id || "unknown_channel";

      // 4. Run our agent's "brain" (This is all correct)
      const response = await agent.generate(
        `User message: "${userMessage}" (from channel: ${channelId})`
      );

      // 5. Format the agent's simple text reply BACK into the A2A protocol
      return c.json({
        jsonrpc: "2.0",
        id: body.id,
        result: {
          task: body.params.task_id || `task_${Date.now()}`,
          status: "completed",
          message: { parts: [{ text: response.text }] },
          artifacts: [],
        },
      });
    }
  }
);