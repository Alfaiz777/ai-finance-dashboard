import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { getExpenseBreakdownByCategory } from "@/utils/financial-calculations";
import { dummyExpenses } from "@/data/dummy";
import { Card, CardContent } from "@/components/ui/card";

const CategoryPieChart = () => {
  const pieData = getExpenseBreakdownByCategory(dummyExpenses);

  return (
    <Card>
      <CardContent className="p-6 h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              label
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default CategoryPieChart;
