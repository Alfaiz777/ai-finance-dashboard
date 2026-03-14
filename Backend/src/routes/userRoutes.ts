import express from "express";
import { protect } from "../middleware/authMiddleware";
import { getUserProfile, updateIncome } from "../controllers/userController";

const router = express.Router();

router.get("/profile", protect, getUserProfile);
router.put("/income", protect, updateIncome);

export default router;
