import { Request, Response } from "express";
import SplitWiseDebt from "../models/SplitWiseDebt";
import { z } from "zod";

const normalize = (doc: any) => {
  const obj = doc.toObject ? doc.toObject() : doc;
  return {
    ...obj,
    id: obj._id?.toString(),
    _id: undefined,
  };
};

const createDebtSchema = z.object({
  personName: z.string().min(1, "Person name is required"),
  amount: z.coerce.number().positive("Amount must be positive"),
  direction: z.enum(["you_owe", "they_you"]),
  groupName: z.string().optional(),
});

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
  const parsed = createDebtSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      message: parsed.error.issues[0]?.message || "Invalid debt data",
    });
  }

  try {
    const debtData: any = {
      userId: req.user.id,
      personName: parsed.data.personName,
      amount: parsed.data.amount,
      direction: parsed.data.direction,
      currency: "INR",
    };

    if (parsed.data.groupName !== undefined) {
      debtData.groupName = parsed.data.groupName;
    }

    const debt = await SplitWiseDebt.create(debtData);

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
