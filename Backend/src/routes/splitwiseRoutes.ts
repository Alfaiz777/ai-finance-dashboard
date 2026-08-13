import express from "express";
import { protect } from "../middleware/authMiddleware";
import {
  createDebt,
  getDebts,
  deleteDebt,
} from "../controllers/splitwiseController";

const router = express.Router();

router.get("/debts", protect, getDebts);
router.post("/debts", protect, createDebt);
router.delete("/debts/:id", protect, deleteDebt);

export default router;
