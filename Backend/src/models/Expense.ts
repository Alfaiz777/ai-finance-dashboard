import mongoose from "mongoose";
import { EXPENSE_CATEGORIES } from "../constants/expenseCategories";

const expenseSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    merchant: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      enum: EXPENSE_CATEGORIES,
      required: true,
    },

    aiCategorized: {
      type: Boolean,
      default: false,
    },

    date: {
      type: Date,
      required: true,
    },

    source: {
      type: String,
      enum: ["gmail", "manual"],
      required: true,
    },

    paymentMethod: {
      type: String,
      enum: ["upi", "credit_card", "debit_card", "cash", "net_banking"],
    },

    gmailMessageId: {
      type: String,
    },
  },
  { timestamps: true },
);

expenseSchema.index(
  { userId: 1, gmailMessageId: 1 },
  {
    unique: true,
    partialFilterExpression: { gmailMessageId: { $type: "string" } },
  },
);

export default mongoose.model("Expense", expenseSchema);
