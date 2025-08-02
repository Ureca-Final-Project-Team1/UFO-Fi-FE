import * as LucideIcons from 'lucide-react';
import React from 'react';

import { ICON_SIZES } from '@/constants/icons';

import { LucideIconProps } from './Icons.types';
import { IconWrapper } from './IconWrapper';

/**
 * Lucide React 아이콘을 래핑하는 컴포넌트
 */
export const LucideIcon: React.FC<LucideIconProps> = ({
  name,
  size = 'md',
  color = 'current',
  className,
  ...rest
}) => {
  const IconComponent = LucideIcons[name];
  const sizeValue = typeof size === 'number' ? size : ICON_SIZES[size];

  if (!IconComponent) {
    console.warn(`Lucide 아이콘 "${name}"을 찾을 수 없습니다.`);
    return null;
  }

  return (
    <IconWrapper size={size} color={color} className={className} {...rest}>
      <IconComponent size={sizeValue} />
    </IconWrapper>
  );
};
