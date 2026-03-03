import { Card, CardContent } from "@/components/ui/card";

interface AssetCardProps {
  title: string;
  subtitle?: string;
  amount: number;
  extraInfo?: React.ReactNode;
  icon?: React.ReactNode;
}

const AssetCard = ({
  title,
  subtitle,
  amount,
  extraInfo,
  icon,
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

          <div className="text-lg font-semibold">
            ₹ {amount.toLocaleString()}
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
