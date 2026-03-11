import mongoose from "mongoose";

const assetSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    name: String,

    institution: String,

    amount: Number,

    type: {
      type: String,
      enum: ["bank", "fd", "stock", "mutual_fund"],
      required: true,
    },

    metadata: {
      type: Object,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Asset", assetSchema);
