import React, { ComponentProps } from 'react';

import { cn } from '@/lib/utils';

import { IconProps, IconType, LucideIconType } from './Icons.types';
import { iconVariants, errorMessages, defaultValues } from './IconVariants';
import { ImageIcon } from './ImageIcon';
import { LucideIcon } from './LucideIcon';

interface IconComponentProps extends Omit<ComponentProps<'span'>, 'onClick'>, IconProps {
  name?: IconType;
  src?: string;
  alt?: string;
}

/**
 * 통합 아이콘 컴포넌트
 * Lucide 아이콘, 커스텀 SVG 아이콘, 이미지 아이콘을 하나의 인터페이스로 사용
 */
export const Icon: React.FC<IconComponentProps> = (props) => {
  const {
    name = defaultValues.name,
    src = defaultValues.src,
    alt = defaultValues.alt,
    onClick = defaultValues.onClick,
    className = defaultValues.className,
    ...rest
  } = props;

  if (src) {
    return (
      <ImageIcon
        src={src}
        alt={alt || name || 'icon'}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onClick={onClick as any}
        className={cn(iconVariants({ variant: onClick ? 'clickable' : 'default' }), className)}
        {...rest}
      />
    );
  }

  if (!name) {
    console.warn(errorMessages.iconError);
    return null;
  }

  try {
    return (
      <LucideIcon
        name={name as LucideIconType}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onClick={onClick as any}
        className={cn(iconVariants({ variant: onClick ? 'clickable' : 'default' }), className)}
        {...rest}
      />
    );
  } catch (error) {
    console.warn(errorMessages.iconNotFound(name), error);
    return (
      <LucideIcon
        name="AlertCircle"
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onClick={onClick as any}
        className={cn(iconVariants({ variant: onClick ? 'clickable' : 'default' }), className)}
        {...rest}
      />
    );
  }
};

export { LucideIcon, ImageIcon };
export * from './CustomIcons';
