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
import { createDebt } from "@/services/splitwiseService";
import type { SplitWiseDebt } from "@/types";
import { Plus } from "lucide-react";

interface AddDebtModalProps {
  onDebtAdded: (debt: SplitWiseDebt) => void;
}

const AddDebtModal = ({ onDebtAdded }: AddDebtModalProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // All form fields in one object — simple form doesn't need separate vars
  const [form, setForm] = useState({
    personName: "",
    amount: "",
    direction: "" as "you_owe" | "they_owe" | "",
    groupName: "",
  });

  const handleSubmit = async () => {
    // Validate required fields
    if (!form.personName || !form.amount || !form.direction) {
      alert("Please fill person name, amount and direction");
      return;
    }

    if (Number(form.amount) <= 0) {
      alert("Amount must be greater than 0");
      return;
    }

    setLoading(true);
    try {
      const newDebt = await createDebt({
        personName: form.personName,
        amount: Number(form.amount),
        direction: form.direction,
        groupName: form.groupName || "General", // default if empty
      });

      onDebtAdded(newDebt); // ← tell parent to add to its list
      setOpen(false);

      // Reset form
      setForm({ personName: "", amount: "", direction: "", groupName: "" });
    } catch (error) {
      console.error("Failed to add debt:", error);
      alert("Failed to add entry. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:opacity-90 shadow-lg shadow-blue-500/20 transition">
          <Plus className="h-4 w-4" />
          Add Entry
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-background/80 backdrop-blur-xl border border-border/40 shadow-xl rounded-xl">
        <DialogHeader>
          <DialogTitle>Add Split Entry</DialogTitle>
        </DialogHeader>

        <div className="space-y-5 pt-2">
          {/* Person Name */}
          <div>
            <label className="text-sm font-medium mb-1 block">
              Person Name
            </label>
            <Input
              placeholder="e.g. Rahul Shah, Priya Patel"
              value={form.personName}
              onChange={(e) => setForm({ ...form, personName: e.target.value })}
              className="bg-background/40 border-border/40 focus:ring-2 focus:ring-primary/30 border-white/35"
            />
          </div>

          {/* Amount */}
          <div>
            <label className="text-sm font-medium mb-1 block">Amount (₹)</label>
            <Input
              type="number"
              placeholder="e.g. 500"
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
              className="bg-background/40 border-border/40 focus:ring-2 focus:ring-primary/30 border-white/35"
            />
          </div>

          {/* Direction — the most important field */}
          <div>
            <label className="text-sm font-medium mb-1 block">
              Who owes who?
            </label>
            <Select
              value={form.direction}
              onValueChange={(val) =>
                setForm({ ...form, direction: val as "you_owe" | "they_owe" })
              }
            >
              <SelectTrigger className="w-full bg-background/40 border-border/40 backdrop-blur-md border-white/35">
                <SelectValue placeholder="Select direction" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="you_owe">I owe them</SelectItem>
                <SelectItem value="they_owe">They owe me</SelectItem>
              </SelectContent>
            </Select>

            {/* Helper text — shows what will happen based on selection */}
            {form.direction === "you_owe" && form.personName && (
              <p className="text-xs text-red-500 mt-1">
                You owe {form.personName} ₹{form.amount || "..."}
              </p>
            )}
            {form.direction === "they_owe" && form.personName && (
              <p className="text-xs text-green-600 mt-1">
                {form.personName} owes you ₹{form.amount || "..."}
              </p>
            )}
          </div>

          {/* Group Name — optional */}
          <div>
            <label className="text-sm font-medium mb-1 block">
              Group / Reason
              <span className="text-muted-foreground font-normal ml-1">
                (optional)
              </span>
            </label>
            <Input
              placeholder="e.g. Goa Trip, Flat Expenses, Dinner"
              value={form.groupName}
              onChange={(e) => setForm({ ...form, groupName: e.target.value })}
              className="bg-background/40 border-border/40 focus:ring-2 focus:ring-primary/30 border-white/35"
            />
          </div>

          <Button
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:opacity-90 transition shadow-lg shadow-blue-500/20"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Entry"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddDebtModal;
