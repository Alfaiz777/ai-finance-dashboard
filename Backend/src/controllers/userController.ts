import { Request, Response } from "express";
import User from "../models/User";

export const getUserProfile = async (req: any, res: Response) => {
  const user = await User.findById(req.user.id).select("-password");

  if (!user) {
    return res.status(400).json({ message: "User not Found" });
  }

  res.json(user);
};

export const updateIncome = async (req: any, res: Response) => {
  const { monthlyIncome } = req.body;

  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.monthlyIncome = monthlyIncome;

    await user.save();

    res.json({
      message: "Monthly income updated",
      monthlyIncome: user.monthlyIncome,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
