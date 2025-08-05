import { VariantProps } from 'class-variance-authority';

import {
  paginationVariants,
  paginationButtonVariants,
  pageNumberVariants,
  paginationDotsVariants,
  paginationContainerVariants,
} from './PaginationVariants';

export interface PaginationProps extends VariantProps<typeof paginationVariants> {
  page: number;
  total: number;
  onChange: (page: number) => void;
  siblingCount?: number;
  className?: string;
}

export interface PaginationButtonProps extends VariantProps<typeof paginationButtonVariants> {
  onClick: () => void;
  disabled?: boolean;
  'aria-label': string;
  children: React.ReactNode;
}

export interface PageNumberProps extends VariantProps<typeof pageNumberVariants> {
  pageNumber: number;
  isActive: boolean;
  onClick: () => void;
}

export interface PaginationDotsProps extends VariantProps<typeof paginationDotsVariants> {
  key: string;
}

export interface PaginationContainerProps extends VariantProps<typeof paginationContainerVariants> {
  children: React.ReactNode;
}
