'use client';

import { useRouter } from 'next/navigation';
import React, { ComponentProps } from 'react';

import { cn } from '@/lib/utils';

import { Icon } from '../Icons';
import type { TitleIconVariant } from './Title.types';

type IconType = 'ChevronLeft' | 'X';

// 스타일 맵 객체들
const iconVariantMap = {
  back: 'ChevronLeft',
  close: 'X',
  none: null,
} as const;

const getIconName = (variant: TitleIconVariant | undefined): IconType | null => {
  if (!variant || variant === 'none') return null;
  return iconVariantMap[variant] || null;
};

type TitleProps = ComponentProps<'div'> & {
  title?: string;
  iconVariant?: TitleIconVariant;
  onIconClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export const Title: React.FC<TitleProps> = (props) => {
  const { title = '제목', iconVariant = 'none', onIconClick, className, ...rest } = props;

  const router = useRouter();
  const iconName = getIconName(iconVariant);
  const hasIcon = iconName !== null;

  // 아이콘 클릭 핸들러
  const handleClick = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement>): void => {
      if (onIconClick) {
        onIconClick(e);
      } else if (iconVariant === 'back') {
        router.back();
      }
    },
    [onIconClick, iconVariant, router],
  );

  return (
    <div className={cn('relative w-full flex items-center py-4', className)} {...rest}>
      {/* 아이콘 영역 */}
      {hasIcon && (
        <button
          type="button"
          onClick={handleClick}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center size-8 rounded-full hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/50 transition-colors"
          aria-label={`${iconVariant} 버튼`}
        >
          <Icon
            name={iconName}
            size="md"
            color="white"
            className="size-6 text-white cursor-pointer"
          />
        </button>
      )}

      {/* 타이틀 영역 */}
      <h1 className={cn('body-20-bold text-white', 'w-full text-center')}>{title}</h1>
    </div>
  );
};
