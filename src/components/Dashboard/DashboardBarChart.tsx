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
    <Card className="shadow-sm rounded-xl">
      <CardHeader>
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {description && (
          <CardDescription className="text-xs">{description}</CardDescription>
        )}
      </CardHeader>

      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center h-[250px] text-sm text-muted-foreground">
            Loading chart...
          </div>
        ) : (
          <div className="h-[250px] w-full">
            <ResponsiveContainer>
              <BarChart data={chartData}>
                <XAxis dataKey="month" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} />
                <Tooltip />
                <Bar dataKey="value" radius={6}>
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
        <CardFooter className="text-xs text-muted-foreground">
          {footerText}
        </CardFooter>
      )}
    </Card>
  );
};

export default DashboardBarChart;
