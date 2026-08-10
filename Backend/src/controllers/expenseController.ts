import { Request, Response } from "express";
import Expense from "../models/Expense";
import { categorizeExpense as categorizeExpenseAI } from "../services/aiService";
import { z } from "zod";

// Helper — converts MongoDB _id to id for frontend consistency
const normalize = (doc: any) => {
  const obj = doc.toObject ? doc.toObject() : doc;
  return {
    ...obj,
    id: obj._id?.toString(),
    _id: undefined, // remove _id so frontend only sees id
  };
};

const createExpenseSchema = z.object({
  amount: z.coerce.number().positive("Amount must be positive"),
  merchant: z.string().min(1, "Merchant is required"),
  category: z.string().min(1, "Category is required"),
  date: z.string().min(1, "Date is required"),
  paymentMethod: z.string().min(1, "Payment method is required"),
  gmailMessageId: z.string().optional(),
});

const withTimeout = <T>(promise: Promise<T>, timeoutMs: number): Promise<T> => {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(
        () => reject(new Error("AI categorization timed out")),
        timeoutMs,
      ),
    ),
  ]);
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
    const parsed = createExpenseSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        message: parsed.error.issues[0]?.message || "Invalid expense data",
      });
    }

    const { amount, merchant, category, date, paymentMethod, gmailMessageId } =
      parsed.data;

    const expenseData: any = {
      userId: req.user.id,
      amount,
      merchant,
      category,
      date,
      paymentMethod,
      source: "manual",
    };
    // Only add if exists
    if (gmailMessageId) {
      expenseData.gmailMessageId = gmailMessageId;
    }

    // 1. SAVE EXPENSE FIRST
    const expense = await Expense.create(expenseData);

    // 2. Start AI categorization in the background, but don't block response

    withTimeout(categorizeExpenseAI(`${merchant} ${amount}`), 5000)
      .then(async (aiCategory) => {
        // 3.UPDATE ONLY THE CATEGORY
        await Expense.findByIdAndUpdate(expense._id, {
          category: aiCategory,
        });
      })
      .catch((error) => {
        // 4. AI FAILURE DOES NOT AFFECT THE SAVED EXPENSE
        console.error("AI categorization failed:", error);
      });

    // 5. RESPOND IMMEDIATELY
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
