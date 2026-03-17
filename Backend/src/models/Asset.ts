import mongoose from "mongoose";

const assetSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    type: {
      type: String,
      enum: ["bank", "fd", "stock", "mutual_fund"],
      required: true,
    },

    name: { type: String, required: true },
    amount: { type: Number, required: true },
    institution: { type: String },

    // BANK
    accountType: { type: String, enum: ["savings", "current"] },
    accountNumberLast4: { type: String },

    // FD
    principal: { type: Number },
    interestRate: { type: Number },
    startDate: { type: String },
    maturityDate: { type: String },
    maturityAmount: { type: Number },

    // STOCK
    ticker: { type: String },
    quantity: { type: Number },
    buyPrice: { type: Number },
    currentPrice: { type: Number },
    profitLoss: { type: Number },

    // MUTUAL FUND
    units: { type: Number },
    nav: { type: Number },
    investedAmount: { type: Number },
    currentValue: { type: Number },

    lastUpdated: { type: String },
  },
  { timestamps: true },
);

export default mongoose.model("Asset", assetSchema);
