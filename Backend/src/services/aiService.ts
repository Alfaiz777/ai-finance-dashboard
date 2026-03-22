import OpenAI from "openai";
import Expense from "../models/Expense";
import Asset from "../models/Asset";
import SplitWiseDebt from "../models/SplitWiseDebt";

export const getAIResponse = async (
  userId: string,
  message: string,
): Promise<string> => {
  try {
    // ✅ Check env FIRST
    const apiKey = process.env.OPENROUTER_API_KEY;

    console.log("OPENROUTER KEY:", apiKey);

    if (!apiKey) {
      throw new Error("OPENROUTER_API_KEY is missing in .env");
    }

    // ✅ Initialize AFTER env is loaded
    const client = new OpenAI({
      apiKey,
      baseURL: "https://openrouter.ai/api/v1",
    });
    // ── Step 1: Fetch user's real data ────────────
    const [expenses, assets, debts] = await Promise.all([
      Expense.find({ userId }).sort({ date: -1 }).limit(50),
      Asset.find({ userId }),
      SplitWiseDebt.find({ userId }),
    ]);

    // ── Step 2: Calculate summary ─────────────────
    const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
    const totalAssets = assets.reduce((sum, a) => sum + a.amount, 0);
    const totalDebt = debts
      .filter((d) => d.direction === "you_owe")
      .reduce((sum, d) => sum + (d.amount ?? 0), 0);

    const netWorth = totalAssets - totalDebt;

    // ── Step 3: Category breakdown ────────────────
    const categoryBreakdown = expenses.reduce<Record<string, number>>(
      (acc, e) => {
        acc[e.category] = (acc[e.category] || 0) + e.amount;
        return acc;
      },
      {},
    );

    const categoryText = Object.entries(categoryBreakdown)
      .sort(([, a], [, b]) => b - a)
      .map(([cat, amt]) => `${cat}: ₹${amt}`)
      .join(", ");

    // ── Step 4: Recent transactions ───────────────
    const recentTransactions = expenses
      .slice(0, 10)
      .map((e) => `${e.merchant} ₹${e.amount} (${e.category}) on ${e.date}`)
      .join("\n");

    // ── Step 5: Assets text ──────────────────────
    const assetsText =
      assets.length > 0
        ? assets.map((a) => `${a.name}: ₹${a.amount} (${a.type})`).join(", ")
        : "No assets recorded";

    // ── Step 6: Debts text ───────────────────────
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

    // ── Step 7: Context ──────────────────────────
    const context = `
Here is the user's current financial data:

SUMMARY:
- Total expenses: ₹${totalExpenses}
- Total assets: ₹${totalAssets}
- Net worth: ₹${netWorth}
- Debt: ₹${totalDebt}

SPENDING BY CATEGORY:
${categoryText || "No expenses recorded"}

RECENT TRANSACTIONS:
${recentTransactions || "No transactions recorded"}

ASSETS:
${assetsText}

DEBTS:
${debtsText}
`.trim();

    // ── Step 8: Prompt ───────────────────────────
    const prompt = `You are a smart personal finance advisor for an Indian user.
Use ₹ currency. Be concise and helpful.

${context}

User question: ${message}`;

    const completion = await client.chat.completions.create({
      model: "openrouter/free",
      messages: [
        { role: "system", content: "You are a helpful finance assistant." },
        { role: "user", content: prompt },
      ],
    });

    const content = completion.choices?.[0]?.message?.content;

    console.log("AI RAW RESPONSE:", completion);

    return content ?? "No response from AI";
  } catch (err) {
    console.error("AI ERROR:", err);
    return "AI failed";
  }
};
