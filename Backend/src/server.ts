import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./config/db";

import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import expenseRoutes from "./routes/expenseRoutes";
import assetRoutes from "./routes/assetRoutes";
import splitWiseRoutes from "./routes/splitwiseRoutes";
import aiRoutes from "./routes/aiRoutes";
import gmailRoutes from "./routes/gmailRoutes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/assets", assetRoutes);
app.use("/api/splitwise", splitWiseRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/gmail", gmailRoutes);

const PORT = process.env.PORT || 5000;

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
