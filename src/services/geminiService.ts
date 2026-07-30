import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export async function generateClinicalContent(prompt: string, systemInstruction?: string): Promise<GenerateContentResponse> {
  const models = ["gemini-3-flash-preview", "gemini-2.0-flash", "gemini-1.5-flash"];
  let lastError: any = null;

  for (const model of models) {
    try {
      console.log(`Attempting generation with model: ${model}`);
      const response = await ai.models.generateContent({
        model: model,
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        config: {
          systemInstruction: systemInstruction || "You are a medical expert in Anesthesia and ICU. Provide evidence-based information based on ASA, ESAIC, and ESICM guidelines.",
          tools: [{ googleSearch: {} }],
        },
      });
      return response;
    } catch (error) {
      console.error(`Error with model ${model}:`, error);
      lastError = error;
      // If it's a 500/RPC error, try the next model
      if (error instanceof Error && (error.message.includes('500') || error.message.includes('Rpc failed'))) {
        continue;
      }
      throw error;
    }
  }

  throw lastError || new Error("All models failed to generate content.");
}
