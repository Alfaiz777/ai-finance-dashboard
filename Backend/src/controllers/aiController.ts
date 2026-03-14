import { Request, Response } from "express";

export const chatWithAI = async (req: any, res: Response) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ message: "Message required" });
  }

  const text = message.toLowerCase();

  let reply = "I am still learning about your finances.";

  if (text.includes("food")) {
    reply = "You spent around ₹4500 on food this month.";
  }

  if (text.includes("highest")) {
    reply = "Your highest expense was ₹12000 on travel.";
  }

  if (text.includes("savings")) {
    reply = "You saved approximately ₹18000 this month.";
  }

  res.json({
    reply,
  });
};
