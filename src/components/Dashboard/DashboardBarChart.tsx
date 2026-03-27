import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";

type BarChartData = {
  month: string;
  value: number;
  fill: string;
};

type DashboardBarChartProps = {
  title: string;
  description?: string;
  chartData: BarChartData[];
  footerText?: string;
  loading?: boolean;
};

const DashboardBarChart = ({
  title,
  description,
  chartData,
  footerText,
  loading = false,
}: DashboardBarChartProps) => {
  return (
    <Card className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-lg shadow-black/30">
      <CardHeader>
        <CardTitle className="text-sm font-medium text-gray-300">
          {title}
        </CardTitle>
        {description && (
          <CardDescription className="text-xs text-gray-500">
            {description}
          </CardDescription>
        )}
      </CardHeader>

      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center h-[250px] text-sm text-gray-400">
            Loading chart...
          </div>
        ) : (
          <div className="h-[250px] w-full">
            <ResponsiveContainer>
              <BarChart data={chartData}>
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "#9CA3AF", fontSize: 12 }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "#9CA3AF", fontSize: 12 }}
                />
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
                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                  {chartData.map((entry) => (
                    <Cell key={entry.month} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>

      {footerText && (
        <CardFooter className="text-xs text-gray-500">{footerText}</CardFooter>
      )}
    </Card>
  );
};

export default DashboardBarChart;
