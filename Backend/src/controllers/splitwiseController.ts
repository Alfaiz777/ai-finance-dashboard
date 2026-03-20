import { Request, Response } from "express";
import SplitWiseDebt from "../models/SplitWiseDebt";

const normalize = (doc: any) => {
  const obj = doc.toObject ? doc.toObject() : doc;
  return {
    ...obj,
    id: obj._id?.toString(),
    _id: undefined,
  };
};

export const getDebts = async (req: any, res: Response) => {
  try {
    const debts = await SplitWiseDebt.find({ userId: req.user.id }).sort({
      createdAt: -1,
    });

    res.json(debts.map(normalize));
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
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
      currency: "INR",
    });

    res.status(201).json(normalize(debt));
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteDebt = async (req: any, res: Response) => {
  try {
    const debt = await SplitWiseDebt.findById(req.params.id);

    if (!debt) {
      return res.status(404).json({ message: "Debt not found" });
    }
    if (debt.userId.toString() !== req.user.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    await debt.deleteOne();
    res.json({ message: "Debt deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
