import { useMemo, useState, useEffect } from "react";
import type { SplitWiseDebt } from "@/types";
import { getDebts, deleteDebt } from "@/services/splitwiseService";
import NetBalanceCard from "@/components/SplitWise/NetBalanceCard";
import DebtList from "@/components/SplitWise/DebtList";
import AddDebtModal from "@/components/SplitWise/AddDebtModal";

const SplitWise = () => {
  const [debts, setDebts] = useState<SplitWiseDebt[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDebts = async () => {
      try {
        const data = await getDebts();
        setDebts(data);
      } catch (error) {
        console.error("Failed to fetch debts");
      } finally {
        setLoading(false);
      }
    };
    fetchDebts();
  }, []);

  // ── Called by modal ────────────────────────────────────────
  const handleDebtAdded = (newDebt: SplitWiseDebt) => {
    setDebts((prev) => [newDebt, ...prev]);
  };

  // ── Called by delete button in DebtList ───────────────────
  const handleDebtDeleted = async (id: string) => {
    try {
      await deleteDebt(id);
      setDebts((prev) => prev.filter((d) => d.id !== id));
    } catch (error) {
      console.error("Failed to delete debt:", error);
    }
  };

  const youOweList = useMemo(() => {
    return debts.filter((debt) => debt.direction === "you_owe");
  }, [debts]);

  const theyOweList = useMemo(() => {
    return debts.filter((debt) => debt.direction === "they_owe");
  }, [debts]);

  //calculate Totals
  const totalYouOwe = useMemo(() => {
    return youOweList.reduce((sum, debt) => sum + debt.amount, 0);
  }, [youOweList]);

  const totalOwedToYou = useMemo(() => {
    return theyOweList.reduce((sum, debt) => sum + debt.amount, 0);
  }, [theyOweList]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40 text-muted-foreground">
        Loading split expenses...
      </div>
    );
  }

  return (
    <>
      <div className="space-y-8">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <NetBalanceCard
              totalYouOwe={totalYouOwe}
              totalOwedToYou={totalOwedToYou}
            />
          </div>
          <AddDebtModal onDebtAdded={handleDebtAdded} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <DebtList
            title="You Owe"
            data={youOweList}
            type="you_owe"
            onDelete={handleDebtDeleted}
          />
          <DebtList
            title="They Owe You"
            data={theyOweList}
            type="they_owe"
            onDelete={handleDebtDeleted}
          />
        </div>
      </div>
    </>
  );
};

export default SplitWise;
