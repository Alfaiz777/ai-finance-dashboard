// ─── EXPENSES ───────────────────────────────────────────────
// Every transaction parsed from Gmail or added manually

export interface Expense {
  id: string;
  amount: number;
  merchant: string; // "Swiggy", "HDFC ATM"
  category: ExpenseCategory; // controlled values, not free text
  date: string; // ISO format: "2024-01-15"
  source: "gmail" | "manual"; // how was this expense captured
  paymentMethod: "upi" | "credit_card" | "debit_card" | "cash" | "net_banking";
  description?: string; // optional extra note
}

// Using a union type here instead of plain string
// This prevents typos like "food" vs "Food" vs "FOOD"
export type ExpenseCategory =
  | "Food"
  | "Transport"
  | "Entertainment"
  | "Shopping"
  | "Health"
  | "Utilities"
  | "Education"
  | "Travel"
  | "Investment"
  | "Other";

// ─── ASSETS ─────────────────────────────────────────────────
// Everything you own that has monetary value

export interface BaseAsset {
  id: string;
  name: string;
  amount: number; // current value in INR
  institution: string; // "HDFC", "Zerodha", "SBI"
  lastUpdated: string;
}

// Bank account extends base with account-specific fields
export interface BankAccount extends BaseAsset {
  type: "bank";
  accountType: "savings" | "current";
  accountNumberLast4: string; // only last 4 digits for display
}

// Fixed deposit has extra fields like maturity
export interface FixedDeposit extends BaseAsset {
  type: "fd";
  principal: number;
  interestRate: number; // percentage like 7.5
  startDate: string;
  maturityDate: string;
  maturityAmount: number; // calculated: principal + interest
}

// Stock holding
export interface StockHolding extends BaseAsset {
  type: "stock";
  ticker: string; // "RELIANCE", "TCS"
  quantity: number;
  buyPrice: number;
  currentPrice: number;
  profitLoss: number; // currentValue - buyPrice * quantity
}

// Mutual Fund
export interface MutualFund extends BaseAsset {
  type: "mutual_fund";
  units: number;
  nav: number; // Net Asset Value per unit
  investedAmount: number;
  currentValue: number;
}

// Union type — an Asset can be any of the above
export type Asset = BankAccount | FixedDeposit | StockHolding | MutualFund;

// ─── SPLITWISE ──────────────────────────────────────────────

export interface SplitWiseDebt {
  id: string;
  personName: string;
  personAvatar?: string; // profile pic url
  amount: number;
  direction: "you_owe" | "they_owe";
  groupName: string; // "Goa Trip", "Flat Expenses"
  lastActivity: string;
  currency: string; // "INR", "USD"
}

export interface SplitWiseSummary {
  totalYouOwe: number;
  totalOwedToYou: number;
  netBalance: number; // positive = you get money, negative = you owe
}

// ─── FINANCIAL SUMMARY ──────────────────────────────────────
// Computed/derived values shown on main dashboard

export interface FinancialSummary {
  netWorth: number; // all assets - all debts
  totalAssets: number;
  totalDebts: number; // splitWise you_owe total
  monthlyIncome: number; // user will input this manually
  monthlyExpenses: number; // sum of current month expenses
  monthlySavings: number; // income - expenses
  savingsRate: number; // (savings/income) * 100, as percentage
}

// ─── AI CHAT ────────────────────────────────────────────────

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

// ─── USER ───────────────────────────────────────────────────

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  monthlyIncome: number;
  currency: string;
  gmailConnected: boolean;
  splitWiseConnected: boolean;
}
