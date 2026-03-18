import { Request, Response } from "express";
import Expense from "../models/Expense";

// Helper — converts MongoDB _id to id for frontend consistency
const normalize = (doc: any) => {
  const obj = doc.toObject ? doc.toObject() : doc;
  return {
    ...obj,
    id: obj._id?.toString(),
    _id: undefined, // remove _id so frontend only sees id
  };
};

export const getExpense = async (req: any, res: Response) => {
  try {
    const expenses = await Expense.find({ userId: req.user.id }).sort({
      date: -1,
    });

    // Normalize every expense before sending
    res.json(expenses.map(normalize));
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const createExpense = async (req: any, res: Response) => {
  try {
    const { amount, merchant, category, date, paymentMethod, gmailMessageId } =
      req.body;

    console.log("Expense Body:", req.body);

    const expenseData = await Expense.create({
      userId: req.user.id,
      amount,
      merchant,
      category,
      date,
      paymentMethod,
      source: "manual",
    });
    // Only add if exists (VERY IMPORTANT)
    if (gmailMessageId) {
      expenseData.gmailMessageId = gmailMessageId;
    }

    const expense = await Expense.create(expenseData);

    // Normalize before sending back so frontend gets id not _id
    res.status(201).json(normalize(expense));
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteExpense = async (req: any, res: Response) => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }
    if (expense.userId.toString() !== req.user.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    await expense.deleteOne();

    res.json({ message: "Expense Deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
