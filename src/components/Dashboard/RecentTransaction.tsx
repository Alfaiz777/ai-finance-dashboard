import { useState, useMemo } from "react";
import TableWithPagination from "@/components/TableWithPagination";
import type { ColumnDef } from "@tanstack/react-table";
import type { Expense } from "@/types";
import { formatDate } from "@/utils/helper";
const PAGE_SIZE = 5;
const columns: ColumnDef<Expense>[] = [
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => (
      <span className="text-sm text-gray-400">
        {formatDate(row.original.date)}
      </span>
    ),
  },
  {
    accessorKey: "merchant",
    header: "Merchant",
    cell: ({ row }) => (
      <span className="text-sm text-white font-medium">
        {row.original.merchant}
      </span>
    ),
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => (
      <span className="text-xs px-2 py-1 rounded-md bg-white/10 text-gray-300">
        {row.original.category}
      </span>
    ),
  },
  {
    accessorKey: "amount",
    header: () => (
      <div className="text-right pr-4">Amount</div> // ✅ add SAME padding
    ),
    cell: ({ row }) => (
      <div className="flex justify-end pr-4 font-semibold text-white tabular-nums tracking-tight">
        ₹ {row.original.amount.toLocaleString()}
      </div>
    ),
    size: 120,
    minSize: 100,
    maxSize: 140,
  },
];

interface RecentTransactionsProps {
  expenses: Expense[];
}

const RecentTransactions = ({ expenses }: RecentTransactionsProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalItems = expenses.length;

  const sortedExpenses = useMemo(
    () => [...expenses].sort((a, b) => b.date.localeCompare(a.date)),
    [expenses],
  );

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return sortedExpenses.slice(start, start + PAGE_SIZE);
  }, [currentPage, sortedExpenses]);

  return (
    <TableWithPagination
      columns={columns}
      data={paginatedData}
      currentPage={currentPage}
      pageSize={PAGE_SIZE}
      totalItems={totalItems}
      onPageChange={setCurrentPage}
      containerClassName="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-lg shadow-black/30"
    />
  );
};

export default RecentTransactions;
