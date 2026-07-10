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
    
    let reply = "Hello! I am your ForHer Guide. I would love to help you interactively! To enable my AI brain, please add your Gemini API Key. For now, try asking me about finding mentorship, our legal rights page, or where to find salary insights.";
    
    if (lastMsgLower.includes("mentor") || lastMsgLower.includes("connect")) {
      reply = "We have an amazing Mentorship Hub! You can navigate to it using the top menu. There, you can connect with industry veterans and access tailored career guidance.";
    } else if (lastMsgLower.includes("legal") || lastMsgLower.includes("rights")) {
      reply = "Understanding your workplace rights is crucial. Head over to our Legal Rights section to learn about the Equal Remuneration Act, maternity benefits, and workplace harassment laws.";
    } else if (lastMsgLower.includes("salary") || lastMsgLower.includes("pay")) {
      reply = "You can evaluate your compensation using our Salary Insights tool. It provides industry-specific benchmarks to help you negotiate better pay!";
    } else if (lastMsgLower.includes("finance") || lastMsgLower.includes("loan")) {
      reply = "For specific financial guidance, loan packages, and startup funding, please visit the HerFinance page where my specialized financial counterpart can assist you!";
    }

    return res.json({ text: reply, isFallback: true });
  }

  try {
    const systemInstruction = `
You are the ForHer Guide, an empathetic, encouraging, and highly knowledgeable AI assistant for the ForHer platform.
ForHer is an economic empowerment and career advancement platform for women.
Your goal is to provide general site guidance, answer questions about our features (Mentorship Hub, Salary Insights, HerFinance, HerVenture, Legal Rights), and offer motivational support.
Be warm, objective, professional, and clear.
Keep replies relatively concise, readable, and structured using markdown (bullet points, bold key phrases) to avoid overwhelming the user.
If they ask for specialized financial or loan advice, guide them to the HerFinance page.
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
    console.error("Gemini general chat error:", error);
    res.status(500).json({ error: "Failed to generate chat response: " + error.message });
  }
}
