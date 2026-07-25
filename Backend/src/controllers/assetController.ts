import { Request, Response } from "express";
import Asset from "../models/Asset";
import { z } from "zod";

// Same normalize helper as expenses — converts _id to id
const normalize = (doc: any) => {
  const obj = doc.toObject ? doc.toObject() : doc;
  return {
    ...obj,
    id: obj._id?.toString(),
    _id: undefined,
  };
};

const createAssetSchema = z.object({
  name: z.string().min(1, "Asset name is required"),
  type: z.string().min(1, "Asset type is required"),
  amount: z.coerce.number().nonnegative("Amount cannot be negative"),
  buyPrice: z.coerce.number().optional(),
  currentPrice: z.coerce.number().optional(),
  maturityDate: z.string().optional(),
});

export const getAssets = async (req: any, res: Response) => {
  try {
    const assets = await Asset.find({ userId: req.user.id }).sort({
      type: 1,
      createdAt: -1,
    });
    res.json(assets.map(normalize));
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const createAsset = async (req: any, res: Response) => {
  const parsed = createAssetSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      message: parsed.error.issues[0]?.message || "Invalid asset data",
    });
  }
  try {
    const assetData: any = {
      userId: req.user.id,
      name: parsed.data.name,
      type: parsed.data.type,
      amount: parsed.data.amount,
      lastUpdated: new Date().toISOString().split("T")[0],
    };

    if (parsed.data.buyPrice !== undefined) {
      assetData.buyPrice = parsed.data.buyPrice;
    }

    if (parsed.data.currentPrice !== undefined) {
      assetData.currentPrice = parsed.data.currentPrice;
    }

    if (parsed.data.maturityDate !== undefined) {
      assetData.maturityDate = parsed.data.maturityDate;
    }

    const asset = await Asset.create(assetData);

    res.status(201).json(normalize(asset));
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteAsset = async (req: any, res: Response) => {
  try {
    const asset = await Asset.findById(req.params.id);

    if (!asset) {
      return res.status(404).json({ message: "Asset not found" });
    }
    if (asset.userId.toString() !== req.user.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    await asset.deleteOne();

    res.json({ message: "Asset Deleted successfully" });
  } catch (error) {
    res.status(500).json({ Message: "Server error" });
  }
};
