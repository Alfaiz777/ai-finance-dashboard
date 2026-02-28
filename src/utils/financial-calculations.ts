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

//get expense breakdown by category - pie chart
export const getExpenseBreakdownByCategory = (expenses: Expense[]) => {
  const categoryMap: Record<string, number> = {};

  expenses.forEach((expense) => {
    if (!categoryMap[expense.category]) {
      categoryMap[expense.category] = 0;
    }
    categoryMap[expense.category] += expense.amount;
  });

  return Object.entries(categoryMap).map(([key, value]) => ({
    name: key,
    value,
  }));
};

export const getMonthlySpendingTrend = (expenses: Expense[]) => {
  const monthMap = expenses.reduce<Record<string, number>>((acc, expense) => {
    const month = expense.date.slice(0, 7); // YYYY-MM

    if (!acc[month]) {
      acc[month] = 0;
    }

    acc[month] += expense.amount;

    return acc;
  }, {});

  return Object.entries(monthMap).map(([month, value]) => ({
    month,
    value,
  }));
};
