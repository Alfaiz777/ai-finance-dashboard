import { Request, Response } from "express";
import SplitWiseDebt from "../models/SplitWiseDebt";

export const getDebts = async (req: any, res: Response) => {
  const debts = await SplitWiseDebt.find({ userId: req.user.id });

  res.json(debts);
};
