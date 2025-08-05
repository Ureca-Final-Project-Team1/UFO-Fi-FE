import React from 'react';

import { cn } from '@/lib/utils';

import { PaginationProps } from './Pagination.types';
import {
  paginationVariants,
  paginationButtonVariants,
  pageNumberVariants,
  paginationDotsVariants,
  paginationContainerVariants,
} from './PaginationVariants';
import { usePagination } from '../../hooks/usePagination';

const Pagination: React.FC<PaginationProps> = ({
  page,
  total,
  onChange,
  siblingCount = 1,
  className = '',
  variant = 'default',
  size = 'default',
}) => {
  const { pageNumbers, canGoPrevious, canGoNext } = usePagination({
    currentPage: page,
    totalPages: total,
    siblingCount,
  });

  if (!pageNumbers.length) return null;

  const DOTS = '...';

  return (
    <nav className={cn(paginationVariants({ variant, size }), className)}>
      {/* 첫 페이지 버튼 */}
      <button
        className={cn(
          paginationButtonVariants({
            variant,
            size,
            state: canGoPrevious ? 'enabled' : 'disabled',
          }),
        )}
        onClick={() => onChange(1)}
        disabled={!canGoPrevious}
        aria-label="첫 페이지"
      >
        <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
        className={cn(
          paginationButtonVariants({
            variant,
            size,
            state: canGoPrevious ? 'enabled' : 'disabled',
          }),
        )}
        onClick={() => onChange(page - 1)}
        disabled={!canGoPrevious}
        aria-label="이전 페이지"
      >
        <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* 페이지 번호들 */}
      <div className={cn(paginationContainerVariants({ variant, size }))}>
        {pageNumbers?.map((pageNumber, idx) =>
          pageNumber === DOTS ? (
            <span key={`dots-${idx}`} className={cn(paginationDotsVariants({ variant, size }))}>
              {DOTS}
            </span>
          ) : (
            <button
              key={`page-${pageNumber}`}
              className={cn(
                pageNumberVariants({
                  variant,
                  size,
                  state: pageNumber === page ? 'active' : 'inactive',
                }),
              )}
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
        className={cn(
          paginationButtonVariants({
            variant,
            size,
            state: canGoNext ? 'enabled' : 'disabled',
          }),
        )}
        onClick={() => onChange(page + 1)}
        disabled={!canGoNext}
        aria-label="다음 페이지"
      >
        <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* 마지막 페이지 버튼 */}
      <button
        className={cn(
          paginationButtonVariants({
            variant,
            size,
            state: canGoNext ? 'enabled' : 'disabled',
          }),
        )}
        onClick={() => onChange(total)}
        disabled={!canGoNext}
        aria-label="마지막 페이지"
      >
        <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
