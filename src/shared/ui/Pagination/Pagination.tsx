import React from 'react';

import { usePagination } from '../../hooks/usePagination';

interface PaginationProps {
  page: number;
  total: number;
  onChange: (page: number) => void;
  siblingCount?: number;
  className?: string;
}

const Pagination: React.FC<PaginationProps> = ({
  page,
  total,
  onChange,
  siblingCount = 1,
  className = '',
}) => {
  const { pageNumbers, canGoPrevious, canGoNext } = usePagination({
    currentPage: page,
    totalPages: total,
    siblingCount,
  });

  if (total <= 1 || !pageNumbers.length) return null;

  const DOTS = '...';

  return (
    <nav className={`flex items-center justify-center gap-1 select-none ${className}`}>
      <button
        className="px-2 py-1 rounded disabled:opacity-50"
        onClick={() => onChange(1)}
        disabled={!canGoPrevious}
        aria-label="첫 페이지"
      >
        {'<<'}
      </button>
      <button
        className="px-2 py-1 rounded disabled:opacity-50"
        onClick={() => onChange(page - 1)}
        disabled={!canGoPrevious}
        aria-label="이전 페이지"
      >
        {'<'}
      </button>
      {pageNumbers?.map((pageNumber, idx) =>
        pageNumber === DOTS ? (
          <span key={`dots-${idx}`} className="px-2 py-1 text-gray-400">
            {DOTS}
          </span>
        ) : (
          <button
            key={`page-${pageNumber}`}
            className={`px-2 py-1 rounded ${
              pageNumber === page ? 'bg-gray-200 text-gray-600 font-bold' : 'hover:bg-gray-100'
            }`}
            onClick={() => onChange(Number(pageNumber))}
            aria-current={pageNumber === page ? 'page' : undefined}
          >
            {pageNumber}
          </button>
        ),
      )}
      <button
        className="px-2 py-1 rounded disabled:opacity-50"
        onClick={() => onChange(page + 1)}
        disabled={!canGoNext}
        aria-label="다음 페이지"
      >
        {'>'}
      </button>
      <button
        className="px-2 py-1 rounded disabled:opacity-50"
        onClick={() => onChange(total)}
        disabled={!canGoNext}
        aria-label="마지막 페이지"
      >
        {'>>'}
      </button>
    </nav>
  );
};

export default Pagination;
