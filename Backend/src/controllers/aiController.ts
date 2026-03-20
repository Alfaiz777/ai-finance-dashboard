import { Response } from "express";
import { getAIResponse } from "../services/aiService";

export const chatWithAI = async (req: any, res: Response) => {
  const { message } = req.body;

  // Validate input
  if (!message || message.trim() === "") {
    return res.status(400).json({ message: "Message is required" });
  }

  try {
    // Pass the real userId from JWT token + user's message
    // getAIResponse fetches their data and calls OpenAI
    const reply = await getAIResponse(req.user.id, message);

    res.json({ reply });
  } catch (error) {
    console.error("AI error:", error);
    res.status(500).json({
      message: "AI service failed. Please try again.",
    });
  }
};
