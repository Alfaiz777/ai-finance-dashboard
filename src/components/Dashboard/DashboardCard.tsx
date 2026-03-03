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
    <Card className="rounded-2xl border bg-gradient-to-br from-background to-muted/30 shadow-sm hover:shadow-lg transition-all duration-300">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>

        {icon && <div className="text-muted-foreground">{icon}</div>}
      </CardHeader>

      <CardContent>
        <div className={`text-2xl font-bold ${valueClassName}`}>{value}</div>
      </CardContent>

      {footer && (
        <CardFooter className="pt-0">
          <p className="text-xs text-muted-foreground">{footer}</p>
        </CardFooter>
      )}
    </Card>
  );
};

export default DashboardCard;
