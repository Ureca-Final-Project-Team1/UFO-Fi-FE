import * as LucideIcons from 'lucide-react';
import React from 'react';

import { ICON_SIZES } from '@/constants/icons';

import { IconProps, LucideIconType } from './Icons.types';
import { IconWrapper } from './IconWrapper';

interface LucideIconProps extends IconProps {
  name: LucideIconType;
}

/**
 * Lucide React 아이콘을 래핑하는 컴포넌트
 */
export const LucideIcon: React.FC<LucideIconProps> = (props) => {
  const { name, size = 'md', color = 'current', className } = props;

  const IconComponent = LucideIcons[name];
  const sizeValue = typeof size === 'number' ? size : ICON_SIZES[size];

  if (!IconComponent) {
    console.warn(`Not found "${name}"`);
    return null;
  }

  return (
    <IconWrapper size={size} color={color} className={className}>
      <IconComponent size={sizeValue} />
    </IconWrapper>
  );
};
