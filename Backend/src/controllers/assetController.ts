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
  type: z.enum(["bank", "fd", "stock", "mutual_fund"]),
  amount: z.coerce.number().nonnegative("Amount cannot be negative"),

  institution: z.string().optional(),

  // Bank
  accountType: z.enum(["savings", "current"]).optional(),
  accountNumberLast4: z.string().optional(),

  // FD
  principal: z.coerce.number().optional(),
  interestRate: z.coerce.number().optional(),
  startDate: z.string().optional(),
  maturityDate: z.string().optional(),
  maturityAmount: z.coerce.number().optional(),

  // Stock
  ticker: z.string().optional(),
  quantity: z.coerce.number().optional(),
  buyPrice: z.coerce.number().optional(),
  currentPrice: z.coerce.number().optional(),
  profitLoss: z.coerce.number().optional(),

  // Mutual Fund
  units: z.coerce.number().optional(),
  nav: z.coerce.number().optional(),
  investedAmount: z.coerce.number().optional(),
  currentValue: z.coerce.number().optional(),
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
      institution: parsed.data.institution,
      lastUpdated: new Date().toISOString().split("T")[0],
    };

    // BANK
    if (parsed.data.accountType !== undefined) {
      assetData.accountType = parsed.data.accountType;
    }

    if (parsed.data.accountNumberLast4 !== undefined) {
      assetData.accountNumberLast4 = parsed.data.accountNumberLast4;
    }

    // FD
    if (parsed.data.principal !== undefined) {
      assetData.principal = parsed.data.principal;
    }

    if (parsed.data.interestRate !== undefined) {
      assetData.interestRate = parsed.data.interestRate;
    }

    if (parsed.data.startDate !== undefined) {
      assetData.startDate = parsed.data.startDate;
    }

    if (parsed.data.maturityDate !== undefined) {
      assetData.maturityDate = parsed.data.maturityDate;
    }

    if (parsed.data.maturityAmount !== undefined) {
      assetData.maturityAmount = parsed.data.maturityAmount;
    }

    // STOCK
    if (parsed.data.ticker !== undefined) {
      assetData.ticker = parsed.data.ticker;
    }

    if (parsed.data.quantity !== undefined) {
      assetData.quantity = parsed.data.quantity;
    }

    if (parsed.data.buyPrice !== undefined) {
      assetData.buyPrice = parsed.data.buyPrice;
    }

    if (parsed.data.currentPrice !== undefined) {
      assetData.currentPrice = parsed.data.currentPrice;
    }

    if (parsed.data.profitLoss !== undefined) {
      assetData.profitLoss = parsed.data.profitLoss;
    }

    // MUTUAL FUND
    if (parsed.data.units !== undefined) {
      assetData.units = parsed.data.units;
    }

    if (parsed.data.nav !== undefined) {
      assetData.nav = parsed.data.nav;
    }

    if (parsed.data.investedAmount !== undefined) {
      assetData.investedAmount = parsed.data.investedAmount;
    }

    if (parsed.data.currentValue !== undefined) {
      assetData.currentValue = parsed.data.currentValue;
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
