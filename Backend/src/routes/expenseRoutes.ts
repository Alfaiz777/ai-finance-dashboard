import express from "express";
import { protect } from "../middleware/authMiddleware";
import {
  getExpense,
  createExpense,
  deleteExpense,
} from "../controllers/expenseController";

const router = express.Router();

router.get("/", protect, getExpense);
router.post("/", protect, createExpense);
router.delete("/:id", protect, deleteExpense);

export default router;
