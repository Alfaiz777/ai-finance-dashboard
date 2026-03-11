import mongoose from "mongoose";

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
      enum: [
        "Food",
        "Transport",
        "Entertainment",
        "Shopping",
        "Health",
        "Utilities",
        "Education",
        "Travel",
        "Investment",
        "Other",
      ],
      required: true,
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
      enum: ["upi", "credit_card", "debit_card", "cash", "netbanking"],
    },

    gmailMessageId: {
      type: String,
    },
  },
  { timestamps: true },
);

expenseSchema.index(
  { userId: 1, gmailMessageId: 1 },
  { unique: true, sparse: true },
);

export default mongoose.model("Expense", expenseSchema);
