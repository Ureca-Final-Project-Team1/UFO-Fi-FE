import React from 'react';

import { cn } from '@/lib/utils';

import type { PaginationProps } from './Pagination.types';
import { PaginationButton } from './PaginationButton';
import { PaginationDots } from './PaginationDots';
import {
  FirstPageButton,
  LastPageButton,
  NextPageButton,
  PrevPageButton,
} from './PaginationNavigation';
import { PaginationNumbers } from './PaginationNumbers';
import { paginationVariants } from './PaginationVariants';
import { usePagination } from '../../hooks/usePagination';

const Pagination: React.FC<PaginationProps> = ({
  page,
  total,
  onChange,
  siblingCount = 1,
  className = '',
  variant = 'default',
  size = 'md',
  alignment = 'center',
  layout = 'horizontal',
  showFirstLast = true,
  showPrevNext = true,
  showPageNumbers = true,
  // 네비게이션 버튼 variants
  navigationVariant,
  navigationSize,
  navigationIconSize,
  navigationDisabledVariant,
  navigationHoverVariant,
  // 페이지 번호 버튼 variants
  buttonVariant,
  buttonSize,
  buttonActiveVariant,
  buttonHoverVariant,
  buttonInactiveVariant,
  // 생략 부호 variants
  dotsVariant,
  dotsSize,
  dotsColor,
  // 컨테이너 variants
  numbersGap,
  numbersLayout,
}) => {
  const { pageNumbers, canGoPrevious, canGoNext } = usePagination({
    currentPage: page,
    totalPages: total,
    siblingCount,
  });

  if (!pageNumbers.length) return null;

  const DOTS = '...';

  return (
    <nav
      className={cn(
        paginationVariants({
          variant,
          size,
          alignment,
          layout,
        }),
        className,
      )}
    >
      {/* 첫 페이지 버튼 */}
      {showFirstLast && (
        <FirstPageButton
          onClick={() => onChange(1)}
          disabled={!canGoPrevious}
          variant={navigationVariant}
          size={navigationSize || size}
          iconSize={navigationIconSize}
          disabledVariant={navigationDisabledVariant}
          hoverVariant={navigationHoverVariant}
        />
      )}

      {/* 이전 페이지 버튼 */}
      {showPrevNext && (
        <PrevPageButton
          onClick={() => onChange(page - 1)}
          disabled={!canGoPrevious}
          variant={navigationVariant}
          size={navigationSize || size}
          iconSize={navigationIconSize}
          disabledVariant={navigationDisabledVariant}
          hoverVariant={navigationHoverVariant}
        />
      )}

      {/* 페이지 번호들 */}
      {showPageNumbers && (
        <PaginationNumbers gap={numbersGap} layout={numbersLayout}>
          {pageNumbers?.map((pageNumber, idx) =>
            pageNumber === DOTS ? (
              <PaginationDots
                key={`dots-${idx}`}
                variant={dotsVariant}
                size={dotsSize || size}
                color={dotsColor}
              />
            ) : (
              <PaginationButton
                key={`page-${pageNumber}`}
                pageNumber={Number(pageNumber)}
                isActive={pageNumber === page}
                onClick={() => onChange(Number(pageNumber))}
                variant={buttonVariant}
                size={buttonSize || size}
                activeVariant={buttonActiveVariant}
                hoverVariant={buttonHoverVariant}
                inactiveVariant={buttonInactiveVariant}
              />
            ),
          )}
        </PaginationNumbers>
      )}

      {/* 다음 페이지 버튼 */}
      {showPrevNext && (
        <NextPageButton
          onClick={() => onChange(page + 1)}
          disabled={!canGoNext}
          variant={navigationVariant}
          size={navigationSize || size}
          iconSize={navigationIconSize}
          disabledVariant={navigationDisabledVariant}
          hoverVariant={navigationHoverVariant}
        />
      )}

      {/* 마지막 페이지 버튼 */}
      {showFirstLast && (
        <LastPageButton
          onClick={() => onChange(total)}
          disabled={!canGoNext}
          variant={navigationVariant}
          size={navigationSize || size}
          iconSize={navigationIconSize}
          disabledVariant={navigationDisabledVariant}
          hoverVariant={navigationHoverVariant}
        />
      )}
    </nav>
  );
};

export default Pagination;
