"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useRouter, useSearchParams } from "next/navigation";

interface PaginationControllProps {
  meta: {
    total: number;     // total data count
    page: number;      // current page
    limit: number;     // items per page
    totalPage: number; // total pages
  };
}

const PaginationControlls = ({ meta }: PaginationControllProps) => {
  const { total, page: currentPage, limit, totalPage } = meta;

  const router = useRouter();
  const searchParams = useSearchParams();

  const navigateToPage = (page: number) => {
    if (page < 1 || page > totalPage) return;

    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`?${params.toString()}`);
  };

  // pagination window (show max 5 pages)
  const getPageNumbers = () => {
    const pages: number[] = [];
    const start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPage, currentPage + 2);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  // showing data range
  const startItem = (currentPage - 1) * limit + 1;
  const endItem = Math.min(currentPage * limit, total);

  return (
    <div className="mt-4 space-y-2">
      {/* Showing info */}
      <p className="text-sm text-muted-foreground text-center">
        Showing <span className="font-medium">{startItem}</span> –{" "}
        <span className="font-medium">{endItem}</span> of{" "}
        <span className="font-medium">{total}</span> results
      </p>

      <Pagination>
        <PaginationContent>
          {/* Previous */}
          <PaginationItem>
            <PaginationPrevious
              onClick={() => navigateToPage(currentPage - 1)}
              className={
                currentPage === 1
                  ? "pointer-events-none opacity-50"
                  : "cursor-pointer"
              }
            />
          </PaginationItem>

          {/* First page */}
          {currentPage > 3 && (
            <>
              <PaginationItem>
                <PaginationLink
                  onClick={() => navigateToPage(1)}
                  className="cursor-pointer"
                >
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            </>
          )}

          {/* Page numbers */}
          {getPageNumbers().map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                isActive={page === currentPage}
                onClick={() => navigateToPage(page)}
                className="cursor-pointer"
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}

          {/* Last page */}
          {currentPage < totalPage - 2 && (
            <>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink
                  onClick={() => navigateToPage(totalPage)}
                  className="cursor-pointer"
                >
                  {totalPage}
                </PaginationLink>
              </PaginationItem>
            </>
          )}

          {/* Next */}
          <PaginationItem>
            <PaginationNext
              onClick={() => navigateToPage(currentPage + 1)}
              className={
                currentPage === totalPage
                  ? "pointer-events-none opacity-50"
                  : "cursor-pointer"
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default PaginationControlls;
