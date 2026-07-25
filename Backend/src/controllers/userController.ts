import { Request, Response } from "express";
import User from "../models/User";
import { z } from "zod";

const incomeSchema = z.object({
  monthlyIncome: z.coerce
    .number()
    .nonnegative("Monthly income cannot be negative"),
});

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
});

export const getUserProfile = async (req: any, res: Response) => {
  const user = await User.findById(req.user.id).select("-password");

  if (!user) {
    return res.status(400).json({ message: "User not Found" });
  }

  res.json(user);
};

export const updateIncome = async (req: any, res: Response) => {
  const parsed = incomeSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      message: parsed.error.issues[0]?.message || "Invalid income",
    });
  }

  const { monthlyIncome } = parsed.data;
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

export const updateProfile = async (req: any, res: Response) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const parsed = profileSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        message: parsed.error.issues[0]?.message || "Invalid profile data",
      });
    }

    user.name = parsed.data.name;

    const updatedUser = await user.save();

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
