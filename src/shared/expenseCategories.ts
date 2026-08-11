export const EXPENSE_CATEGORIES = [
  "Food",
  "Transport",
  "Entertainment",
  "Shopping",
  "Health",
  "Utilities",
  "Education",
  "Travel",
  "Investment",
  "Other",
] as const;

export type ExpenseCategory = (typeof EXPENSE_CATEGORIES)[number];

export const isExpenseCategory = (value: string): value is ExpenseCategory => {
  return (EXPENSE_CATEGORIES as readonly string[]).includes(value);
};
