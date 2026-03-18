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
    cell: ({ row }) => (
      <Badge variant="secondary">{row.original.category}</Badge>
    ),
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
  {
    accessorKey: "source",
    header: "Source",
    cell: ({ row }) => (
      <Badge variant={row.original.source === "gmail" ? "default" : "outline"}>
        {row.original.source}
      </Badge>
    ),
  },
  {
    id: "actions",
    header: "",
    cell: ({ row }) => (
      <Button
        variant="ghost"
        size="icon"
        className="text-red-500 hover:text-red-700 hover:bg-red-50"
        onClick={() => row.original.onDelete?.(row.original.id)}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    ),
  },
];
