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
    <Card className="rounded-xl border border-border/40 bg-background/40 backdrop-blur-xl shadow-sm hover:shadow-lg hover:scale-[1.01] transition-all duration-300">
      <CardContent className="p-5">
        <div className="flex justify-between items-start">
          <div className="flex items-start gap-3">
            {icon && (
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                {icon}
              </div>
            )}

            <div>
              <p className="font-semibold text-sm tracking-tight">{title}</p>
              {subtitle && (
                <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="text-lg font-semibold text-right">
              ₹ {amount.toLocaleString()}
            </div>
            {/* Only show delete button if onDelete is passed */}
            {onDelete && (
              <Button
                variant="ghost"
                size="icon"
                className="text-red-500 hover:text-red-600 hover:bg-red-500/10 h-8 w-8 transition"
                onClick={onDelete}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        {extraInfo && (
          <div className="mt-3 text-xs text-muted-foreground leading-relaxed border-t border-border/30 pt-3">
            {extraInfo}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AssetCard;
