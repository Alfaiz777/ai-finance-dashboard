import { useMemo } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { DataTable } from "@/components/ui/data-table";
import type { Row, TableOptions } from "@tanstack/react-table";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface TableWithPaginationProps<TData, _TValue> {
  columns: any;
  data: TData[];
  currentPage: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  loading?: boolean;
  options?: Partial<TableOptions<TData>>;
  customRecordsDescription?: string;
  rowClassName?: (row: Row<TData>) => string;
  noDataTitle?: string;
  noDataDescription?: string;
  containerClassName?: string;
}

export default function TableWithPagination<TData, TValue>({
  columns,
  data,
  currentPage,
  pageSize,
  totalItems,
  onPageChange,
  loading = false,
  options = {},
  customRecordsDescription,
  rowClassName,
  noDataTitle,
  noDataDescription,
  containerClassName,
}: TableWithPaginationProps<TData, TValue>) {
  const totalPages = useMemo(
    () => Math.ceil(totalItems / pageSize),
    [totalItems, pageSize],
  );
  const isFirstPage = useMemo(
    () => Number(currentPage) === 1 || Number(currentPage) === 0,
    [currentPage],
  );
  const isLastPage = useMemo(
    () => Number(currentPage) === Number(totalPages),
    [currentPage, totalPages],
  );
  const disabledClassName = "pointer-events-none opacity-50";

  const startItem = useMemo(() => {
    if (totalItems === 0) return 0;
    return (currentPage - 1) * pageSize + 1;
  }, [currentPage, pageSize, totalItems]);

  const endItem = useMemo(() => {
    if (totalItems === 0) return 0;
    return Math.min(currentPage * pageSize, totalItems);
  }, [currentPage, pageSize, totalItems]);

  return (
    <div className="space-y-4">
      <DataTable
        loading={loading}
        containerClassName={`h-96 ${containerClassName}`}
        columns={columns}
        data={data}
        options={options}
        rowClassName={rowClassName}
        noDataTitle={noDataTitle}
        noDataDescription={noDataDescription}
      />

      <Pagination className="mx-0 justify-end">
        <PaginationContent>
          <PaginationItem className="text-sm">
            Page {currentPage} of {totalPages} • Showing {startItem}-{endItem}{" "}
            of {totalItems} items
            {customRecordsDescription && (
              <span className="text-muted-foreground ml-1">
                ({customRecordsDescription})
              </span>
            )}
          </PaginationItem>

          <PaginationItem>
            <PaginationPrevious
              onClick={() =>
                !isFirstPage && onPageChange(Number(currentPage) - 1)
              }
              aria-disabled={isFirstPage}
              className={isFirstPage ? disabledClassName : undefined}
            />
          </PaginationItem>

          <PaginationItem>
            <PaginationNext
              onClick={() =>
                !isLastPage && onPageChange(Number(currentPage) + 1)
              }
              aria-disabled={isLastPage}
              className={isLastPage ? disabledClassName : undefined}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
