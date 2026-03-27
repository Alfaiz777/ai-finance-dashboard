import type { ColumnDef } from "@tanstack/react-table";
import type { Expense } from "@/types";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/utils/helper";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

export const transactionColumns: ColumnDef<Expense>[] = [
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => (
      <span className="text-sm text-gray-400">
        {formatDate(row.original.date)}
      </span>
    ),
    size: 120,
  },
  {
    accessorKey: "merchant",
    header: "Merchant",
    cell: ({ row }) => (
      <span className="font-medium text-white">{row.original.merchant}</span>
    ),
    size: 200,
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => (
      <div className="flex justify-start">
        <Badge variant="secondary">{row.original.category}</Badge>
      </div>
    ),
    size: 140,
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right pr-4 w-full">Amount</div>,
    cell: ({ row }) => (
      <div className="flex justify-end w-full pr-4 font-semibold tabular-nums">
        ₹ {row.original.amount.toLocaleString()}
      </div>
    ),
    size: 140,
    minSize: 120,
    maxSize: 160,
  },
  {
    accessorKey: "source",
    header: () => <div className="text-center w-full">Source</div>,
    cell: ({ row }) => (
      <div className="flex justify-center w-full">
        <Badge
          variant={row.original.source === "gmail" ? "default" : "outline"}
        >
          {row.original.source}
        </Badge>
      </div>
    ),
    size: 120,
    minSize: 100,
    maxSize: 140,
  },
  {
    id: "actions",
    header: () => <div className="w-full text-right pr-4"></div>,
    cell: ({ row }) => (
      <div className="flex justify-end w-full pr-4">
        <Button
          variant="ghost"
          size="icon"
          className="text-red-500 hover:text-red-700 hover:bg-red-500/10"
          onClick={() => row.original.onDelete?.(row.original.id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    ),
    size: 80,
    minSize: 60,
  },
];
