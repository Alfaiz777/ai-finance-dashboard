import express from "express";
import { protect } from "../middleware/authMiddleware";
import { createDebt, getDebts } from "../controllers/SplitwiseController";

const router = express.Router();

router.get("/debts", protect, getDebts);
router.post("/debts", protect, createDebt);

export default router;
