import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type Props = {
  title: string;
  description: string;
  connected?: boolean;
  icon?: React.ReactNode;
};

const IntegrationCard = ({ title, description, connected, icon }: Props) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-3">
        {icon}

        <div>
          <CardTitle>{title}</CardTitle>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </CardHeader>

      <CardContent className="flex items-center justify-between">
        <Badge variant={connected ? "default" : "secondary"}>
          {connected ? "Connected" : "Not Connected"}
        </Badge>

        <Button
          variant={connected ? "destructive" : "default"}
          className="cursor-pointer"
        >
          {connected ? "Disconnect" : "Connect"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default IntegrationCard;
