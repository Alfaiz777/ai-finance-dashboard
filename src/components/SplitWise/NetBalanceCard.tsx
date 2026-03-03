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
      className={`rounded-xl shadow-sm border ${
        isPositive ? "bg-green-50 border-green-100" : "bg-red-50 border-red-100"
      }`}
    >
      <CardContent className="p-6 space-y-4">
        <div>
          <p className="text-sm text-muted-foreground">Net Balance</p>

          <div className="flex items-center gap-2">
            <h2
              className={`text-3xl font-bold ${
                isPositive ? "text-green-600" : "text-red-600"
              }`}
            >
              ₹ {Math.abs(netBalance).toLocaleString()}
            </h2>

            {isPositive ? (
              <ArrowUpRight className="h-6 w-6 text-green-600" />
            ) : (
              <ArrowDownRight className="h-6 w-6 text-red-600" />
            )}
          </div>

          <p
            className={`text-sm mt-2 ${
              isPositive ? "text-green-700" : "text-red-700"
            }`}
          >
            {isPositive ? "You're in positive balance" : "You owe more overall"}
          </p>

          <p className="text-xs text-muted-foreground">
            {Math.abs(percentage).toFixed(1)}% of total shared balance
          </p>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-red-500">
            You Owe: ₹ {totalYouOwe.toLocaleString()}
          </span>

          <span className="text-green-600">
            They Owe: ₹ {totalOwedToYou.toLocaleString()}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default NetBalanceCard;
