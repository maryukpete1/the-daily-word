import { createTool } from "@mastra/core/tools";
import { z } from "zod";

/**
 * Tool 1: Gets a SPECIFIC Bible verse (WORKING)
 */
export const getSpecificVerseTool = createTool({
  id: "get-specific-verse",
  description: "Fetches a specific Bible verse when a user provides a passage (e.g., 'John 3:16').",
  inputSchema: z.object({
    passage: z.string().describe("The Bible passage to fetch, like 'John 3:16' or 'Genesis 1:1'"),
  }),
  outputSchema: z.object({
    text: z.string().describe("The full text of the verse"),
    reference: z.string().describe("The reference of the verse, e.g., 'John 3:16'"),
  }),
  execute: async ({ context }) => {
    const { passage } = context;
    const safePassage = passage.replace(/ /g, "+");
    const url = `https://bible-api.com/${safePassage}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`API returned a non-OK status: ${response.status}`);
      }
      const data = await response.json();
      const cleanedText = data.text.replace(/\n/g, " ");
      return {
        text: cleanedText,
        reference: data.reference,
      };
    } catch (error) {
      return {
        text: "Sorry, I couldn't find that verse. Please check the spelling.",
        reference: "Error",
      };
    }
  },
});


/**
 * Tool 2: Gets a RANDOM Bible verse (THE FINAL FIX)
 */
export const getRandomVerseTool = createTool({
  id: "get-random-verse",
  description: "Fetches a random Bible verse. Use this when the user asks for 'a random verse' or 'verse of the day'.",
  inputSchema: z.object({}),
  outputSchema: z.object({
    text: z.string().describe("The full text of the verse"),
    reference: z.string().describe("The reference of the verse, e.g., 'Proverbs 4:23'"),
  }),
  execute: async () => {
    
    // ---- FIX #1: Use the URL that we know works. ----
    const url = `https://bible-api.com/data/web/random`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`API returned a non-OK status: ${response.status}`);
      }
      
      // We are expecting the "box" (object) that your log showed us
      const data = await response.json();

      // ---- FIX #2: Read from the 'random_verse' object, not 'data[0]'. ----
      const verseData = data.random_verse;
      const cleanedText = verseData.text.replace(/\n/g, " ");

      return {
        text: cleanedText,
        // Use the key names from your log: 'book', 'chapter', 'verse'
        reference: `${verseData.book} ${verseData.chapter}:${verseData.verse}`,
      };
      
    } catch (error) {
      console.error("--- DEBUGGING: getRandomVerseTool FAILED ---");
      console.error("Failed URL was:", url);
      console.error("Full Error:", error);
      return {
        text: "Sorry, I couldn't fetch a random verse right now.",
        reference: "Error",
      };
    }
  },
});