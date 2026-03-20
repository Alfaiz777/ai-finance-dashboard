import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface AssetCardProps {
  title: string;
  subtitle?: string;
  amount: number;
  extraInfo?: React.ReactNode;
  icon?: React.ReactNode;
  onDelete?: () => void;
}

const AssetCard = ({
  title,
  subtitle,
  amount,
  extraInfo,
  icon,
  onDelete,
}: AssetCardProps) => {
  return (
    <Card className="rounded-xl shadow-sm">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div className="flex items-start gap-3">
            {icon && <div className="p-2 rounded-lg bg-muted">{icon}</div>}

            <div>
              <p className="font-medium">{title}</p>
              {subtitle && (
                <p className="text-xs text-muted-foreground">{subtitle}</p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="text-lg font-semibold">
              ₹ {amount.toLocaleString()}
            </div>
            {/* Only show delete button if onDelete is passed */}
            {onDelete && (
              <Button
                variant="ghost"
                size="icon"
                className="text-red-500 hover:text-red-700 hover:bg-red-50 h-8 w-8"
                onClick={onDelete}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        {extraInfo && (
          <div className="mt-3 text-xs text-muted-foreground">{extraInfo}</div>
        )}
      </CardContent>
    </Card>
  );
};

export default AssetCard;
