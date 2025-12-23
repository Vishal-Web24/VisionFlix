import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

const config = {
  responseMimeType: "text/plain",
};
const model = "gemini-2.5-flash";

export async function getAIRecommendation(prompt) {
  try {
    const reponse = await ai.models.generateContent({
      model,
      config,
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });
    return reponse?.candidates?.[0]?.content?.parts?.[0]?.text;
  } catch (error) {
    console.log("Error sending message ", error);
    

    return null;
  }
}
