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
    <Card className="rounded-xl border border-border/40 bg-background/40 backdrop-blur-xl shadow-sm border-white/35">
      <CardContent className="p-3 space-y-4">
        <h3 className="font-semibold text-sm tracking-tight">{title}</h3>

        {data.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-6">
            No records
          </p>
        ) : (
          <div className="space-y-3">
            {data.map((debt) => (
              <div
                key={debt.id}
                className="flex justify-between items-center p-3 rounded-lg border border-border/30 bg-background/30 hover:bg-background/50 transition-all"
              >
                <div>
                  <p className="font-medium text-sm">{debt.personName}</p>
                  <p className="text-xs text-muted-foreground">
                    {debt.groupName}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`font-semibold text-sm ${
                      type === "you_owe" ? "text-red-400" : "text-green-400"
                    }`}
                  >
                    ₹ {debt.amount.toLocaleString()}
                  </span>
                  {/* Delete button — only shows if onDelete is passed */}
                  {onDelete && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-400 hover:text-red-500 hover:bg-red-500/10 h-7 w-7"
                      onClick={() => onDelete(debt.id)}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DebtList;
