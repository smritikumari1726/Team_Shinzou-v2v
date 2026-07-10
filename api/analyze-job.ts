import { GoogleGenAI, Type } from "@google/genai";

function getAIClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") return null;
  return new GoogleGenAI({
    apiKey,
    httpOptions: { headers: { "User-Agent": "aistudio-build" } },
  });
}

export default async function handler(req: any, res: any) {
  const { text } = req.body || {};
  if (!text || typeof text !== "string") {
    return res.status(400).json({ error: "Job description text is required" });
  }

  const ai = getAIClient();

  if (!ai) {
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
      highlights.push({
        category: "Inclusive Recommendation",
        text: "General phrasing",
        explanation: "Your text looks quite inclusive! Consider emphasizing growth and mentorship to attract diverse talent.",
      });
    }

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
    const prompt = \`
You are an expert HR consultant and diversity inclusion analyst. 
Analyze the following job description for gendered language, age bias, exclusive perks, and non-inclusive phrasing.
Provide an objective fairness score from 0 (very biased) to 100 (fully inclusive and equitable).
Determine the bias level as one of: "LOW BIAS", "MODERATE BIAS DETECTED", or "HIGH BIAS DETECTED".
Identify specific highlights of biased terms with category, selected phrase text, and a helpful explanation.
Provide an elegant, fully rewritten gender-neutral, inclusive version of the text that retains the core professional requirements but removes any exclusive jargon.

Job Description to analyze:
"""
\${text}
"""
    \`;

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
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
}
