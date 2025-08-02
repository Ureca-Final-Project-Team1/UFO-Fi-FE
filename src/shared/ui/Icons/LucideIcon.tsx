import * as LucideIcons from 'lucide-react';
import React, { ComponentProps } from 'react';

import { ICON_SIZES } from '@/constants/icons';
import { cn } from '@/lib/utils';

import { IconProps, LucideIconType } from './Icons.types';
import { IconWrapper } from './IconWrapper';
import { lucideIconVariants, errorMessages, defaultValues } from './LucideIconVariants';

type LucideIconProps = ComponentProps<'span'> &
  IconProps & {
    name?: LucideIconType;
    animation?: 'none' | 'spin' | 'pulse' | 'bounce';
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
    animation = 'none',
    ...rest
  } = props;

  const IconComponent = LucideIcons[name];
  const sizeValue = typeof size === 'number' ? size : ICON_SIZES[size];

  if (!IconComponent) {
    console.warn(errorMessages.notFound(name));
    return null;
  }

  return (
    <IconWrapper
      size={size}
      color={color}
      className={cn(lucideIconVariants({ animation }), className)}
      {...rest}
    >
      <IconComponent size={sizeValue} />
    </IconWrapper>
  );
};
