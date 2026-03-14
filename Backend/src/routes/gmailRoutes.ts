import express from "express";
import { syncGmail } from "../controllers/gmailController";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/sync", protect, syncGmail);

export default router;
