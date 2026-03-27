import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  type Row,
  type TableOptions,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import NoDataBox from "@/components/NoDataBox";

import { cn } from "@/lib/utils";
import { ScrollArea } from "./scroll-area";
import { LoaderCircle } from "lucide-react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  noDataTitle?: string;
  noDataDescription?: string;
  containerClassName?: string;
  loaderContainerClassName?: string;
  loading?: boolean;
  options?: Partial<TableOptions<TData>>;
  rowClassName?: (row: Row<TData>) => string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  noDataTitle,
  noDataDescription,
  containerClassName = "",
  loaderContainerClassName = "h-96",
  loading = false,
  options = {},
  rowClassName,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    ...options,
  });

  return (
    <ScrollArea
      className={`rounded-md border overflow-hidden ${containerClassName}`}
    >
      {loading ? (
        <div
          className={`flex items-center justify-center ${loaderContainerClassName}`}
        >
          <LoaderCircle className="animate-spin w-8 h-8" />
        </div>
      ) : (
        <Table className="w-full table-fixed">
          {table.getRowModel().rows?.length ? (
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    const headerClass =
                      (header.column.columnDef.meta as any)?.headerClassName ||
                      "";
                    return (
                      <TableHead key={header.id} className={cn(headerClass)}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
          ) : null}
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className={cn(
                    row.depth > 0 ? "bg-[#F1F5F9] hover:bg-[#f1f5f9af]" : "",
                    // run user-supplied rowClassName
                    rowClassName?.(row),
                  )}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => {
                    const cellClass = (cell.column.columnDef.meta as any)
                      ?.cellClassName;

                    return (
                      <TableCell key={cell.id} className={cn(cellClass)}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            ) : (
              <NoDataBox title={noDataTitle} description={noDataDescription} />
            )}
          </TableBody>
        </Table>
      )}
    </ScrollArea>
  );
}
