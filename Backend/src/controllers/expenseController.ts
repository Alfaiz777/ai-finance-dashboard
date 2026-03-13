import { Request, Response } from "express";
import Expense from "../models/Expense";

export const getExpense = async (req: any, res: Response) => {
  const expenses = await Expense.findOne({ userId: req.user.id }).sort({
    date: -1,
  });

  res.json(expenses);
};

export const createExpense = async (req: any, res: Response) => {
  const { amount, merchant, category, date, paymentMethod } = req.body;

  const expense = await Expense.create({
    userId: req.user.id,
    amount,
    merchant,
    category,
    date,
    paymentMethod,
    source: "manual",
  });

  res.status(201).json(expense);
};

export const deleteExpense = async (req: any, res: Response) => {
  const expense = await Expense.findById(req.params.id);

  if (!expense) {
    return res.status(404).json({ message: "Expense not found" });
  }
  if (expense.userId.toString() !== req.user.id) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  await expense.deleteOne();

  res.json({ message: "Expense Deleted" });
};
