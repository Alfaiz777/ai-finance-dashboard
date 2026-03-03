import { useMemo } from "react";
import { dummySplitWiseDebts } from "@/data/dummy";
import NetBalanceCard from "@/components/SplitWise/NetBalanceCard";
import DebtList from "@/components/SplitWise/DebtList";

const SplitWise = () => {
  const youOweList = useMemo(() => {
    return dummySplitWiseDebts.filter((debt) => debt.direction === "you_owe");
  }, []);

  const theyOweList = useMemo(() => {
    return dummySplitWiseDebts.filter((debt) => debt.direction === "they_owe");
  }, []);

  //calculate Totals
  const totalYouOwe = useMemo(() => {
    return youOweList.reduce((sum, debt) => sum + debt.amount, 0);
  }, [youOweList]);

  const totalOwedToYou = useMemo(() => {
    return theyOweList.reduce((sum, debt) => sum + debt.amount, 0);
  }, [theyOweList]);

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
