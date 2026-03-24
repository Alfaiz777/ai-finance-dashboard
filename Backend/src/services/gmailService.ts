import { google } from "googleapis";
import Expense from "../models/Expense";

// ── Regex patterns for Indian bank emails ─────────────────────
const TRANSACTION_PATTERNS = [
  {
    bank: "HDFC",
    amountRegex: /(?:Rs\.?|INR|₹)\s*([\d,]+\.?\d*)/i,
    merchantRegex: /(?:at|to|from|paid to|via)\s+([A-Za-z0-9\s&'-]+)/i,
  },
  {
    bank: "ICICI",
    amountRegex: /(?:Rs\.?|INR|₹)\s*([\d,]+\.?\d*)/i,
    merchantRegex: /(?:at|to|from|paid to|via)\s+([A-Za-z0-9\s&'-]+)/i,
  },
  {
    bank: "SBI",
    amountRegex: /(?:Rs\.?|INR|₹)\s*([\d,]+\.?\d*)/i,
    merchantRegex: /(?:at|to|from|paid to|via)\s+([A-Za-z0-9\s&'-]+)/i,
  },
  {
    bank: "Axis",
    amountRegex: /(?:Rs\.?|INR|₹)\s*([\d,]+\.?\d*)/i,
    merchantRegex: /(?:at|to|from|paid to|via)\s+([A-Za-z0-9\s&'-]+)/i,
  },
  {
    bank: "UPI",
    amountRegex: /(?:Rs\.?|INR|₹)\s*([\d,]+\.?\d*)/i,
    merchantRegex: /(?:at|to|from|paid to|via)\s+([A-Za-z0-9\s&'-]+)/i,
  },
];

// Known bank email senders
const BANK_SENDERS = [
  "alerts@hdfcbank.net",
  "alerts@axisbank.com",
  "noreply@icicibank.com",
  "sbialerts@sbi.co.in",
  "kotak@kotak.com",
  "alerts@indusind.com",
  "noreply@yesbank.in",
];

// ── Auto-categorize based on merchant name ─────────────────────
const categorizeExpense = (merchant: string): string => {
  const m = merchant.toLowerCase();

  if (/swiggy|zomato|dominos|pizza|mcdonald|kfc|restaurant|cafe|food/.test(m))
    return "Food";
  if (/uber|ola|rapido|metro|bus|irctc|railway|flight|airline/.test(m))
    return "Transport";
  if (/netflix|spotify|amazon prime|hotstar|zee5|youtube/.test(m))
    return "Entertainment";
  if (/amazon|flipkart|myntra|ajio|meesho|nykaa|croma/.test(m))
    return "Shopping";
  if (/apollo|medplus|pharmeasy|hospital|doctor|clinic|health/.test(m))
    return "Health";
  if (/electricity|water|gas|jio|airtel|vi |bsnl|broadband/.test(m))
    return "Utilities";
  if (/udemy|coursera|unacademy|byjus|school|college|tuition/.test(m))
    return "Education";
  if (/hotel|oyo|makemytrip|goibibo|booking|airbnb/.test(m)) return "Travel";

  return "Other";
};

// ── Clean amount string — "1,299.00" → 1299 ───────────────────
const parseAmount = (amountStr: string): number => {
  return parseFloat(amountStr.replace(/,/g, ""));
};

// ── Decode base64 email body from Gmail API ────────────────────
const decodeEmailBody = (data: string): string => {
  const base64 = data.replace(/-/g, "+").replace(/_/g, "/");
  return Buffer.from(base64, "base64").toString("utf-8");
};

// ── Extract text from Gmail message parts ─────────────────────
const extractEmailText = (payload: any): string => {
  if (!payload) return "";

  if (payload.body?.data) {
    return decodeEmailBody(payload.body.data);
  }

  if (payload.parts) {
    for (const part of payload.parts) {
      if (part.mimeType === "text/plain" && part.body?.data) {
        return decodeEmailBody(part.body.data);
      }
    }
    for (const part of payload.parts) {
      if (part.mimeType === "text/html" && part.body?.data) {
        return decodeEmailBody(part.body.data).replace(/<[^>]*>/g, " ");
      }
    }
  }

  return "";
};

// ── Parse one email — returns expense data or null ────────────
const parseEmail = (
  emailText: string,
  emailDate: string,
): {
  amount: number;
  merchant: string;
  category: string;
  date: string;
} | null => {
  for (const pattern of TRANSACTION_PATTERNS) {
    const amountMatch = emailText.match(pattern.amountRegex);
    if (!amountMatch) continue;

    // ✅ Guard index access
    const amountStr = amountMatch[1];
    if (!amountStr) continue;

    const amount = parseAmount(amountStr);
    if (isNaN(amount) || amount <= 0) continue;

    const merchantMatch = emailText.match(pattern.merchantRegex);
    // ✅ Guard index access
    const merchantStr = merchantMatch?.[1];
    const merchant = merchantStr
      ? merchantStr.trim().substring(0, 50)
      : "Unknown Merchant";

    const category = categorizeExpense(merchant);

    return { amount, merchant, category, date: emailDate };
  }

  return null;
};

// ── Main function — fetches and parses emails ──────────────────
export const parseGmailEmails = async (
  oauth2Client: any,
  userId: string,
): Promise<{ saved: number; skipped: number }> => {
  const gmail = google.gmail({ version: "v1", auth: oauth2Client });

  let saved = 0;
  let skipped = 0;

  // Build search query for last 30 days from known bank senders
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const isoDate = thirtyDaysAgo.toISOString().split("T")[0]!;
  const dateQuery = isoDate.replace(/-/g, "/");

  //   const query = `from:(${BANK_SENDERS.join(" OR ")}) after:${dateQuery}`; // production code
  //   const query = `subject:(debited OR spent OR paid OR transaction) after:${dateQuery}`; // to test

  const query = `(after:${dateQuery}) (debited OR credited OR spent OR transaction OR UPI OR paid OR INR OR Rs)`;

  // Fetch list of matching email IDs
  const listResponse = await gmail.users.messages.list({
    userId: "me",
    q: query,
    maxResults: 50,
  });

  const messages = listResponse.data.messages || [];

  for (const message of messages) {
    // ✅ Fix 1 — guard message.id before using it
    if (!message.id) {
      skipped++;
      continue;
    }

    // Deduplication check — don't save same email twice
    const alreadySaved = await Expense.findOne({
      userId,
      gmailMessageId: message.id,
    });

    if (alreadySaved) {
      skipped++;
      continue;
    }

    // Fetch full email content
    const emailResponse = await gmail.users.messages.get({
      userId: "me",
      id: message.id, // ← safe: checked above
    });

    // ✅ Fix 2 — guard emailData before accessing properties
    const emailData = emailResponse.data;
    if (!emailData) {
      skipped++;
      continue;
    }

    const emailText = extractEmailText(emailData.payload);

    if (!emailText) {
      skipped++;
      continue;
    }

    console.log("EMAIL TEXT:", emailText);

    // ✅ Fixed — explicit string type annotation
    const dateHeader = emailData.payload?.headers?.find(
      (h: any) => h.name?.toLowerCase() === "date",
    );
    const emailDate: string = dateHeader?.value
      ? new Date(dateHeader.value).toISOString().split("T")[0]!
      : new Date().toISOString().split("T")[0]!;
    // Try to parse transaction from email text
    const parsed = parseEmail(emailText, emailDate);

    if (!parsed) {
      console.log("❌ Could not parse email");
      skipped++;
      continue;
    }

    console.log("PARSED RESULT:", parsed);

    // Save to database
    try {
      await Expense.create({
        userId,
        amount: parsed.amount,
        merchant: parsed.merchant,
        category: parsed.category,
        date: parsed.date,
        source: "gmail",
        paymentMethod: "upi",
        gmailMessageId: message.id!, // ✅ Fix 5 — non-null assertion, safe here
      });
      saved++;
    } catch (error: any) {
      // Duplicate key — already exists, skip silently
      if (error.code === 11000) {
        skipped++;
      }
    }
  }

  return { saved, skipped };
};
