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

import { Card, CardContent } from "@/components/ui/card";

import CategoryPieChart from "@/components/CategoryPieChart";
import MonthlyBarChart from "@/components/MonthlyBarChart";
import RecentTransaction from "@/components/RecentTransactions";

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

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">Total Net Worth</p>
            <h2 className="text-2xl font-bold mt-2">
              ₹ {netWorth.toLocaleString()}
            </h2>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">Monthly Expenses</p>
            <h2 className="text-2xl font-bold mt-2">
              ₹ {monthlyExpenses.toLocaleString()}
            </h2>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">Monthly Savings</p>
            <h2 className="text-2xl font-bold mt-2">
              ₹ {monthlySavings.toLocaleString()}
            </h2>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">Total Debt</p>
            <h2 className="text-2xl font-bold mt-2 text-red-600">
              ₹ {totalDebt.toLocaleString()}
            </h2>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CategoryPieChart />
        <MonthlyBarChart />
      </div>
      <div>
        <RecentTransaction />
      </div>
    </>
  );
};

export default Dashboard;
