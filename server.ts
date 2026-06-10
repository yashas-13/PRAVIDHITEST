import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialization helper for Gemini client as recommended in the safety guidelines
let aiClient: GoogleGenAI | null = null;
function getAi(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("GEMINI_API_KEY environment variable is required. Please set it in Settings > Secrets.");
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// 1. Instant Autocomplete / Intelligent Prompt Suggested Results (Low-Latency Response)
app.post("/api/agent/autocomplete", async (req, res) => {
  try {
    const { query } = req.body;
    if (!query || typeof query !== "string") {
      return res.status(400).json({ error: "Query is required" });
    }

    const ai = getAi();
    const systemPrompt = `You are a real-time, ultra-fast autocomplete sub-routine for PRAVIDHI, an elite software engineering agency.
Based on the partial search query or command entered by the user, immediately generate exactly 3 highly specific engineering sub-routine suggestions, custom features, or solutions that PRAVIDHI can build in response. 

Return ONLY a premium, valid JSON array of objects conforming exactly to this TS interface structure:
interface Suggestion {
  title: string; // short catchy name of proposed feature/solution (e.g. "Low-Latency Autocomplete Hub", "Realtime WebSocket Server")
  category: string; // domain like "Core Infrastructure", "AI Agents", "Frontend Orchestration"
  description: string; // 1-sentence prompt describing why it is fast/powerful
  readyTime: string; // estimated time to deploy (e.g., "Instant", "12 hours", "1 day")
}

Do not enclose the JSON in markdown blocks (like \`\`\`json). Just return the raw JSON text array. No formatting preamble. Keep suggestions sharp, futuristic, and professional.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-lite",
      contents: `Query: "${query}"`,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.2, // low temperature for precise, high-speed consistency
        responseMimeType: "application/json",
      },
    });

    const text = response.text || "[]";
    try {
      const parsed = JSON.parse(text);
      res.json({ suggestions: parsed });
    } catch {
      res.json({ suggestions: [] });
    }
  } catch (err: any) {
    console.error("Autocomplete error:", err);
    res.status(500).json({ error: err.message || "Internal server error" });
  }
});

// 2. Chat Assistant Streaming (SSE for Conversational Agent that feels alive)
app.get("/api/agent/stream", async (req, res) => {
  try {
    const { message, history } = req.query;
    if (!message || typeof message !== "string") {
      return res.status(400).write("data: " + JSON.stringify({ error: "Message parameter is required" }) + "\n\n");
    }

    const ai = getAi();
    
    // Set headers for standard Server-Sent Events (SSE)
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.flushHeaders();

    const systemInstruction = `You are PRAVIDHI CORRUPT-FREE TELEMETRY PROXY, a high-performance, direct cognitive conversational agent. 
You speak clearly, objectively, and with elite technical authority. 
Keep all answers tightly scoped, futuristic, and highly intelligent. 
PRAVIDHI is a bespoke, real-time software engineering and AI team that ships solutions directly.
Answer the user's queries using rapid-fire, ultra-precise sentences. Do not use verbose paragraphs or decorative bullet spam.
Current year is 2026. Keep the answers fast, informative, and impactful. Always emphasize instant, low-latency execution.`;

    const chatHistory = history ? JSON.parse(history as string) : [];
    
    // Reconstruct conversation contents if history exists, or use a single generation
    const contents: any[] = [];
    if (Array.isArray(chatHistory)) {
      chatHistory.forEach((item: any) => {
        contents.push({
          role: item.role === "assistant" ? "model" : "user",
          parts: [{ text: item.content }],
        });
      });
    }
    contents.push({
      role: "user",
      parts: [{ text: message }],
    });

    const responseStream = await ai.models.generateContentStream({
      model: "gemini-3.1-flash-lite",
      contents: contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    for await (const chunk of responseStream) {
      if (chunk.text) {
        res.write(`data: ${JSON.stringify({ text: chunk.text })}\n\n`);
      }
    }

    res.write("data: [DONE]\n\n");
    res.end();
  } catch (err: any) {
    console.error("Stream error:", err);
    res.write(`data: ${JSON.stringify({ error: err.message || "Streaming error occurred" })}\n\n`);
    res.end();
  }
});

// Vite middleware flow for development & static serve in production
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
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
