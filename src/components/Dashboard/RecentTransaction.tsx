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
      <span className="text-sm text-muted-foreground">
        {formatDate(row.original.date)}
      </span>
    ),
  },
  {
    accessorKey: "merchant",
    header: "Merchant",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => (
      <div className="text-right font-semibold">
        ₹ {row.original.amount.toLocaleString()}
      </div>
    ),
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
      containerClassName="rounded-xl border bg-card shadow-sm"
    />
  );
};

export default RecentTransactions;
