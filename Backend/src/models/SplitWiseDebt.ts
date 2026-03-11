import mongoose from "mongoose";

const splitwiseDebtSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    personName: String,

    amount: Number,

    direction: {
      type: String,
      enum: ["you_owe", "they_owe"],
      required: true,
    },

    groupName: String,

    currency: {
      type: String,
      default: "INR",
    },
  },
  { timestamps: true },
);

export default mongoose.model("SplitwiseDebt", splitwiseDebtSchema);
