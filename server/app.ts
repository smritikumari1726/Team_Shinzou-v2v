import express from "express";
import { analyzeJobHandler, chatHandler } from "./handlers.js";

const app = express();
app.use(express.json());

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// 1. Job Description Bias Analysis Route
app.post("/api/analyze-job", analyzeJobHandler);

// 2. HerFinance Assistant Chatbot Route
app.post("/api/chat", chatHandler);

// 3. General Site Guidance Chatbot Route
import generalChatHandler from "../api/general-chat.js";
app.post("/api/general-chat", generalChatHandler);

export default app;
