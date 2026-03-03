import TableWithPagination from "@/components/TableWithPagination";
import type { Expense } from "@/types";
import { transactionColumns } from "./columns";

interface TransactionTableProps {
  data: Expense[];
  currentPage: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (page: number) => void;
}

const TransactionTable = ({
  data,
  currentPage,
  pageSize,
  totalItems,
  onPageChange,
}: TransactionTableProps) => {
  return (
    <TableWithPagination
      columns={transactionColumns}
      data={data}
      currentPage={currentPage}
      pageSize={pageSize}
      totalItems={totalItems}
      onPageChange={onPageChange}
      containerClassName="rounded-xl border bg-card shadow-sm"
    />
  );
};

export default TransactionTable;
