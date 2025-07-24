import React from 'react';

import { usePagination } from '../../hooks/usePagination';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number; // 현재 페이지 양 옆에 몇 개의 페이지를 보여줄지
  className?: string;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
  className = '',
}) => {
  const { pageNumbers, canGoPrevious, canGoNext } = usePagination({
    currentPage,
    totalPages,
    siblingCount,
  });

  if (totalPages <= 1 || !pageNumbers.length) return null;

  const DOTS = '...';

  return (
    <nav className={`flex items-center justify-center gap-1 select-none ${className}`}>
      <button
        className="px-2 py-1 rounded disabled:opacity-50"
        onClick={() => onPageChange(1)}
        disabled={!canGoPrevious}
        aria-label="첫 페이지"
      >
        {'<<'}
      </button>
      <button
        className="px-2 py-1 rounded disabled:opacity-50"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!canGoPrevious}
        aria-label="이전 페이지"
      >
        {'<'}
      </button>
      {pageNumbers?.map((page, idx) =>
        page === DOTS ? (
          <span key={`dots-${idx}`} className="px-2 py-1 text-gray-400">
            {DOTS}
          </span>
        ) : (
          <button
            key={`page-${page}`}
            className={`px-2 py-1 rounded ${
              page === currentPage ? 'bg-gray-200 text-gray-600 font-bold' : 'hover:bg-gray-100'
            }`}
            onClick={() => onPageChange(Number(page))}
            aria-current={page === currentPage ? 'page' : undefined}
          >
            {page}
          </button>
        ),
      )}
      <button
        className="px-2 py-1 rounded disabled:opacity-50"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!canGoNext}
        aria-label="다음 페이지"
      >
        {'>'}
      </button>
      <button
        className="px-2 py-1 rounded disabled:opacity-50"
        onClick={() => onPageChange(totalPages)}
        disabled={!canGoNext}
        aria-label="마지막 페이지"
      >
        {'>>'}
      </button>
    </nav>
  );
};

export default Pagination;
