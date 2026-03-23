import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RefreshCw } from "lucide-react";

type Props = {
  title: string;
  description: string;
  connected?: boolean;
  icon?: React.ReactNode;
  onConnect?: () => void;
  onDisconnect?: () => void;
  onSync?: () => void;
  syncing?: boolean;
  syncResult?: string | null;
  comingSoon?: boolean;
};

const IntegrationCard = ({
  title,
  description,
  connected,
  icon,
  onConnect,
  onDisconnect,
  onSync,
  syncing,
  syncResult,
  comingSoon,
}: Props) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-3">
        {icon}
        <div>
          <CardTitle>{title}</CardTitle>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex items-center justify-between">
          {/* Status badge */}
          <Badge variant={connected ? "default" : "secondary"}>
            {comingSoon
              ? "Manual Entry"
              : connected
                ? "Connected"
                : "Not Connected"}
          </Badge>

          <div className="flex gap-2">
            {/* Sync button — only when connected and onSync provided */}
            {connected && onSync && (
              <Button
                variant="outline"
                size="sm"
                onClick={onSync}
                disabled={syncing}
                className="flex items-center gap-2"
              >
                <RefreshCw
                  className={`h-3.5 w-3.5 ${syncing ? "animate-spin" : ""}`}
                />
                {syncing ? "Syncing..." : "Sync Now"}
              </Button>
            )}

            {/* Connect / Disconnect button */}
            {!comingSoon && (
              <Button
                variant={connected ? "destructive" : "default"}
                size="sm"
                onClick={connected ? onDisconnect : onConnect}
              >
                {connected ? "Disconnect" : "Connect"}
              </Button>
            )}
          </div>
        </div>

        {/* Sync result message shown after sync completes */}
        {syncResult && (
          <p className="text-xs text-muted-foreground bg-muted px-3 py-2 rounded-md">
            {syncResult}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default IntegrationCard;
