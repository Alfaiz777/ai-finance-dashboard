import { Request, Response } from "express";
import User from "../models/User";

export const getUserProfile = async (req: any, res: Response) => {
  const user = await User.findById(req.user.id).select("-password");

  if (!user) {
    return res.status(400).json({ message: "User not Found" });
  }

  res.json(user);
};
