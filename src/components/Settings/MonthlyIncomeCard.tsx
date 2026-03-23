import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { getUserProfile, updateIncome } from "@/services/userService";

const MonthlyIncomeCard = () => {
  const [income, setIncome] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // Load current income when component mounts
  useEffect(() => {
    getUserProfile()
      .then((user) => {
        // Only set if user has income saved
        if (user.monthlyIncome > 0) {
          setIncome(user.monthlyIncome.toString());
        }
      })
      .catch((err) => console.error("Failed to load income:", err));
  }, []);

  const handleSave = async () => {
    if (!income || Number(income) <= 0) return;

    setSaving(true);
    try {
      await updateIncome(Number(income));
      setSaved(true);
      // Reset "Saved ✓" back to "Save" after 2 seconds
      setTimeout(() => setSaved(false), 2000);
    } catch (error) {
      console.error("Failed to save income:", error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Income</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground">
          Used to calculate your savings rate on the dashboard.
        </p>
        <div className="flex gap-2">
          <Input
            type="number"
            placeholder="Enter monthly income (₹)"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            className="flex-1"
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSave();
            }}
          />
          <Button onClick={handleSave} disabled={saving}>
            {saving ? "Saving..." : saved ? "Saved ✓" : "Save"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MonthlyIncomeCard;
