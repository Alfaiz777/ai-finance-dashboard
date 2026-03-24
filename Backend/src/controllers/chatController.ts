import { Response } from "express";
import AIChats from "../models/AIChats";

const normalize = (doc: any) => {
  const obj = doc.toObject ? doc.toObject() : doc;
  return {
    ...obj,
    id: obj._id?.toString(),
    _id: undefined,
  };
};

export const getChatHistory = async (req: any, res: Response) => {
  try {
    const chats = await AIChats.find({ userId: String(req.user.id) }).sort({
      createdAt: 1,
    });

    res.json(chats.map(normalize));
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch chat history" });
  }
};
