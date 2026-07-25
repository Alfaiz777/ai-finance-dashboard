import { Response } from "express";
import { z } from "zod";
import { getAIResponse } from "../services/aiService";

const chatSchema = z.object({
  message: z.string().trim().min(1, "message is required"),
});

export const chatWithAI = async (req: any, res: Response) => {
  const parsed = chatSchema.safeParse(req.body);

  // Validate input
  if (!parsed.success) {
    return res.status(400).json({
      message: parsed.error.issues[0]?.message || "Invalid message",
    });
  }

  try {
    const reply = await getAIResponse(req.user.id, parsed.data.message);

    res.json({ reply });
  } catch (error) {
    console.error("AI error:", error);
    res.status(500).json({
      message: "AI service failed. Please try again.",
    });
  }
};
