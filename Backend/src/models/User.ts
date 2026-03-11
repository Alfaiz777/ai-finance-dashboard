import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    monthlyIncome: {
      type: Number,
      default: 0,
    },

    currency: {
      type: String,
      default: "INR",
    },

    gmailConnected: {
      type: Boolean,
      default: false,
    },

    splitWiseConnected: {
      type: Boolean,
      default: false,
    },

    gmailAccessToken: String,
    gmailRefreshToken: String,
  },
  { timestamps: true },
);

export default mongoose.model("User", userSchema);
