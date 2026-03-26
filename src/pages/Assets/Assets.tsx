import { useState, useEffect } from "react";
import { getAssets, deleteAsset } from "@/services/assetService";
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
import AddAssetModal from "@/components/Assets/AddAssetModal";

const Assets = () => {
  //API state
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);

  const isEmpty = assets.length === 0;

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

  // ── Called by modal when asset is created ─────────────────
  const handleAssetAdded = (newAsset: Asset) => {
    setAssets((prev) => [...prev, newAsset]);
  };

  // ── Called by delete button on each AssetCard ─────────────
  const handleAssetDeleted = async (id: string) => {
    try {
      await deleteAsset(id);
      setAssets((prev) => prev.filter((a) => a.id !== id));
    } catch (error) {
      console.error("Failed to delete asset:", error);
    }
  };

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

  return isEmpty ? (
    // 🔥 EMPTY STATE
    <div className="flex flex-col items-center justify-center h-[70vh] text-center space-y-4">
      <div className="text-4xl">🏦</div>

      <h2 className="text-xl font-semibold">No Assets Added</h2>

      <p className="text-muted-foreground max-w-sm">
        Start building your net worth by adding your first asset like bank
        accounts, stocks, or mutual funds.
      </p>

      <AddAssetModal onAssetAdded={handleAssetAdded} />
    </div>
  ) : (
    <div className="space-y-8">
      {/* Total Assets */}
      <div className="flex items-center justify-between">
        <div className="rounded-xl border bg-card p-6 shadow-sm flex-1 mr-4">
          <p className="text-sm text-muted-foreground">Total Assets</p>
          <h1 className="text-3xl font-bold mt-2">
            ₹ {totalAssets.toLocaleString()}
          </h1>
        </div>
        <AddAssetModal onAssetAdded={handleAssetAdded} />
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
            onDelete={() => handleAssetDeleted(account.id)}
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
            onDelete={() => handleAssetDeleted(fd.id)}
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
            onDelete={() => handleAssetDeleted(stock.id)}
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
            onDelete={() => handleAssetDeleted(mf.id)}
          />
        ))}
      </AssetSection>
    </div>
  );
};

export default Assets;
