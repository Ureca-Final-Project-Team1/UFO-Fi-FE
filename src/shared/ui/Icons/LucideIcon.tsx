import * as LucideIcons from 'lucide-react';
import React, { ComponentProps } from 'react';

import { ICON_SIZES } from '@/constants/icons';

import { IconProps, LucideIconType } from './Icons.types';
import { IconWrapper } from './IconWrapper';

// 스타일 맵 객체들
const errorMessages = {
  notFound: (name: string) => `Not found "${name}"`,
} as const;

const defaultValues = {
  name: 'HelpCircle' as LucideIconType,
  size: 'md',
  color: 'current',
  className: '',
} as const;

type LucideIconProps = ComponentProps<'span'> &
  IconProps & {
    name?: LucideIconType;
  };

/**
 * Lucide React 아이콘을 래핑하는 컴포넌트
 */
export const LucideIcon: React.FC<LucideIconProps> = (props) => {
  const {
    name = defaultValues.name,
    size = defaultValues.size,
    color = defaultValues.color,
    className = defaultValues.className,
    ...rest
  } = props;

  const IconComponent = LucideIcons[name];
  const sizeValue = typeof size === 'number' ? size : ICON_SIZES[size];

  if (!IconComponent) {
    console.warn(errorMessages.notFound(name));
    return null;
  }

  return (
    <IconWrapper size={size} color={color} className={className} {...rest}>
      <IconComponent size={sizeValue} />
    </IconWrapper>
  );
};
