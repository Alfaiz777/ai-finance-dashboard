import {
  calculateMonthlyExpenses,
  calculateTotalAssets,
  calculateTotalDebt,
  calculateNetWorth,
  calculateMonthlySavings,
} from "@/utils/financial-calculations";

import {
  dummyExpenses,
  dummyBankAccounts,
  dummyFDs,
  dummyMutualFunds,
  dummySplitwiseDebts,
  dummyStocks,
  dummyUser,
} from "@/data/dummy";
import DashboardCard from "@/components/Dashboard/DashboardCard";
import { Wallet, TrendingUp, TrendingDown, CreditCard } from "lucide-react";
import DashboardPieChart from "@/components/Dashboard/DashboardPieChart";
import DashboardBarChart from "@/components/Dashboard/DashboardBarChart";
import RecentTransactions from "@/components/Dashboard/RecentTransaction";
import {
  getExpenseBreakdownByCategory,
  getMonthlySpendingTrend,
} from "@/utils/financial-calculations";

const Dashboard = () => {
  const monthlyExpenses = calculateMonthlyExpenses(dummyExpenses);
  const totalAssets = calculateTotalAssets(
    dummyBankAccounts,
    dummyFDs,
    dummyMutualFunds,
    dummyStocks,
  );
  const totalDebt = calculateTotalDebt(dummySplitwiseDebts);
  const netWorth = calculateNetWorth(totalAssets, totalDebt);
  const monthlySavings = calculateMonthlySavings(
    dummyUser.monthlyIncome,
    monthlyExpenses,
  );

  const rawData = getExpenseBreakdownByCategory(dummyExpenses);

  const pieData = rawData.map((item, index) => ({
    category: item.name,
    value: item.value,
    fill: ["#6366f1", "#22c55e", "#f59e0b", "#ef4444", "#3b82f6"][index % 5],
  }));

  const rawBarData = getMonthlySpendingTrend(dummyExpenses);

  const barData = rawBarData.map((item, index) => ({
    month: item.month,
    value: item.value,
    fill: ["#6366f1", "#22c55e", "#f59e0b", "#ef4444", "#3b82f6"][index % 5],
  }));
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard
          title="Total Net Worth"
          value={`₹ ${netWorth.toLocaleString()}`}
          icon={<Wallet className="h-4 w-4" />}
        />

        <DashboardCard
          title="Monthly Expenses"
          value={`₹ ${monthlyExpenses.toLocaleString()}`}
          icon={<TrendingDown className="h-4 w-4" />}
        />

        <DashboardCard
          title="Monthly Savings"
          value={`₹ ${monthlySavings.toLocaleString()}`}
          icon={<TrendingUp className="h-4 w-4" />}
          valueClassName="text-green-600"
        />

        <DashboardCard
          title="Total Debt"
          value={`₹ ${totalDebt.toLocaleString()}`}
          icon={<CreditCard className="h-4 w-4" />}
          valueClassName="text-red-600"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DashboardPieChart
          title="Expense Breakdown"
          description="Spending by category"
          chartData={pieData}
          footerText="Based on current month expenses"
        />
        <DashboardBarChart
          title="Monthly Spending Trend"
          description="Spending over recent months"
          chartData={barData}
          footerText="Based on recorded expenses"
        />
      </div>
      <div>
        <RecentTransactions />
      </div>
    </>
  );
};

export default Dashboard;
