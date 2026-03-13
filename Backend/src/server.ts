import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db";

import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import expenseRoutes from "./routes/expenseRoutes";
import assetRoutes from "./routes/assetRoutes";
import splitWiseRoutes from "./routes/splitwiseRoutes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("api/expenses/:id", expenseRoutes);
app.use("/api/assets", assetRoutes);
app.use("/api/assets", assetRoutes);
app.use("/api/assets/:id", assetRoutes);
app.use("/api/splitWise/debts", splitWiseRoutes);

const PORT = process.env.PORT || 5000;

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
