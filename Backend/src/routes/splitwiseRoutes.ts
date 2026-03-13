import express from "express";
import { protect } from "../middleware/authMiddleware";
import { getDebts } from "../controllers/SplitwiseController";

const router = express.Router();

router.get("/", protect, getDebts);

export default router;
