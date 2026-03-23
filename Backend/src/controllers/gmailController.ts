import { Request, Response } from "express";
import { google } from "googleapis";
import User from "../models/User";
import { parseGmailEmails } from "../services/gmailService";

// Creates the OAuth client — reused across functions
const createOAuthClient = () => {
  return new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI,
  );
};

// Step 1 — Frontend calls this to get the Google login URL
export const getGmailAuthUrl = async (req: any, res: Response) => {
  const oauth2Client = createOAuthClient();

  const url = oauth2Client.generateAuthUrl({
    access_type: "offline", // gets refresh token so user doesn't re-auth every hour
    scope: ["https://www.googleapis.com/auth/gmail.readonly"],
    state: req.user.id, // pass userId so callback knows which user this is
  });

  res.json({ url });
};

// Step 2 — Google redirects here after user gives permission
export const handleGmailCallback = async (req: Request, res: Response) => {
  const { code, state: userId } = req.query;

  if (!code || !userId) {
    return res.redirect("http://localhost:5173/settings?error=auth_failed");
  }

  try {
    const oauth2Client = createOAuthClient();

    // Exchange the code Google gave us for actual tokens
    const { tokens } = await oauth2Client.getToken(code as string);

    // Save tokens to user's record in database
    await User.findByIdAndUpdate(userId, {
      gmailAccessToken: tokens.access_token,
      gmailRefreshToken: tokens.refresh_token,
      gmailConnected: true,
    });

    // Redirect back to frontend settings page with success
    res.redirect("http://localhost:5173/settings?gmail=connected");
  } catch (error) {
    console.error("Gmail OAuth error:", error);
    res.redirect("http://localhost:5173/settings?error=auth_failed");
  }
};

// Step 3 — Called when user clicks "Sync Gmail" to fetch new emails
export const syncGmail = async (req: any, res: Response) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user?.gmailAccessToken) {
      return res.status(400).json({ message: "Gmail not connected" });
    }

    const oauth2Client = createOAuthClient();
    oauth2Client.setCredentials({
      access_token: user.gmailAccessToken ?? undefined,
      refresh_token: user.gmailRefreshToken ?? null,
    });

    // Auto-refresh token if expired
    oauth2Client.on("tokens", async (tokens) => {
      if (tokens.access_token) {
        await User.findByIdAndUpdate(req.user.id, {
          gmailAccessToken: tokens.access_token,
        });
      }
    });

    // Parse emails and save expenses
    const result = await parseGmailEmails(oauth2Client, req.user.id);

    res.json({
      message: `Sync complete`,
      newExpenses: result.saved,
      skipped: result.skipped,
    });
  } catch (error) {
    console.error("Gmail sync error:", error);
    res.status(500).json({ message: "Gmail sync failed" });
  }
};

// Disconnect Gmail
export const disconnectGmail = async (req: any, res: Response) => {
  try {
    await User.findByIdAndUpdate(req.user.id, {
      gmailConnected: false,
      gmailAccessToken: null,
      gmailRefreshToken: null,
    });
    res.json({ message: "Gmail disconnected" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
