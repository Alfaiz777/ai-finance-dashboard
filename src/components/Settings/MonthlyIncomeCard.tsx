import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const MonthlyIncomeCard = () => {
  const [income, setIncome] = useState("");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Income</CardTitle>
      </CardHeader>

      <CardContent className="space-y-2">
        <p className="text-sm text-muted-foreground">
          This helps calculate your savings and financial insights.
        </p>

        <Input
          type="number"
          placeholder="Enter monthly income"
          value={income}
          onChange={(e) => setIncome(e.target.value)}
        />
      </CardContent>
    </Card>
  );
};

export default MonthlyIncomeCard;
