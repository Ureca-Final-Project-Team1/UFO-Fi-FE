import React from 'react';

import { cn } from '@/lib/utils';

import type { PaginationButtonProps } from './Pagination.types';
import { paginationButtonVariants, paginationButtonInactiveVariants } from './PaginationVariants';

export function PaginationButton({
  pageNumber,
  isActive,
  onClick,
  className,
  variant = 'default',
  size = 'md',
  activeVariant = 'primary',
  hoverVariant = 'elevated',
  inactiveVariant = 'default',
}: PaginationButtonProps) {
  return (
    <button
      className={cn(
        paginationButtonVariants({
          variant,
          size,
          activeVariant: isActive ? activeVariant : undefined,
          hoverVariant: !isActive ? hoverVariant : undefined,
        }),
        !isActive &&
          paginationButtonInactiveVariants({
            inactiveVariant,
          }),
        className,
      )}
      onClick={onClick}
      aria-current={isActive ? 'page' : undefined}
      aria-label={`페이지 ${pageNumber}로 이동`}
    >
      {pageNumber}
    </button>
  );
}
