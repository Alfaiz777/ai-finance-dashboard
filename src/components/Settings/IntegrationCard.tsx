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
    <Card className="h-full rounded-2xl border border-border/40 bg-background/40 backdrop-blur-xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between border-white/35">
      <CardHeader className="flex flex-row items-start gap-3 pb-3">
        {/* Icon */}
        <div className="p-2 rounded-lg bg-muted/50 border border-border/40">
          {icon}
        </div>

        {/* Title + Description */}
        <div className="flex-1">
          <CardTitle className="text-base font-semibold tracking-tight">
            {title}
          </CardTitle>
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        </div>

        {/* STATUS BADGE */}
        <Badge
          className={`text-xs px-2 py-1 ${
            comingSoon
              ? "bg-yellow-500/10 text-yellow-600 border border-yellow-500/20"
              : connected
                ? "bg-green-500/10 text-green-600 border border-green-500/20"
                : "bg-muted text-muted-foreground border border-border/40"
          }`}
        >
          {comingSoon ? "Manual" : connected ? "Connected" : "Not Connected"}
        </Badge>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          {/* LEFT SIDE (status hint) */}
          <p className="text-xs text-muted-foreground">
            {comingSoon
              ? "This feature works manually via Split & Owe."
              : connected
                ? "Your account is connected and ready to sync."
                : "Connect your account to enable automation."}
          </p>
          {/* RIGHT SIDE (actions) */}
          <div className="flex items-center gap-2">
            {/* Sync button — only when connected and onSync provided */}
            {connected && onSync && (
              <Button
                variant="outline"
                size="sm"
                onClick={onSync}
                disabled={syncing}
                className="flex items-center gap-2 border-border/40 bg-background/50 hover:bg-muted/50 "
              >
                <RefreshCw
                  className={`h-3.5 w-3.5 ${syncing ? "animate-spin" : ""}`}
                />
                {syncing ? "Syncing..." : "Sync"}
              </Button>
            )}

            {/* Connect / Disconnect button */}
            {!comingSoon && (
              <Button
                size="sm"
                onClick={connected ? onDisconnect : onConnect}
                className={`px-4 ${
                  connected
                    ? "bg-red-500/90 hover:bg-red-600 text-white"
                    : "bg-gradient-to-r from-blue-500 to-indigo-600 hover:opacity-90 text-white shadow-md shadow-blue-500/20"
                }`}
              >
                {connected ? "Disconnect" : "Connect"}
              </Button>
            )}
          </div>
        </div>

        {/* Sync result message shown after sync completes */}
        {syncResult && (
          <div className="text-xs rounded-lg border border-border/40 bg-muted/30 px-3 py-2 text-muted-foreground">
            {syncResult}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default IntegrationCard;
