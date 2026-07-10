import { GoogleGenAI } from "@google/genai";

function getAIClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") return null;
  return new GoogleGenAI({
    apiKey,
    httpOptions: { headers: { "User-Agent": "aistudio-build" } },
  });
}

export default async function handler(req: any, res: any) {
  const { messages } = req.body || {}; 
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Messages array is required" });
  }

  const ai = getAIClient();
  if (!ai) {
    const lastMessage = messages[messages.length - 1]?.parts?.[0]?.text || "";
    const lastMsgLower = lastMessage.toLowerCase();
    
    let reply = "I would love to help you with your financial questions. To get real-time tailored government loan suggestions and interactive guidance, please add your Gemini API Key to Vercel and redeploy. For now, try asking me about starting a boutique or registering for Udyam!";
    
    if (lastMsgLower.includes("boutique") || lastMsgLower.includes("tailoring") || lastMsgLower.includes("start")) {
      reply = "That's a wonderful initiative! For a tailoring boutique, you qualify for several MSME schemes. I've updated your financial profile! Here are the primary recommendations:\n\n1. **Stree Shakti Package** (Up to ₹5 Lakhs, no collateral required)\n2. **PMMY Mudra Loan** (Shishu or Kishor category for machinery/working capital)\n3. **Skill India Grant** (For vocational training in textile & design)\n\nWould you like me to guide you through registering for Udyam MSME first to lower your interest rates by up to 2%?";
    } else if (lastMsgLower.includes("udyam") || lastMsgLower.includes("register")) {
      reply = "Registering for Udyam MSME is free and can be completed online! Here is what you need:\n- Aadhaar card of the owner\n- PAN Card\n- GSTIN (if applicable)\n\nWould you like me to help draft a checklist of required documents for you?";
    } else if (lastMsgLower.includes("loan") || lastMsgLower.includes("funding") || lastMsgLower.includes("collateral")) {
      reply = "There are several incredible options for women-led startups! Aside from the Stree Shakti Package, we can look into the Mudra scheme (loans from ₹50,000 to ₹10 Lakhs). What size of funding are you looking to secure today?";
    }

    return res.json({ text: reply, isFallback: true });
  }

  try {
    const systemInstruction = `
You are HerAssistant AI, an empathetic, highly professional, and encouraging AI financial guide on ForHer, an economic empowerment platform for women.
Your goal is to guide women entrepreneurs, freelancers, and professionals through funding, government loan schemes, micro-grants, scaling capital, and career advancement.
Be warm, objective, professional, and clear. Speak directly to her aspirations, and provide practical, actionable financial advice.
Highlight specific programs such as the Stree Shakti Package, PMMY Mudra Loan, or Skill India Grant where relevant.
Keep replies relatively concise, readable, and structured using markdown (bullet points, bold key phrases) to avoid overwhelming the user.
    `;

    const contents = messages.map((msg: any) => ({
      role: msg.role === "assistant" ? "model" : msg.role,
      parts: [{ text: msg.parts[0].text }]
    }));

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      }
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Gemini chat error:", error);
    res.status(500).json({ error: "Failed to generate chat response: " + error.message });
  }
}
