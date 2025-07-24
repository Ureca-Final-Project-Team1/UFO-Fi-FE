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

  if (!pageNumbers.length) return null;

  const DOTS = '...';

  return (
    <nav className={`flex items-center justify-center gap-2 select-none ${className}`}>
      {/* 첫 페이지 버튼 */}
      <button
        className={`
          flex items-center justify-center w-10 h-10 rounded-lg border border-gray-200 
          transition-all duration-200 ease-in-out
          ${
            !canGoPrevious
              ? 'opacity-30 cursor-not-allowed bg-gray-50 text-gray-400'
              : 'hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 active:scale-95'
          }
        `}
        onClick={() => onChange(1)}
        disabled={!canGoPrevious}
        aria-label="첫 페이지"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
          />
        </svg>
      </button>

      {/* 이전 페이지 버튼 */}
      <button
        className={`
          flex items-center justify-center w-10 h-10 rounded-lg border border-gray-200 
          transition-all duration-200 ease-in-out
          ${
            !canGoPrevious
              ? 'opacity-30 cursor-not-allowed bg-gray-50 text-gray-400'
              : 'hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 active:scale-95'
          }
        `}
        onClick={() => onChange(page - 1)}
        disabled={!canGoPrevious}
        aria-label="이전 페이지"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* 페이지 번호들 */}
      <div className="flex items-center gap-1">
        {pageNumbers?.map((pageNumber, idx) =>
          pageNumber === DOTS ? (
            <span
              key={`dots-${idx}`}
              className="flex items-center justify-center w-10 h-10 text-gray-400 font-medium"
            >
              {DOTS}
            </span>
          ) : (
            <button
              key={`page-${pageNumber}`}
              className={`
                flex items-center justify-center w-10 h-10 rounded-lg border font-medium
                transition-all duration-200 ease-in-out
                ${
                  pageNumber === page
                    ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-200'
                    : 'border-gray-200 text-gray-700 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 active:scale-95'
                }
              `}
              onClick={() => onChange(Number(pageNumber))}
              aria-current={pageNumber === page ? 'page' : undefined}
            >
              {pageNumber}
            </button>
          ),
        )}
      </div>

      {/* 다음 페이지 버튼 */}
      <button
        className={`
          flex items-center justify-center w-10 h-10 rounded-lg border border-gray-200 
          transition-all duration-200 ease-in-out
          ${
            !canGoNext
              ? 'opacity-30 cursor-not-allowed bg-gray-50 text-gray-400'
              : 'hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 active:scale-95'
          }
        `}
        onClick={() => onChange(page + 1)}
        disabled={!canGoNext}
        aria-label="다음 페이지"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* 마지막 페이지 버튼 */}
      <button
        className={`
          flex items-center justify-center w-10 h-10 rounded-lg border border-gray-200 
          transition-all duration-200 ease-in-out
          ${
            !canGoNext
              ? 'opacity-30 cursor-not-allowed bg-gray-50 text-gray-400'
              : 'hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 active:scale-95'
          }
        `}
        onClick={() => onChange(total)}
        disabled={!canGoNext}
        aria-label="마지막 페이지"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 5l7 7-7 7M5 5l7 7-7 7"
          />
        </svg>
      </button>
    </nav>
  );
};

export default Pagination;
