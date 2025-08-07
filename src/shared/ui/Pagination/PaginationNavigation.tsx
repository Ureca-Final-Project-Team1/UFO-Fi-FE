import React from 'react';

import { cn } from '@/lib/utils';

import type { PaginationNavigationProps, NavigationIconProps } from './Pagination.types';
import {
  paginationNavigationVariants,
  paginationNavigationActiveVariants,
} from './PaginationVariants';

// 네비게이션 아이콘 컴포넌트
function NavigationIcon({ type, size = 'md', className }: NavigationIconProps) {
  const iconSize = size === 'sm' ? 'size-3' : size === 'lg' ? 'size-5' : 'size-4';

  const icons = {
    first: (
      <svg
        className={cn(iconSize, className)}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
        />
      </svg>
    ),
    prev: (
      <svg
        className={cn(iconSize, className)}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
    ),
    next: (
      <svg
        className={cn(iconSize, className)}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    ),
    last: (
      <svg
        className={cn(iconSize, className)}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 5l7 7-7 7M5 5l7 7-7 7"
        />
      </svg>
    ),
  };

  return icons[type];
}

export function PaginationNavigation({
  onClick,
  disabled,
  'aria-label': ariaLabel,
  children,
  className,
  variant = 'default',
  size = 'md',
  iconSize = 'md',
  disabledVariant = 'muted',
  hoverVariant = 'elevated',
}: PaginationNavigationProps) {
  return (
    <button
      className={cn(
        paginationNavigationVariants({
          variant,
          size,
          iconSize,
          disabledVariant: disabled ? disabledVariant : undefined,
        }),
        !disabled &&
          paginationNavigationActiveVariants({
            hoverVariant,
          }),
        className,
      )}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}

// 네비게이션 버튼들을 쉽게 사용할 수 있는 헬퍼 컴포넌트들
export function FirstPageButton(props: Omit<PaginationNavigationProps, 'children' | 'aria-label'>) {
  return (
    <PaginationNavigation {...props} aria-label="첫 페이지">
      <NavigationIcon type="first" size={props.size || 'md'} />
    </PaginationNavigation>
  );
}

export function PrevPageButton(props: Omit<PaginationNavigationProps, 'children' | 'aria-label'>) {
  return (
    <PaginationNavigation {...props} aria-label="이전 페이지">
      <NavigationIcon type="prev" size={props.size || 'md'} />
    </PaginationNavigation>
  );
}

export function NextPageButton(props: Omit<PaginationNavigationProps, 'children' | 'aria-label'>) {
  return (
    <PaginationNavigation {...props} aria-label="다음 페이지">
      <NavigationIcon type="next" size={props.size || 'md'} />
    </PaginationNavigation>
  );
}

export function LastPageButton(props: Omit<PaginationNavigationProps, 'children' | 'aria-label'>) {
  return (
    <PaginationNavigation {...props} aria-label="마지막 페이지">
      <NavigationIcon type="last" size={props.size || 'md'} />
    </PaginationNavigation>
  );
}
