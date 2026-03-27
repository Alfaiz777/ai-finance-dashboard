import type { ReactNode } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

type DashboardCardProps = {
  title: string;
  value: string | number | ReactNode;
  icon?: ReactNode;
  footer?: string;
  valueClassName?: string;
};

const DashboardCard = ({
  title,
  value,
  icon,
  footer,
  valueClassName,
}: DashboardCardProps) => {
  return (
    <Card className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-lg shadow-black/30 hover:shadow-blue-500/10 transition-all duration-300 hover:scale-[1.02]">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-gray-400">
          {title}
        </CardTitle>

        {icon && <div className="text-blue-400">{icon}</div>}
      </CardHeader>

      <CardContent>
        <div
          className={`text-2xl font-bold text-white tracking-tight ${valueClassName}`}
        >
          {value}
        </div>
      </CardContent>

      {footer && (
        <CardFooter className="pt-0">
          <p className="text-xs text-gray-500">{footer}</p>
        </CardFooter>
      )}
    </Card>
  );
};

export default DashboardCard;
