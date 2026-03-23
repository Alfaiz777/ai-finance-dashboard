import express from "express";
import {
  getGmailAuthUrl,
  handleGmailCallback,
  syncGmail,
  disconnectGmail,
} from "../controllers/gmailController";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

// Protected routes — need JWT
router.get("/auth-url", protect, getGmailAuthUrl);
router.post("/sync", protect, syncGmail);
router.post("/disconnect", protect, disconnectGmail);

// Public route — Google redirects here, no JWT in URL
router.get("/callback", handleGmailCallback);

export default router;
