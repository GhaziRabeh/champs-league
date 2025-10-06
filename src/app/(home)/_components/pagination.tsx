"use client";

import { Button } from "@/components/ui/button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-2 mt-8">
      <Button
        className="px-4 py-2 bg-[#0A1428] text-white rounded-lg hover:bg-[#ee4360] disabled:opacity-50 disabled:cursor-not-allowed transition-colors border border-gray-700"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Previous
      </Button>
      
      <div className="flex gap-1">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Button
            key={page}
            className={`px-3 py-2 rounded-lg transition-colors border cursor-pointer ${
              page === currentPage
                ? "bg-[#ee4360] text-white border-[#ee4360]"
                : "bg-[#0A1428] text-white border-gray-700 hover:bg-white/10"
            }`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </Button>
        ))}
      </div>
      
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