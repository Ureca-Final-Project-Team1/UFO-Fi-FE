import React from 'react';

import { cn } from '@/lib/utils';

import type { PaginationNumbersProps } from './Pagination.types';
import { paginationNumbersVariants } from './PaginationVariants';

export function PaginationNumbers({
  children,
  className,
  gap = 'md',
  layout = 'horizontal',
}: PaginationNumbersProps) {
  return (
    <div
      className={cn(
        paginationNumbersVariants({
          gap,
          layout,
        }),
        className,
      )}
    >
      {children}
    </div>
  );
}
