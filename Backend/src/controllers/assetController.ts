import { Request, Response } from "express";
import Asset from "../models/Asset";

// Same normalize helper as expenses — converts _id to id
const normalize = (doc: any) => {
  const obj = doc.toObject ? doc.toObject() : doc;
  return {
    ...obj,
    id: obj._id?.toString(),
    _id: undefined,
  };
};

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
  try {
    const asset = await Asset.create({
      userId: req.user.id,
      ...req.body,
      lastUpdated: new Date().toISOString().split("T")[0],
    });

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
