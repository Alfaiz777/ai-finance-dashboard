import express from "express";
import { getChatHistory } from "../controllers/chatController";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/chat-history", protect, getChatHistory);

export default router;
