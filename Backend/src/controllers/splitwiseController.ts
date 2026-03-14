import { Request, Response } from "express";
import SplitWiseDebt from "../models/SplitWiseDebt";

export const getDebts = async (req: any, res: Response) => {
  const debts = await SplitWiseDebt.find({ userId: req.user.id });

  res.json(debts);
};

export const createDebt = async (req: any, res: Response) => {
  const { personName, amount, direction, groupName } = req.body;

  try {
    const debt = await SplitWiseDebt.create({
      userId: req.user.id,
      personName,
      amount,
      direction,
      groupName,
    });

    res.status(201).json(debt);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
