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
    <Card className="rounded-2xl border border-border/40 bg-background/40 backdrop-blur-xl shadow-sm border-white/35">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold tracking-tight">
          Monthly Income
        </CardTitle>
        <p className="text-xs text-muted-foreground">
          Used to calculate your savings rate and financial insights.
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
              ₹
            </span>
            <Input
              type="number"
              placeholder="Enter monthly income (₹)"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              className="pl-7 bg-background/50 border border-border/40 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all rounded-xl"
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSave();
              }}
            />
          </div>
          <Button
            onClick={handleSave}
            disabled={saving}
            className={`px-5 rounded-xl transition-all ${
              saved
                ? "bg-green-600 hover:bg-green-600 text-white"
                : "bg-gradient-to-r from-blue-500 to-indigo-600 hover:opacity-90 text-white shadow-lg shadow-blue-500/20"
            }`}
          >
            {saving ? "Saving..." : saved ? "Saved ✓" : "Save"}
          </Button>
        </div>
        {income && Number(income) > 0 && (
          <p className="text-xs text-muted-foreground">
            Your monthly income is set to{" "}
            <span className="text-foreground font-medium">
              ₹ {Number(income).toLocaleString()}
            </span>
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default MonthlyIncomeCard;
