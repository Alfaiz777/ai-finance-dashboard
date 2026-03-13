import express from "express";
import { protect } from "../middleware/authMiddleware";
import {
  getAssets,
  createAsset,
  deleteAsset,
} from "../controllers/assetController";

const router = express.Router();

router.get("/", protect, getAssets);
router.post("/", protect, createAsset);
router.delete("/:id", protect, deleteAsset);

export default router;
