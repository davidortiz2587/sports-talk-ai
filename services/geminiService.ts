import { GoogleGenAI } from "@google/genai";
import { Sport, ConversationResponse } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const fetchConversationTopics = async (sport: Sport): Promise<ConversationResponse> => {
  try {
    const prompt = `Give me 3-5 interesting conversation topics based on the absolute latest news, scores, or drama for ${sport}. 
    Focus on recent events that people are talking about right now. 
    Format the output as a clean list of topics with a brief explanation for each.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        systemInstruction: "You are a knowledgeable sports caster. You provide up-to-date, engaging conversation starters. Keep it concise.",
      },
    });

    const text = response.text || "No topics found.";
    
    // Extract grounding chunks (sources) if available
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    
    // Filter chunks to only those that have web data
    const sources = groundingChunks.filter(chunk => chunk.web);

    return {
      text,
      sources
    };
  } catch (error) {
    console.error("Error fetching conversation topics:", error);
    throw new Error("Failed to get conversation topics. Please try again.");
  }
};
