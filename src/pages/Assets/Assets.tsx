import { useState, useEffect } from "react";
import { getAssets } from "@/services/assetService";
import type {
  Asset,
  BankAccount,
  FixedDeposit,
  StockHolding,
  MutualFund,
} from "@/types";
import { calculateTotalAssets } from "@/utils/financial-calculations";
import AssetSection from "@/components/Assets/AssetSection";
import AssetCard from "@/components/Assets/AssetCard";
import { Landmark, BadgeIndianRupee, TrendingUp, PieChart } from "lucide-react";

const Assets = () => {
  //API state
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);

  //fetch on mount
  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const data = await getAssets();
        setAssets(data);
      } catch (error) {
        console.error("Failed to fetch Assets", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAssets();
  }, []);

  // Derived groups
  const bankAccounts = assets.filter((a) => a.type === "bank") as BankAccount[];
  const fixedDeposits = assets.filter((a) => a.type === "fd") as FixedDeposit[];
  const stocks = assets.filter((a) => a.type === "stock") as StockHolding[];
  const mutualFunds = assets.filter(
    (a) => a.type === "mutual_fund",
  ) as MutualFund[];

  //calculated values
  const totalAssets = calculateTotalAssets(
    bankAccounts,
    fixedDeposits,
    stocks,
    mutualFunds,
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40 text-muted-foreground">
        Loading assets...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Total Assets */}
      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <p className="text-sm text-muted-foreground">Total Assets</p>
        <h1 className="text-3xl font-bold mt-2">
          ₹ {totalAssets.toLocaleString()}
        </h1>
      </div>

      {/* Bank Accounts */}
      <AssetSection title="Bank Accounts">
        {bankAccounts.map((account) => (
          <AssetCard
            key={account.id}
            title={account.name}
            subtitle={`${account.institution} • ****${account.accountNumberLast4}`}
            amount={account.amount}
            icon={<Landmark className="h-5 w-5 text-primary" />}
          />
        ))}
      </AssetSection>

      {/* Fixed Deposits */}
      <AssetSection title="Fixed Deposits">
        {fixedDeposits.map((fd) => (
          <AssetCard
            key={fd.id}
            title={fd.name}
            subtitle={`${fd.interestRate}% Interest`}
            amount={fd.amount}
            extraInfo={
              <>
                Maturity Date: {fd.maturityDate} <br />
                Expected Return: ₹ {fd.maturityAmount.toLocaleString()}
              </>
            }
            icon={<BadgeIndianRupee className="h-5 w-5 text-amber-500" />}
          />
        ))}
      </AssetSection>

      {/* Stocks */}
      <AssetSection title="Stocks">
        {stocks.map((stock) => (
          <AssetCard
            key={stock.id}
            title={`${stock.name} (${stock.ticker})`}
            subtitle={`Qty: ${stock.quantity}`}
            amount={stock.amount}
            extraInfo={
              <>
                Buy Price: ₹ {stock.buyPrice} <br />
                Current Price: ₹ {stock.currentPrice} <br />
                P/L: ₹ {stock.profitLoss}
              </>
            }
            icon={<TrendingUp className="h-5 w-5 text-green-600" />}
          />
        ))}
      </AssetSection>

      {/* Mutual Funds */}
      <AssetSection title="Mutual Funds">
        {mutualFunds.map((mf) => (
          <AssetCard
            key={mf.id}
            title={mf.name}
            subtitle={`Units: ${mf.units}`}
            amount={mf.currentValue}
            extraInfo={
              <>
                Invested: ₹ {mf.investedAmount} <br />
                NAV: ₹ {mf.nav}
              </>
            }
            icon={<PieChart className="h-5 w-5 text-blue-600" />}
          />
        ))}
      </AssetSection>
    </div>
  );
};

export default Assets;
