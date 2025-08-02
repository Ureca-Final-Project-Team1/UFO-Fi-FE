'use client';

import React, { ComponentProps } from 'react';

import { cn } from '@/lib/utils';

import * as CustomIcons from './CustomIcons';
import { IconProps, IconType, CustomIconType, LucideIconType } from './Icons.types';
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
    size,
    ...rest
  } = props;

  // ImageIcon용 size 변환 (xs, xl, 2xl, 3xl 제외)
  const getImageIconSize = (size: IconProps['size']) => {
    if (typeof size === 'number') return size;
    if (size === 'xs' || size === 'xl' || size === '2xl' || size === '3xl') return 'md';
    return size;
  };

  if (src) {
    return (
      <ImageIcon
        src={src}
        alt={alt || name || 'icon'}
        size={getImageIconSize(size)}
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

  // CustomIcons 처리
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const customIconComponents: Record<CustomIconType, React.ComponentType<any>> = {
    ufo: CustomIcons.UFOIcon,
    planet: CustomIcons.PlanetIcon,
    trending: CustomIcons.TrendingIcon,
    astronaut: CustomIcons.AstronautIcon,
    satellite: CustomIcons.SatelliteIcon,
    box: CustomIcons.BoxIcon,
    rotate: CustomIcons.RotateIcon,
    graph: CustomIcons.GraphIcon,
    'circle-minus': CustomIcons.CircleMinusIcon,
    return: CustomIcons.ReturnIcon,
    emblaprev: CustomIcons.EmblaPrevIcon,
    emblanext: CustomIcons.EmblaNextIcon,
  };

  if (name in customIconComponents) {
    const CustomIconComponent = customIconComponents[name as CustomIconType];
    return (
      <CustomIconComponent
        size={size}
        onClick={onClick}
        className={cn(iconVariants({ variant: onClick ? 'clickable' : 'default' }), className)}
        {...rest}
      />
    );
  }

  try {
    return (
      <LucideIcon
        name={name as LucideIconType}
        size={size}
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
        size={size}
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
