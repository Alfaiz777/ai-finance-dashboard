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
    <Card className="flex flex-col rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-lg shadow-black/30">
      <CardHeader className="items-center pb-2">
        <CardTitle className="text-sm font-medium text-gray-300 text-center">
          {title}
        </CardTitle>
        {description && (
          <CardDescription className="text-xs text-gray-500 text-center">
            {description}
          </CardDescription>
        )}
      </CardHeader>

      <CardContent className="flex flex-col items-center">
        {loading ? (
          <div className="h-[220px] flex items-center justify-center text-sm text-gray-400">
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
                    innerRadius={40}
                    paddingAngle={3}
                  >
                    {chartData.map((entry) => (
                      <Cell key={entry.category} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background: "rgba(15, 23, 42, 0.95)", // dark glass
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "10px",
                      color: "#ffffff", // ✅ FIX TEXT COLOR
                      fontSize: "12px",
                    }}
                    labelStyle={{
                      color: "#cbd5f5", // light label (date/month)
                      fontWeight: 500,
                    }}
                    itemStyle={{
                      color: "#ffffff", // value text
                    }}
                    cursor={{ fill: "rgba(255,255,255,0.05)" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Custom Legend */}
            <div className="flex flex-wrap justify-center gap-4 mt-4">
              {chartData.map((item) => (
                <div key={item.category} className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-full shadow-sm"
                    style={{ backgroundColor: item.fill }}
                  />
                  <span className="text-xs text-gray-300">{item.category}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </CardContent>

      {footerText && (
        <CardFooter className="justify-center text-xs text-gray-500">
          {footerText}
        </CardFooter>
      )}
    </Card>
  );
};

export default DashboardPieChart;
