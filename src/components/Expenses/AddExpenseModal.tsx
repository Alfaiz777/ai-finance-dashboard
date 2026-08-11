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
import { createExpense } from "@/services/expenseService";
import type { Expense, ExpenseCategory } from "@/types";
import { Plus } from "lucide-react";
import { EXPENSE_CATEGORIES } from "@/shared/expenseCategories";

const AUTO_DETECT_CATEGORY = "__auto_detect__";

const CATEGORY_OPTIONS = [
  { value: AUTO_DETECT_CATEGORY, label: "Auto-detect (AI will categorize)" },
  ...EXPENSE_CATEGORIES.map((category) => ({
    value: category,
    label: category,
  })),
] as const;

const PAYMENT_METHODS = [
  { value: "upi", label: "UPI" },
  { value: "credit_card", label: "Credit Card" },
  { value: "debit_card", label: "Debit Card" },
  { value: "cash", label: "Cash" },
  { value: "net_banking", label: "Net Banking" },
];

// ── Props: parent gives us a callback to call when expense is created
interface AddExpenseModalProps {
  onExpenseAdded: (expense: Expense) => void;
}

const AddExpenseModal = ({ onExpenseAdded }: AddExpenseModalProps) => {
  // Controls whether dialog is open or closed
  const [open, setOpen] = useState(false);

  // Loading state while API call is in progress
  const [loading, setLoading] = useState(false);

  // Form state — all fields in one object for clean management
  const [form, setForm] = useState({
    amount: "",
    merchant: "",
    category: "" as ExpenseCategory | typeof AUTO_DETECT_CATEGORY | "",
    date: new Date().toISOString().split("T")[0], // today's date as default
    paymentMethod: "",
  });

  // Called when user clicks "Add Expense" button inside the dialog
  const handleSubmit = async () => {
    // Validate — all fields required
    if (
      !form.amount ||
      !form.merchant ||
      !form.category ||
      !form.paymentMethod
    ) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      // Call the service — hits POST /api/expenses
      const expensePayload: any = {
        amount: Number(form.amount),
        merchant: form.merchant,
        date: form.date,
        paymentMethod: form.paymentMethod,
        source: "manual",
      };

      if (form.category !== AUTO_DETECT_CATEGORY) {
        expensePayload.category = form.category;
      }

      const newExpense = await createExpense(expensePayload);

      // Tell the parent about the new expense
      // Parent will prepend it to the expenses list
      onExpenseAdded(newExpense);

      // Close the dialog
      setOpen(false);

      // Reset the form for next time
      setForm({
        amount: "",
        merchant: "",
        category: "",
        date: new Date().toISOString().split("T")[0],
        paymentMethod: "",
      });
    } catch (error) {
      console.error("Failed to add expense:", error);
      alert("Failed to add expense. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    // Dialog wraps everything — open state controls visibility
    <Dialog open={open} onOpenChange={setOpen}>
      {/* DialogTrigger — clicking this opens the dialog */}
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:opacity-90 shadow-lg shadow-blue-500/20 transition">
          <Plus className="h-4 w-4" />
          Add Expense
        </Button>
      </DialogTrigger>

      {/* DialogContent — the actual modal box */}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Expense</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 pt-2">
          {/* Amount field */}
          <div>
            <label className="text-sm font-medium mb-1 block">Amount (₹)</label>
            <Input
              type="number"
              placeholder="e.g. 500"
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
            />
          </div>

          {/* Merchant field */}
          <div>
            <label className="text-sm font-medium mb-1 block">Merchant</label>
            <Input
              placeholder="e.g. Swiggy, Amazon"
              value={form.merchant}
              onChange={(e) => setForm({ ...form, merchant: e.target.value })}
            />
          </div>

          {/* Category dropdown */}
          <div>
            <label className="text-sm font-medium mb-1 block">Category</label>
            <Select
              value={form.category}
              onValueChange={(val) =>
                setForm({
                  ...form,
                  category: val as
                    | ExpenseCategory
                    | typeof AUTO_DETECT_CATEGORY,
                })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORY_OPTIONS.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Payment Method dropdown */}
          <div>
            <label className="text-sm font-medium mb-1 block">
              Payment Method
            </label>
            <Select
              value={form.paymentMethod}
              onValueChange={(val) => setForm({ ...form, paymentMethod: val })}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select method" />
              </SelectTrigger>
              <SelectContent>
                {PAYMENT_METHODS.map((m) => (
                  <SelectItem key={m.value} value={m.value}>
                    {m.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Date field */}
          <div>
            <label className="text-sm font-medium mb-1 block">Date</label>
            <Input
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
            />
          </div>

          {/* Submit button */}
          <Button className="w-full" onClick={handleSubmit} disabled={loading}>
            {loading ? "Adding..." : "Add Expense"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddExpenseModal;
