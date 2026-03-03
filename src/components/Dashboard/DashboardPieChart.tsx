import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";

type PieChartData = {
  category: string;
  value: number;
  fill: string;
};

type DashboardPieChartProps = {
  title: string;
  description?: string;
  chartData: PieChartData[];
  footerText?: string;
  loading?: boolean;
};

const DashboardPieChart = ({
  title,
  description,
  chartData,
  footerText,
  loading = false,
}: DashboardPieChartProps) => {
  return (
    <Card className="flex flex-col rounded-xl shadow-sm">
      <CardHeader className="items-center pb-2">
        <CardTitle className="text-sm font-medium text-center">
          {title}
        </CardTitle>
        {description && (
          <CardDescription className="text-xs text-center">
            {description}
          </CardDescription>
        )}
      </CardHeader>

      <CardContent className="flex flex-col items-center">
        {loading ? (
          <div className="h-[220px] flex items-center justify-center text-sm text-muted-foreground">
            Loading chart...
          </div>
        ) : (
          <>
            <div className="w-full h-[220px]">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={chartData}
                    dataKey="value"
                    nameKey="category"
                    outerRadius={80}
                  >
                    {chartData.map((entry) => (
                      <Cell key={entry.category} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Custom Legend */}
            <div className="flex flex-wrap justify-center gap-4 mt-4">
              {chartData.map((item) => (
                <div key={item.category} className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.fill }}
                  />
                  <span className="text-xs">{item.category}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </CardContent>

      {footerText && (
        <CardFooter className="justify-center text-xs text-muted-foreground">
          {footerText}
        </CardFooter>
      )}
    </Card>
  );
};

export default DashboardPieChart;
