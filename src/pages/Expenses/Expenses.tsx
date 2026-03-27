import { useState, useMemo, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SearchBox from "@/components/SearchBox";
import TransactionTable from "@/components/TransactionTable";
import { getExpenses, deleteExpense } from "@/services/expenseService";
import type { Expense } from "@/types";
import AddExpenseModal from "@/components/Expenses";

const PAGE_SIZE = 8;

const Expenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOption, setSortOption] = useState("date-desc");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const data = await getExpenses();
        setExpenses(data);
      } catch (error) {
        console.error("Failed to fetch expenses", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, []);

  const handleExpenseAdded = (newExpense: Expense) => {
    setExpenses((prev) => [newExpense, ...prev]);
  };

  const handleExpenseDeleted = async (id: string) => {
    try {
      await deleteExpense(id);
      setExpenses((prev) => prev.filter((e) => e.id !== id));
    } catch (error) {
      console.error("Failed to delete expense:", error);
    }
  };

  const expensesWithDelete = useMemo(() => {
    return expenses.map((e) => ({
      ...e,
      onDelete: handleExpenseDeleted, // ← attach the function
    }));
  }, [expenses]);

  const filteredData = useMemo(() => {
    let data: Expense[] = [...expensesWithDelete];

    // 1️⃣ Filter by category
    if (selectedCategory !== "All") {
      data = data.filter((expense) => expense.category === selectedCategory);
    }

    // 2️⃣ Search by merchant
    if (searchTerm.trim() !== "") {
      data = data.filter((expense) =>
        expense.merchant.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    // 3️⃣ Sorting
    data.sort((a, b) => {
      switch (sortOption) {
        case "date-asc":
          return a.date.localeCompare(b.date);
        case "date-desc":
          return b.date.localeCompare(a.date);
        case "amount-asc":
          return a.amount - b.amount;
        case "amount-desc":
          return b.amount - a.amount;
        default:
          return 0;
      }
    });

    return data;
  }, [expensesWithDelete, searchTerm, selectedCategory, sortOption]);

  const totalItems = filteredData.length;

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredData.slice(start, start + PAGE_SIZE);
  }, [filteredData, currentPage]);

  return (
    <>
      <div className="space-y-6">
        {expenses.length > 0 && (
          <div className="flex flex-wrap gap-4 mb-6 items-center justify-between p-4 rounded-xl border border-border/40 bg-background/50 backdrop-blur-xl shadow-sm">
            <div className="flex flex-wrap gap-3 items-center">
              <SearchBox
                placeholder="Search merchant..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-64 bg-background/40 border-border/40 focus:ring-2 focus:ring-primary/30"
              />

              {/* Category Filter */}
              <Select
                value={selectedCategory}
                onValueChange={(value) => {
                  setSelectedCategory(value);
                  setCurrentPage(1);
                }}
              >
                <SelectTrigger className="w-48  bg-background/40 border-border/40 backdrop-blur-md">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All</SelectItem>
                  <SelectItem value="Food">Food</SelectItem>
                  <SelectItem value="Transport">Transport</SelectItem>
                  <SelectItem value="Shopping">Shopping</SelectItem>
                  <SelectItem value="Entertainment">Entertainment</SelectItem>
                </SelectContent>
              </Select>

              {/* Sort Filter */}
              <Select
                value={sortOption}
                onValueChange={(value) => setSortOption(value)}
              >
                <SelectTrigger className="w-48 bg-background/40 border-border/40 backdrop-blur-md">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date-desc">Newest</SelectItem>
                  <SelectItem value="date-asc">Oldest</SelectItem>
                  <SelectItem value="amount-desc">Highest Amount</SelectItem>
                  <SelectItem value="amount-asc">Lowest Amount</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <AddExpenseModal onExpenseAdded={handleExpenseAdded} />
          </div>
        )}
        {loading ? (
          <div className="flex justify-center items-center h-60 text-muted-foreground">
            <div className="animate-pulse text-sm">Loading transactions...</div>
          </div>
        ) : expenses.length === 0 ? (
          // 🔥 EMPTY STATE UI
          <div className="flex flex-col items-center justify-center h-[400px] text-center rounded-xl border border-border/40 bg-background/40 backdrop-blur-xl space-y-5">
            <div className="text-4xl">💸</div>
            <h2 className="text-xl font-semibold tracking-tight">
              No Expenses Yet
            </h2>
            <p className="text-muted-foreground max-w-sm text-sm">
              Add your first expense to start tracking your spending
            </p>
            <div className="mt-2">
              <AddExpenseModal onExpenseAdded={handleExpenseAdded} />
            </div>
          </div>
        ) : (
          // ✅ NORMAL TABLE
          <div className="rounded-xl border border-border/40 bg-background/40 backdrop-blur-xl shadow-sm">
            <TransactionTable
              data={paginatedData}
              currentPage={currentPage}
              pageSize={PAGE_SIZE}
              totalItems={totalItems}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Expenses;
