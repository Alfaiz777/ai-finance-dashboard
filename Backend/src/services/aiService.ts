import { GoogleGenerativeAI } from "@google/generative-ai";
import Expense from "../models/Expense";
import Asset from "../models/Asset";
import SplitWiseDebt from "../models/SplitWiseDebt";

export const getAIResponse = async (
  userId: string,
  message: string,
): Promise<string> => {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  // ── Step 1: Fetch user's real data from MongoDB ────────────
  // All three queries run at the same time using Promise.all
  // This is faster than waiting for each one sequentially
  const [expenses, assets, debts] = await Promise.all([
    Expense.find({ userId }).sort({ date: -1 }).limit(50),
    Asset.find({ userId }),
    SplitWiseDebt.find({ userId }),
  ]);

  // ── Step 2: Calculate summary numbers ─────────────────────
  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const totalAssets = assets.reduce((sum, a) => sum + a.amount, 0);
  const totalDebt = debts
    .filter((d) => d.direction === "you_owe")
    .reduce((sum, d) => sum + (d.amount ?? 0), 0);
  const netWorth = totalAssets - totalDebt;

  // ── Step 3: Group expenses by category ────────────────────
  // { Food: 4500, Transport: 2400, ... }
  const categoryBreakdown = expenses.reduce<Record<string, number>>(
    (acc, e) => {
      acc[e.category] = (acc[e.category] || 0) + e.amount;
      return acc;
    },
    {},
  );

  // Convert to readable string: "Food: ₹4500, Transport: ₹2400"
  const categoryText = Object.entries(categoryBreakdown)
    .sort(([, a], [, b]) => b - a) // sort by highest first
    .map(([cat, amt]) => `${cat}: ₹${amt}`)
    .join(", ");

  // ── Step 4: Build recent transactions text ─────────────────
  const recentTransactions = expenses
    .slice(0, 10)
    .map((e) => `${e.merchant} ₹${e.amount} (${e.category}) on ${e.date}`)
    .join("\n");

  // ── Step 5: Build assets text ──────────────────────────────
  const assetsText =
    assets.length > 0
      ? assets.map((a) => `${a.name}: ₹${a.amount} (${a.type})`).join(", ")
      : "No assets recorded";

  // ── Step 6: Build debts text ───────────────────────────────
  const debtsText =
    debts.length > 0
      ? debts
          .map((d) =>
            d.direction === "you_owe"
              ? `You owe ${d.personName} ₹${d.amount}`
              : `${d.personName} owes you ₹${d.amount}`,
          )
          .join(", ")
      : "No split expenses recorded";

  // ── Step 7: Build the context string ──────────────────────
  // This is what you're "telling" OpenAI about the user
  // The more detail here, the better the AI's answers
  const context = `
Here is the user's current financial data:

SUMMARY:
- Total expenses recorded: ₹${totalExpenses}
- Total assets: ₹${totalAssets}
- Net worth: ₹${netWorth}
- Money you owe others: ₹${totalDebt}

SPENDING BY CATEGORY:
${categoryText || "No expenses recorded"}

RECENT TRANSACTIONS (last 10):
${recentTransactions || "No transactions recorded"}

ASSETS:
${assetsText}

SPLIT EXPENSES:
${debtsText}
`.trim();

  // ── Step 8: Call OpenAI with context + user message ────────
  const prompt = `You are a friendly personal finance advisor for an Indian user.
You have access to the user's real financial data shown below.
Always answer based on this data.
Keep answers concise, specific, and helpful.
Use ₹ symbol for Indian Rupees.
If you don't have enough data to answer, say so clearly.

${context}

User question: ${message}`;

  const result = await model.generateContent(prompt);
  const response = result.response;
  return (
    response.text() ?? "Sorry, I could not process that. Please try again."
  );
};
