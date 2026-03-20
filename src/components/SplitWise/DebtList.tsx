import { Card, CardContent } from "@/components/ui/card";
import type { SplitWiseDebt } from "@/types";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

const DebtList = ({
  title,
  data,
  type,
  onDelete,
}: {
  title: string;
  data: SplitWiseDebt[];
  type: "you_owe" | "they_owe";
  onDelete?: (id: string) => void;
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
              <div className="flex items-center gap-2">
                <span
                  className={`font-semibold ${
                    type === "you_owe" ? "text-red-500" : "text-green-600"
                  }`}
                >
                  ₹ {debt.amount.toLocaleString()}
                </span>
                {/* Delete button — only shows if onDelete is passed */}
                {onDelete && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-red-400 hover:text-red-600 hover:bg-red-50 h-7 w-7"
                    onClick={() => onDelete(debt.id)}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                )}
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default DebtList;
