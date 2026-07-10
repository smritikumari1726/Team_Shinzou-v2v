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

export default app;
