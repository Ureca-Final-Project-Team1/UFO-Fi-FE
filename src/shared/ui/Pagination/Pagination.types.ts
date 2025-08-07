import type { VariantProps } from 'class-variance-authority';

import {
  paginationVariants,
  paginationNavigationVariants,
  paginationNavigationActiveVariants,
  paginationButtonVariants,
  paginationButtonInactiveVariants,
  paginationDotsVariants,
  paginationNumbersVariants,
  paginationNavigationContainerVariants,
} from './PaginationVariants';

// 메인 Pagination Props
export interface PaginationProps extends VariantProps<typeof paginationVariants> {
  page: number;
  total: number;
  onChange: (page: number) => void;
  siblingCount?: number;
  className?: string;
  showFirstLast?: boolean;
  showPrevNext?: boolean;
  showDots?: boolean;
  showPageNumbers?: boolean;
  maxVisiblePages?: number;
  mobileVariant?: 'compact' | 'minimal' | 'dots-only';
  tabletVariant?: 'default' | 'compact' | 'minimal';
  desktopVariant?: 'full' | 'default' | 'compact';
  // 네비게이션 버튼 variants
  navigationVariant?: VariantProps<typeof paginationNavigationVariants>['variant'];
  navigationSize?: VariantProps<typeof paginationNavigationVariants>['size'];
  navigationIconSize?: VariantProps<typeof paginationNavigationVariants>['iconSize'];
  navigationDisabledVariant?: VariantProps<typeof paginationNavigationVariants>['disabledVariant'];
  navigationHoverVariant?: VariantProps<typeof paginationNavigationActiveVariants>['hoverVariant'];
  // 페이지 번호 버튼 variants
  buttonVariant?: VariantProps<typeof paginationButtonVariants>['variant'];
  buttonSize?: VariantProps<typeof paginationButtonVariants>['size'];
  buttonActiveVariant?: VariantProps<typeof paginationButtonVariants>['activeVariant'];
  buttonHoverVariant?: VariantProps<typeof paginationButtonVariants>['hoverVariant'];
  buttonInactiveVariant?: VariantProps<typeof paginationButtonInactiveVariants>['inactiveVariant'];
  // 생략 부호 variants
  dotsVariant?: VariantProps<typeof paginationDotsVariants>['variant'];
  dotsSize?: VariantProps<typeof paginationDotsVariants>['size'];
  dotsColor?: VariantProps<typeof paginationDotsVariants>['color'];
  // 컨테이너 variants
  numbersGap?: VariantProps<typeof paginationNumbersVariants>['gap'];
  numbersLayout?: VariantProps<typeof paginationNumbersVariants>['layout'];
}

// 네비게이션 버튼 Props
export interface PaginationNavigationProps
  extends VariantProps<typeof paginationNavigationVariants>,
    VariantProps<typeof paginationNavigationActiveVariants> {
  onClick: () => void;
  disabled: boolean;
  'aria-label': string;
  children: React.ReactNode;
  className?: string;
}

// 페이지 번호 버튼 Props
export interface PaginationButtonProps
  extends VariantProps<typeof paginationButtonVariants>,
    VariantProps<typeof paginationButtonInactiveVariants> {
  pageNumber: number;
  isActive: boolean;
  onClick: () => void;
  className?: string;
}

// 생략 부호 Props
export interface PaginationDotsProps extends VariantProps<typeof paginationDotsVariants> {
  className?: string;
}

// 페이지 번호 컨테이너 Props
export interface PaginationNumbersProps extends VariantProps<typeof paginationNumbersVariants> {
  children: React.ReactNode;
  className?: string;
}

// 네비게이션 컨테이너 Props
export interface PaginationNavigationContainerProps
  extends VariantProps<typeof paginationNavigationContainerVariants> {
  children: React.ReactNode;
  className?: string;
}

// 네비게이션 버튼 타입
export type NavigationButtonType = 'first' | 'prev' | 'next' | 'last';

// 네비게이션 버튼 아이콘 Props
export interface NavigationIconProps {
  type: NavigationButtonType;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}
