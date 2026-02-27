import type { Expense, SplitWiseDebt } from "@/types";

// monthly expenses
export const calculateMonthlyExpenses = (expenses: Expense[]) => {
  return expenses.reduce((total, expense) => {
    return total + expense.amount;
  }, 0);
};

// total assets
export const calculateTotalAssets = (
  bankAccounts: { amount: number }[],
  fds: { amount: number }[],
  stocks: { amount: number }[],
  mutualFunds: { amount: number }[],
) => {
  const bankTotal = bankAccounts.reduce((sum, acc) => sum + acc.amount, 0);
  const fdTotal = fds.reduce((sum, fd) => sum + fd.amount, 0);
  const stockTotal = stocks.reduce((sum, stock) => sum + stock.amount, 0);
  const mfTotal = mutualFunds.reduce((sum, mf) => sum + mf.amount, 0);

  return bankTotal + fdTotal + stockTotal + mfTotal;
};

// total debt
export const calculateTotalDebt = (debts: SplitWiseDebt[]) => {
  return debts
    .filter((debt) => debt.direction === "you_owe")
    .reduce((sum, debt) => sum + debt.amount, 0);
};

// net worth
export const calculateNetWorth = (totalAssets: number, totalDebt: number) => {
  return totalAssets - totalDebt;
};

//monthly savings
export const calculateMonthlySavings = (
  income: number,
  monthlyExpenses: number,
) => {
  return income - monthlyExpenses;
};
