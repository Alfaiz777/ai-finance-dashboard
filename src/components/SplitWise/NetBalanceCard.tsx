import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

interface NetBalanceCardProps {
  totalYouOwe: number;
  totalOwedToYou: number;
}

const NetBalanceCard = ({
  totalYouOwe,
  totalOwedToYou,
}: NetBalanceCardProps) => {
  const netBalance = totalOwedToYou - totalYouOwe;

  const isPositive = netBalance >= 0;

  const totalExposure = totalYouOwe + totalOwedToYou;

  const percentage =
    totalExposure === 0 ? 0 : (netBalance / totalExposure) * 100;

  return (
    <Card
      className={`rounded-xl border backdrop-blur-xl shadow-sm transition-all duration-300 hover:shadow-lg  ${
        isPositive
          ? "bg-gradient-to-br from-green-500/10 via-background/40 to-background/20 border-green-500/2"
          : "bg-gradient-to-br from-red-500/10 via-background/40 to-background/20 border-red-500/20"
      }`}
    >
      <CardContent className="p-6 space-y-5">
        <div>
          <p className="text-sm text-muted-foreground">Net Balance</p>

          <div className="flex items-center gap-2 mt-1">
            <h2
              className={`text-3xl font-bold tracking-tight ${
                isPositive ? "text-green-600" : "text-red-600"
              }`}
            >
              ₹ {Math.abs(netBalance).toLocaleString()}
            </h2>

            {isPositive ? (
              <ArrowUpRight className="h-6 w-6 text-green-500" />
            ) : (
              <ArrowDownRight className="h-6 w-6 text-red-500" />
            )}
          </div>

          <p
            className={`text-sm mt-2 ${
              isPositive ? "text-green-400" : "text-red-400"
            }`}
          >
            {isPositive ? "You're in positive balance" : "You owe more overall"}
          </p>

          <p className="text-xs text-muted-foreground mt-1">
            {Math.abs(percentage).toFixed(1)}% of total shared balance
          </p>
        </div>

        {/* DIVIDER */}
        <div className="h-px bg-border/40" />

        <div className="flex justify-between text-sm">
          <span className="text-red-400 font-medium">
            You Owe: ₹ {totalYouOwe.toLocaleString()}
          </span>

          <span className="text-green-400 font-medium">
            They Owe: ₹ {totalOwedToYou.toLocaleString()}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default NetBalanceCard;
