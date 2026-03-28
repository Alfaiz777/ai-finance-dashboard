import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createAsset } from "@/services/assetService";
import type { Asset } from "@/types";
import { Plus } from "lucide-react";

interface AddAssetModalProps {
  onAssetAdded: (asset: Asset) => void;
}

const AddAssetModal = ({ onAssetAdded }: AddAssetModalProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // ── Type selector — drives which fields appear ─────────────
  const [assetType, setAssetType] = useState("");

  // ── Common fields — all types need these ──────────────────
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [institution, setInstitution] = useState("");

  // ── Bank-specific ──────────────────────────────────────────
  const [accountNumberLast4, setAccountNumberLast4] = useState("");
  const [accountType, setAccountType] = useState("savings");

  // ── FD-specific ────────────────────────────────────────────
  const [interestRate, setInterestRate] = useState("");
  const [maturityDate, setMaturityDate] = useState("");

  // ── Stock-specific ─────────────────────────────────────────
  const [ticker, setTicker] = useState("");
  const [quantity, setQuantity] = useState("");
  const [buyPrice, setBuyPrice] = useState("");
  const [currentPrice, setCurrentPrice] = useState("");

  // ── Mutual Fund-specific ───────────────────────────────────
  const [units, setUnits] = useState("");
  const [nav, setNav] = useState("");

  // ── Reset all fields — called after successful submit ──────
  const resetForm = () => {
    setAssetType("");
    setName("");
    setAmount("");
    setInstitution("");
    setAccountNumberLast4("");
    setAccountType("savings");
    setInterestRate("");
    setMaturityDate("");
    setTicker("");
    setQuantity("");
    setBuyPrice("");
    setCurrentPrice("");
    setUnits("");
    setNav("");
  };

  // ── Build payload based on selected type ──────────────────
  // Only sends relevant fields to backend — no empty fields
  const buildPayload = () => {
    const base = {
      type: assetType,
      name,
      amount: Number(amount),
      institution,
    };

    if (assetType === "bank") {
      return {
        ...base,
        accountType,
        accountNumberLast4,
      };
    }

    if (assetType === "fd") {
      return {
        ...base,
        principal: Number(amount),
        interestRate: Number(interestRate),
        startDate: new Date().toISOString().split("T")[0],
        maturityDate,
        // Simple maturity amount estimate — principal + interest for 1 year
        maturityAmount: Number(amount) * (1 + Number(interestRate) / 100),
      };
    }

    if (assetType === "stock") {
      const qty = Number(quantity);
      const bp = Number(buyPrice);
      const cp = Number(currentPrice) || bp; // default to buy price if not entered
      return {
        ...base,
        ticker: ticker.toUpperCase(),
        quantity: qty,
        buyPrice: bp,
        currentPrice: cp,
        profitLoss: (cp - bp) * qty, // calculated automatically
      };
    }

    if (assetType === "mutual_fund") {
      const u = Number(units);
      const n = Number(nav);
      return {
        ...base,
        units: u,
        nav: n,
        investedAmount: Number(amount),
        currentValue: u * n, // units × NAV = current value
      };
    }

    return base;
  };

  // ── Validation per type ────────────────────────────────────
  const isValid = () => {
    if (!assetType || !name || !amount || !institution) return false;

    if (assetType === "fd" && (!interestRate || !maturityDate)) return false;
    if (assetType === "stock" && (!ticker || !quantity || !buyPrice))
      return false;
    if (assetType === "mutual_fund" && (!units || !nav)) return false;

    return true;
  };

  const handleSubmit = async () => {
    if (!isValid()) {
      alert("Please fill all required fields");
      return;
    }

    setLoading(true);
    try {
      const payload = buildPayload();
      const newAsset = await createAsset(payload);

      onAssetAdded(newAsset); // ← tell parent about new asset
      setOpen(false);
      resetForm();
    } catch (error) {
      console.error("Failed to add asset:", error);
      alert("Failed to add asset. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:opacity-90 shadow-lg shadow-blue-500/20 transition">
          <Plus className="h-4 w-4" />
          Add Asset
        </Button>
      </DialogTrigger>

      {/* overflow-y-auto handles long forms on small screens */}
      <DialogContent className="max-h-[90vh] overflow-y-auto bg-background/80 backdrop-blur-xl border border-border/40 shadow-xl rounded-xl">
        <DialogHeader>
          <DialogTitle>Add New Asset</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 pt-2">
          {/* ── Step 1: Type selector — always shown first ─── */}
          <div>
            <label className="text-sm font-medium mb-1 block">Asset Type</label>
            <Select value={assetType} onValueChange={setAssetType}>
              <SelectTrigger className="w-full bg-background/40 border-border/40 backdrop-blur-md border-white/35">
                <SelectValue placeholder="Select type first" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bank">Bank Account</SelectItem>
                <SelectItem value="fd">Fixed Deposit</SelectItem>
                <SelectItem value="stock">Stock</SelectItem>
                <SelectItem value="mutual_fund">Mutual Fund</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* ── Step 2: Common fields — shown once type is picked ─ */}
          {assetType && (
            <>
              <div>
                <label className="text-sm font-medium mb-1 block">Name</label>
                <Input
                  placeholder={
                    assetType === "bank"
                      ? "e.g. HDFC Savings Account"
                      : assetType === "fd"
                        ? "e.g. SBI FD 1 Year"
                        : assetType === "stock"
                          ? "e.g. Reliance Industries"
                          : "e.g. Mirae Large Cap Fund"
                  }
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-background/40 border-border/40 focus:ring-2 focus:ring-primary/30 border-white/35"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">
                  {assetType === "stock"
                    ? "Total Current Value (₹)"
                    : assetType === "mutual_fund"
                      ? "Amount Invested (₹)"
                      : "Amount (₹)"}
                </label>
                <Input
                  type="number"
                  placeholder="e.g. 50000"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="bg-background/40 border-border/40 focus:ring-2 focus:ring-primary/30 border-white/35"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">
                  Institution
                </label>
                <Input
                  placeholder={
                    assetType === "stock" || assetType === "mutual_fund"
                      ? "e.g. Zerodha, Groww"
                      : "e.g. HDFC, SBI, ICICI"
                  }
                  value={institution}
                  onChange={(e) => setInstitution(e.target.value)}
                  className="bg-background/40 border-border/40 focus:ring-2 focus:ring-primary/30 border-white/35"
                />
              </div>
            </>
          )}

          {/* ── Bank-specific fields ───────────────────────── */}
          {assetType === "bank" && (
            <>
              <div>
                <label className="text-sm font-medium mb-1 block">
                  Account Type
                </label>
                <Select value={accountType} onValueChange={setAccountType}>
                  <SelectTrigger className="w-full bg-background/40 border-border/40 backdrop-blur-md border-white/35">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="savings">Savings</SelectItem>
                    <SelectItem value="current">Current</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">
                  Last 4 digits of account number
                </label>
                <Input
                  maxLength={4}
                  placeholder="e.g. 4521"
                  value={accountNumberLast4}
                  onChange={(e) => {
                    // Only allow digits
                    const val = e.target.value.replace(/\D/g, "");
                    setAccountNumberLast4(val);
                  }}
                  className="bg-background/40 border-border/40 focus:ring-2 focus:ring-primary/30 border-white/35"
                />
              </div>
            </>
          )}

          {/* ── FD-specific fields ─────────────────────────── */}
          {assetType === "fd" && (
            <>
              <div>
                <label className="text-sm font-medium mb-1 block">
                  Interest Rate (% per year)
                </label>
                <Input
                  type="number"
                  placeholder="e.g. 7.5"
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                  className="bg-background/40 border-border/40 focus:ring-2 focus:ring-primary/30 border-white/35"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">
                  Maturity Date
                </label>
                <Input
                  type="date"
                  value={maturityDate}
                  onChange={(e) => setMaturityDate(e.target.value)}
                  className="bg-background/40 border-border/40 focus:ring-2 focus:ring-primary/30 border-white/35"
                />
              </div>
            </>
          )}

          {/* ── Stock-specific fields ──────────────────────── */}
          {assetType === "stock" && (
            <>
              <div>
                <label className="text-sm font-medium mb-1 block">
                  Ticker Symbol
                </label>
                <Input
                  placeholder="e.g. RELIANCE, TCS, INFY"
                  value={ticker}
                  onChange={(e) => setTicker(e.target.value.toUpperCase())}
                  className="bg-background/40 border-border/40 focus:ring-2 focus:ring-primary/30 border-white/35"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">
                  Quantity (shares)
                </label>
                <Input
                  type="number"
                  placeholder="e.g. 10"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="bg-background/40 border-border/40 focus:ring-2 focus:ring-primary/30 border-white/35"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">
                  Buy Price per share (₹)
                </label>
                <Input
                  type="number"
                  placeholder="e.g. 2200"
                  value={buyPrice}
                  onChange={(e) => setBuyPrice(e.target.value)}
                  className="bg-background/40 border-border/40 focus:ring-2 focus:ring-primary/30 border-white/35"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">
                  Current Price per share (₹)
                  <span className="text-muted-foreground font-normal ml-1">
                    (optional)
                  </span>
                </label>
                <Input
                  type="number"
                  placeholder="Leave empty to use buy price"
                  value={currentPrice}
                  onChange={(e) => setCurrentPrice(e.target.value)}
                  className="bg-background/40 border-border/40 focus:ring-2 focus:ring-primary/30 border-white/35"
                />
              </div>
            </>
          )}

          {/* ── Mutual Fund-specific fields ────────────────── */}
          {assetType === "mutual_fund" && (
            <>
              <div>
                <label className="text-sm font-medium mb-1 block">
                  Units held
                </label>
                <Input
                  type="number"
                  placeholder="e.g. 245.6"
                  value={units}
                  onChange={(e) => setUnits(e.target.value)}
                  className="bg-background/40 border-border/40 focus:ring-2 focus:ring-primary/30 border-white/35"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">
                  Current NAV (₹ per unit)
                </label>
                <Input
                  type="number"
                  placeholder="e.g. 98.4"
                  value={nav}
                  onChange={(e) => setNav(e.target.value)}
                  className="bg-background/40 border-border/40 focus:ring-2 focus:ring-primary/30 border-white/35"
                />
              </div>
            </>
          )}

          {/* ── Submit — only shows after type is selected ─── */}
          {assetType && (
            <Button
              className="w-full"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading
                ? "Adding..."
                : `Add ${
                    assetType === "bank"
                      ? "Bank Account"
                      : assetType === "fd"
                        ? "Fixed Deposit"
                        : assetType === "stock"
                          ? "Stock"
                          : "Mutual Fund"
                  }`}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddAssetModal;
