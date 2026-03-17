import { Card, CardContent } from "@/components/ui/card";
import type { SplitWiseDebt } from "@/types";

const DebtList = ({
  title,
  data,
  type,
}: {
  title: string;
  data: SplitWiseDebt[];
  type: "you_owe" | "they_owe";
}) => {
  return (
    <Card className="rounded-xl shadow-sm">
      <CardContent className="p-6 space-y-4">
        <h3 className="font-semibold">{title}</h3>

        {data.length === 0 ? (
          <p className="text-sm text-muted-foreground">No records</p>
        ) : (
          data.map((debt) => (
            <div
              key={debt.id}
              className="flex justify-between items-center border-b pb-2"
            >
              <div>
                <p className="font-medium">{debt.personName}</p>
                <p className="text-xs text-muted-foreground">
                  {debt.groupName}
                </p>
              </div>

              <span
                className={`font-semibold ${
                  type === "you_owe" ? "text-red-500" : "text-green-600"
                }`}
              >
                ₹ {debt.amount.toLocaleString()}
              </span>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default DebtList;
