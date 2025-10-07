"use client";

import { Button } from "@/components/ui/button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      // Always show first page
      pages.push(1);

      // Ellipsis if currentPage > 4
      if (currentPage > 4) pages.push("...");

      // Show 2 pages before and after current page
      const start = Math.max(2, currentPage - 2);
      const end = Math.min(totalPages - 1, currentPage + 2);
      for (let i = start; i <= end; i++) pages.push(i);

      // Ellipsis if currentPage < totalPages - 3
      if (currentPage < totalPages - 3) pages.push("...");

      // Always show last page
      pages.push(totalPages);
    }

    return pages;
  };

  const pages = getPageNumbers();

  return (
    <div className="flex justify-center items-center gap-2 mt-8">
      <Button
        className="px-4 py-2 bg-[#0A1428] text-white rounded-lg hover:bg-[#ee4360] disabled:opacity-50 disabled:cursor-not-allowed transition-colors border border-gray-700"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Previous
      </Button>

      {pages.map((page, idx) =>
        page === "..." ? (
          <span key={idx} className="px-3 py-2 text-gray-400">
            ...
          </span>
        ) : (
          <Button
            key={idx}
            className={`px-3 py-2 rounded-lg transition-colors border cursor-pointer ${
              page === currentPage
                ? "bg-[#ee4360] text-white border-[#ee4360]"
                : "bg-[#0A1428] text-white border-gray-700 hover:bg-white/10"
            }`}
            onClick={() => onPageChange(Number(page))}
          >
            {page}
          </Button>
        )
      )}

      <Button
        className="px-4 py-2 bg-[#0A1428] text-white rounded-lg hover:bg-[#ee4360] disabled:opacity-50 disabled:cursor-not-allowed transition-colors border border-gray-700 cursor-pointer"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </Button>
    </div>
  );
}
