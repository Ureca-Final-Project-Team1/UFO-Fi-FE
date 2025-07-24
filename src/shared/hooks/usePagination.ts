import { useMemo } from 'react';

interface UsePaginationProps {
  currentPage: number;
  totalPages: number;
  siblingCount?: number;
}

interface UsePaginationReturn {
  pageNumbers: (number | string)[];
  canGoPrevious: boolean;
  canGoNext: boolean;
}

export const usePagination = ({
  currentPage,
  totalPages,
  siblingCount = 1,
}: UsePaginationProps): UsePaginationReturn => {
  const pageNumbers = useMemo(() => {
    if (totalPages <= 1) return [];

    // 페이지 번호 배열 생성 로직
    const range = (start: number, end: number) => {
      return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    };

    const DOTS = '...';

    const getPageNumbers = () => {
      const totalPageNumbers = siblingCount * 2 + 5;
      if (totalPageNumbers >= totalPages) {
        return range(1, totalPages);
      }

      const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
      const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

      const showLeftDots = leftSiblingIndex > 2;
      const showRightDots = rightSiblingIndex < totalPages - 1;

      const firstPageIndex = 1;
      const lastPageIndex = totalPages;

      if (!showLeftDots && showRightDots) {
        const leftItemCount = 3 + 2 * siblingCount;
        const leftRange = range(1, leftItemCount);

        return [...leftRange, DOTS, totalPages];
      }

      if (showLeftDots && !showRightDots) {
        const rightItemCount = 3 + 2 * siblingCount;
        const rightRange = range(totalPages - rightItemCount + 1, totalPages);
        return [firstPageIndex, DOTS, ...rightRange];
      }

      if (showLeftDots && showRightDots) {
        const middleRange = range(leftSiblingIndex, rightSiblingIndex);
        return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
      }

      return [];
    };

    return getPageNumbers();
  }, [currentPage, totalPages, siblingCount]);

  const canGoPrevious = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  return {
    pageNumbers,
    canGoPrevious,
    canGoNext,
  };
};
