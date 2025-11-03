import { Agent } from "@mastra/core/agent";
import { google } from "@ai-sdk/google";

// 1. We import the two "skills" we built from our tool file
import { 
  getSpecificVerseTool, 
  getRandomVerseTool 
} from "../tools/bible-tool";

// 2. We define and export our new agent
export const dailyWordAgent = new Agent({
  // This is the agent's name
  name: "Daily Word Agent",
  
  // This is the "job description" we give to the AI.
  // This is the *most important* part.
// These are the NEW, SMARTER instructions
instructions: `
  You are a helpful assistant named 'Daily Word'.
  Your ONLY job is to provide Bible verses to users.

  - If a user asks for a specific verse, you MUST first convert their
    request into the format 'Book Chapter:Verse'.
    Examples:
      - User says: "genesis chapter 1 verse 1" -> You convert to: "Genesis 1:1"
      - User says: "john 3 16" -> You convert to: "John 3:16"
      - User says: "1st Corinthians 13:4" -> You convert to: "1 Corinthians 13:4"
  - After you have converted the text, you MUST call the
    'get-specific-verse' tool with that formatted string.

  - If a user asks for a random verse (e.g., "give me a verse", "random verse"),
    you MUST use the 'get-random-verse' tool.

  - After the tool gives you the text and reference, your job is to
    format it nicely for the user. For example:
    "Here is your verse: [Verse Text] ([Reference])"
`,
  // This tells the agent *which* AI model to use for its "brain".
  // The brain's job is to read your `instructions` and the user's message,
  // and decide WHICH tool to use.
 model: google("gemini-2.5-flash"),
  // 3. This is the "phone list" of skills the agent is allowed to use.
  // It connects the brain to the tools.
  tools: {
    getSpecificVerseTool,
    getRandomVerseTool,
  },
});