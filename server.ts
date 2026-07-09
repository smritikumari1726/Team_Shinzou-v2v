import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-loaded Gemini client
function getAIClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// 1. Job Description Bias Analysis Route
app.post("/api/analyze-job", async (req, res) => {
  const { text } = req.body;
  if (!text || typeof text !== "string") {
    return res.status(400).json({ error: "Job description text is required" });
  }

  const ai = getAIClient();

  if (!ai) {
    // Elegant fallback simulation matching the user screen so it is completely robust
    console.log("No Gemini API key found, running fallback rule-based analysis.");
    const textLower = text.toLowerCase();
    
    const highlights = [];
    let score = 95;
    
    if (textLower.includes("rockstar") || textLower.includes("aggressive")) {
      highlights.push({
        category: "Gendered Language",
        text: '"rockstar", "aggressive"',
        explanation: "These terms are often perceived as coded masculine, potentially discouraging qualified female applicants.",
      });
      score -= 15;
    }
    
    if (textLower.includes("digital native") || textLower.includes("young") || textLower.includes("hungry")) {
      highlights.push({
        category: "Age Bias",
        text: '"digital native", "young"',
        explanation: 'Phrases like "digital native" imply a preference for younger candidates, excluding experienced talent.',
      });
      score -= 16;
    }

    if (highlights.length === 0) {
      // General mock highlights if they cleared or customized the text
      highlights.push({
        category: "Inclusive Recommendation",
        text: "General phrasing",
        explanation: "Your text looks quite inclusive! Consider emphasizing growth and mentorship to attract diverse talent.",
      });
    }

    // Dynamic inclusive rewrite
    let rewrite = text;
    rewrite = rewrite.replace(/rockstar developer/gi, "expert developer");
    rewrite = rewrite.replace(/aggressive mindset/gi, "growth-oriented approach");
    rewrite = rewrite.replace(/digital native/gi, "dynamic professional");
    rewrite = rewrite.replace(/young, hungry/gi, "driven and collaborative");

    if (rewrite === text) {
      rewrite = "We are looking for an expert developer with a growth-oriented approach to scaling our infrastructure. The ideal candidate thrives in dynamic environments and is committed to excellence.";
    }

    const biasLevel = score < 70 ? "MODERATE BIAS DETECTED" : score < 50 ? "HIGH BIAS DETECTED" : "LOW BIAS";

    return res.json({
      score,
      biasLevel,
      highlights,
      rewrite,
      isFallback: true
    });
  }

  try {
    const prompt = `
You are an expert HR consultant and diversity inclusion analyst. 
Analyze the following job description for gendered language, age bias, exclusive perks, and non-inclusive phrasing.
Provide an objective fairness score from 0 (very biased) to 100 (fully inclusive and equitable).
Determine the bias level as one of: "LOW BIAS", "MODERATE BIAS DETECTED", or "HIGH BIAS DETECTED".
Identify specific highlights of biased terms with category, selected phrase text, and a helpful explanation.
Provide an elegant, fully rewritten gender-neutral, inclusive version of the text that retains the core professional requirements but removes any exclusive jargon.

Job Description to analyze:
"""
${text}
"""
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { 
              type: Type.INTEGER, 
              description: "Fairness score out of 100" 
            },
            biasLevel: { 
              type: Type.STRING, 
              description: "Determined bias level: 'LOW BIAS', 'MODERATE BIAS DETECTED', or 'HIGH BIAS DETECTED'" 
            },
            highlights: {
              type: Type.ARRAY,
              description: "List of identified non-inclusive or biased highlights",
              items: {
                type: Type.OBJECT,
                properties: {
                  category: { type: Type.STRING, description: "Category of bias, e.g. 'Gendered Language', 'Age Bias'" },
                  text: { type: Type.STRING, description: "The specific words or phrases causing bias, e.g. 'rockstar', 'digital native'" },
                  explanation: { type: Type.STRING, description: "Detailed explanation of why it is biased and its impact." }
                },
                required: ["category", "text", "explanation"]
              }
            },
            rewrite: { 
              type: Type.STRING, 
              description: "The complete inclusive rewrite of the job description" 
            }
          },
          required: ["score", "biasLevel", "highlights", "rewrite"]
        }
      }
    });

    const resultText = response.text;
    if (!resultText) {
      throw new Error("Empty response from Gemini API");
    }

    const result = JSON.parse(resultText);
    res.json(result);
  } catch (error: any) {
    console.error("Gemini analysis error:", error);
    res.status(500).json({ error: "Failed to analyze job description: " + error.message });
  }
});

// 2. HerFinance Assistant Chatbot Route
app.post("/api/chat", async (req, res) => {
  const { messages } = req.body; // Array of { role: 'user' | 'model', parts: [{ text: '...' }] }
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Messages array is required" });
  }

  const ai = getAIClient();

  if (!ai) {
    console.log("No Gemini API key found, running fallback chat response.");
    const lastMessage = messages[messages.length - 1]?.parts?.[0]?.text || "";
    const lastMsgLower = lastMessage.toLowerCase();
    
    let reply = "I would love to help you with your financial questions. To get real-time tailored government loan suggestions and interactive guidance, please add your Gemini API Key to a `.env` file in the project root as `GEMINI_API_KEY=your_key` and restart the server. For now, try asking me about starting a boutique or registering for Udyam!";
    
    if (lastMsgLower.includes("boutique") || lastMsgLower.includes("tailoring") || lastMsgLower.includes("start")) {
      reply = "That's a wonderful initiative! For a tailoring boutique, you qualify for several MSME schemes. I've updated your financial profile! Here are the primary recommendations:\n\n1. **Stree Shakti Package** (Up to ₹5 Lakhs, no collateral required)\n2. **PMMY Mudra Loan** (Shishu or Kishor category for machinery/working capital)\n3. **Skill India Grant** (For vocational training in textile & design)\n\nWould you like me to guide you through registering for Udyam MSME first to lower your interest rates by up to 2%?";
    } else if (lastMsgLower.includes("udyam") || lastMsgLower.includes("register")) {
      reply = "Registering for Udyam MSME is free and can be completed online! Here is what you need:\n- Aadhaar card of the owner\n- PAN Card\n- GSTIN (if applicable)\n\nWould you like me to help draft a checklist of required documents for you?";
    } else if (lastMsgLower.includes("loan") || lastMsgLower.includes("funding")) {
      reply = "There are several incredible options for women-led startups! Aside from the Stree Shakti Package, we can look into the Mudra scheme (loans from ₹50,000 to ₹10 Lakhs). What size of funding are you looking to secure today?";
    }

    return res.json({ text: reply, isFallback: true });
  }

  try {
    // Format messages correctly for the SDK
    // System Instruction defines HerAssistant AI
    const systemInstruction = `
You are HerAssistant AI, an empathetic, highly professional, and encouraging AI financial guide on ForHer, an economic empowerment platform for women.
Your goal is to guide women entrepreneurs, freelancers, and professionals through funding, government loan schemes, micro-grants, scaling capital, and career advancement.
Be warm, objective, professional, and clear. Speak directly to her aspirations, and provide practical, actionable financial advice.
Highlight specific programs such as the Stree Shakti Package, PMMY Mudra Loan, or Skill India Grant where relevant.
Keep replies relatively concise, readable, and structured using markdown (bullet points, bold key phrases) to avoid overwhelming the user.
    `;

    // Format chat history
    const contents = messages.map(msg => ({
      role: msg.role === "assistant" ? "model" : msg.role,
      parts: [{ text: msg.parts[0].text }]
    }));

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
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
});

// Integrate Vite Middleware
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(path.resolve(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
