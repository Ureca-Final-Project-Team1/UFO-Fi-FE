import React from 'react';

import { cn } from '@/utils/utils';

import { Icon } from '../Icons';
import type { TitleProps, TitleIconVariant } from './Title.types';

type IconType = 'ChevronLeft' | 'X';

const getIconName = (variant: TitleIconVariant | undefined): IconType | null => {
  switch (variant) {
    case 'back':
      return 'ChevronLeft';
    case 'close':
      return 'X';
    default:
      return null;
  }
};

export const Title: React.FC<TitleProps> = ({
  title,
  iconVariant = 'none',
  onClick,
  className,
  ...props
}) => {
  const iconName = getIconName(iconVariant);
  const hasIcon = iconName !== null;

  return (
    <div className={cn('relative w-full flex items-center py-4 px-4', className)} {...props}>
      {/* 아이콘 영역 */}
      {hasIcon && (
        <button
          type="button"
          onClick={onClick}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-8 h-8 rounded-full hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/50 transition-colors"
          aria-label={`${iconVariant} 버튼`}
        >
          <Icon name={iconName} size="md" color="white" className="w-6 h-6 text-white" />
        </button>
      )}

      {/* 타이틀 영역 */}
      <h1 className={cn('body-20-bold text-white', 'w-full text-center')}>{title}</h1>
    </div>
  );
};
