import React from 'react';

import { ICON_SIZES, ICON_COLORS } from '@/constants/icons';
import { cn } from '@/lib/utils';

import { IconWrapperProps } from './Icons.types';

// SVG 요소인지 확인하는 타입 가드
function isSVGElement(
  child: React.ReactNode,
): child is React.ReactElement<React.SVGProps<SVGSVGElement>> {
  return React.isValidElement(child) && child.type === 'svg';
}

/**
 * 아이콘을 감싸는 공통 래퍼 컴포넌트
 * 일관된 크기, 색상, 스타일링을 제공합니다.
 */
export const IconWrapper: React.FC<IconWrapperProps> = ({
  size = 'md',
  color = 'current',
  className,
  children,
}) => {
  const sizeValue = typeof size === 'number' ? size : ICON_SIZES[size];
  const colorValue = color in ICON_COLORS ? ICON_COLORS[color as keyof typeof ICON_COLORS] : color;

  return (
    <span
      className={cn('inline-flex items-center justify-center shrink-0', className)}
      style={{
        width: sizeValue,
        height: sizeValue,
        color: colorValue,
      }}
    >
      {React.Children.map(children, (child) =>
        isSVGElement(child)
          ? React.cloneElement(child, {
              style: {
                ...child.props.style,
                color: colorValue,
                width: '100%',
                height: '100%',
              },
            })
          : child,
      )}
    </span>
  );
};
