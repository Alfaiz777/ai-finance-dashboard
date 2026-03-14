import { Request, Response } from "express";

export const syncGmail = async (req: any, res: Response) => {
  try {
    console.log("Gmail sync triggered for user:", req.user.id);

    // Later:
    // fetch emails
    // parse transactions
    // save expenses

    res.json({
      message: "Gmail sync started",
    });
  } catch (error) {
    res.status(500).json({
      message: "Gmail sync failed",
    });
  }
};
