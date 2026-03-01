import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { getExpenseBreakdownByCategory } from "@/utils/financial-calculations";
import { dummyExpenses } from "@/data/dummy";
import { Card, CardContent } from "@/components/ui/card";

const CategoryPieChart = () => {
  const pieData = getExpenseBreakdownByCategory(dummyExpenses);

  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4">Expense Breakdown</h3>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                outerRadius={80}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default CategoryPieChart;
