import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Props = {
  title: string;
  description: string;
  connected?: boolean;
};

const IntegrationCard = ({ title, description, connected }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>

      <CardContent className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{description}</p>

        <Button
          variant={connected ? "secondary" : "default"}
          className="cursor-pointer"
        >
          {connected ? "Connected" : "Connect"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default IntegrationCard;
