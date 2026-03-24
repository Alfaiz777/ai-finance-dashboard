import express from "express";
import { protect } from "../middleware/authMiddleware";
import {
  getUserProfile,
  updateIncome,
  updateProfile,
} from "../controllers/userController";

const router = express.Router();

router.get("/profile", protect, getUserProfile);
router.put("/income", protect, updateIncome);
router.put("/update-profile", protect, updateProfile);

export default router;
