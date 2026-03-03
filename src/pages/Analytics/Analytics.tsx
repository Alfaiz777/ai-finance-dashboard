import { dummyExpenses } from "@/data/dummy";
import { useMemo } from "react";
import DashboardPieChart from "@/components/Dashboard/DashboardPieChart";
import DashboardBarChart from "@/components/Dashboard/DashboardBarChart";
import InsightCard from "@/components/Analytics/InsightCard";
import { Wallet, BarChart3, TrendingUp, PieChart } from "lucide-react";

const Analytics = () => {
  const categoryData = useMemo(() => {
    const map: Record<string, number> = {};

    dummyExpenses.forEach((expense) => {
      if (!map[expense.category]) {
        map[expense.category] = 0;
      }
      map[expense.category] += expense.amount;
    });

    return Object.entries(map).map(([category, value], index) => ({
      category,
      value,
      fill: ["#6366f1", "#22c55e", "#f59e0b", "#ef4444", "#3b82f6"][index % 5],
    }));
  }, []);

  const monthlyData = useMemo(() => {
    const map: Record<string, number> = {};

    dummyExpenses.forEach((expense) => {
      const month = expense.date.slice(0, 7);
      if (!map[month]) map[month] = 0;
      map[month] += expense.amount;
    });

    return Object.entries(map).map(([month, value], index) => ({
      month,
      value,
      fill: "#6366f1",
    }));
  }, []);

  const topMerchants = useMemo(() => {
    const map: Record<string, number> = {};

    dummyExpenses.forEach((expense) => {
      if (!map[expense.merchant]) map[expense.merchant] = 0;
      map[expense.merchant] += expense.amount;
    });

    return Object.entries(map)
      .map(([merchant, value]) => ({
        merchant,
        value,
        fill: "#22c55e",
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);
  }, []);

  const totalSpent = useMemo(
    () => dummyExpenses.reduce((sum, e) => sum + e.amount, 0),
    [],
  );

  const averageTransaction = useMemo(
    () => totalSpent / dummyExpenses.length,
    [totalSpent],
  );

  const highestTransaction = useMemo(
    () => Math.max(...dummyExpenses.map((e) => e.amount)),
    [],
  );

  const highestCategory = useMemo(() => {
    if (categoryData.length === 0) return "N/A";
    return categoryData.sort((a, b) => b.value - a.value)[0].category;
  }, [categoryData]);

  return (
    <div className="space-y-8">
      {/* Insight Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <InsightCard
          title="Total Spent"
          value={`₹ ${totalSpent.toLocaleString()}`}
          icon={<Wallet className="h-4 w-4" />}
        />
        <InsightCard
          title="Average Transaction"
          value={`₹ ${averageTransaction.toFixed(0)}`}
          icon={<BarChart3 className="h-4 w-4" />}
        />
        <InsightCard
          title="Highest Expense"
          value={`₹ ${highestTransaction.toLocaleString()}`}
          icon={<TrendingUp className="h-4 w-4" />}
        />
        <InsightCard
          title="Top Category"
          value={highestCategory}
          icon={<PieChart className="h-4 w-4" />}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DashboardPieChart
          title="Spending by Category"
          chartData={categoryData}
        />
        <DashboardBarChart
          title="Monthly Spending Trend"
          chartData={monthlyData}
        />
      </div>

      {/* Top Merchants */}
      <DashboardBarChart
        title="Top 5 Merchants"
        chartData={topMerchants.map((item) => ({
          month: item.merchant,
          value: item.value,
          fill: item.fill,
        }))}
      />
    </div>
  );
};

export default Analytics;
