import { Request, Response } from "express";
import Asset from "../models/Asset";

export const getAssets = async (req: any, res: Response) => {
  const assets = await Asset.find({ userId: req.user.id });

  res.json(assets);
};

export const createAsset = async (req: any, res: Response) => {
  const asset = await Asset.create({
    userId: req.user.id,
    ...req.body,
  });

  res.status(201).json(asset);
};

export const deleteAsset = async (req: any, res: Response) => {
  const asset = await Asset.findById(req.params.id);

  if (!asset) {
    return res.status(404).json({ message: "Asset not found" });
  }
  if (asset.userId.toString() !== req.user.id) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  await asset.deleteOne();

  res.json({ message: "Asset Deleted successfully" });
};
