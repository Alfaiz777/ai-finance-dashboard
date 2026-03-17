import { useMemo, useState, useEffect } from "react";
// import { dummySplitWiseDebts } from "@/data/dummy";
import type { SplitWiseDebt } from "@/types";
import { getDebts } from "@/services/splitwiseService";
import NetBalanceCard from "@/components/SplitWise/NetBalanceCard";
import DebtList from "@/components/SplitWise/DebtList";

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
        <NetBalanceCard
          totalYouOwe={totalYouOwe}
          totalOwedToYou={totalOwedToYou}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <DebtList title="You Owe" data={youOweList} type="you_owe" />
          <DebtList title="They Owe You" data={theyOweList} type="they_owe" />
        </div>
      </div>
    </>
  );
};

export default SplitWise;
