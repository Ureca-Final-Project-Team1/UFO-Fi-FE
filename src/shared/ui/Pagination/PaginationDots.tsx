import React from 'react';

import { cn } from '@/lib/utils';

import type { PaginationDotsProps } from './Pagination.types';
import { paginationDotsVariants } from './PaginationVariants';

export function PaginationDots({
  className,
  variant = 'default',
  size = 'md',
  color = 'default',
}: PaginationDotsProps) {
  return (
    <span
      className={cn(
        paginationDotsVariants({
          variant,
          size,
          color,
        }),
        className,
      )}
      aria-hidden="true"
    >
      ...
    </span>
  );
}
