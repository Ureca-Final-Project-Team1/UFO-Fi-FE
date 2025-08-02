'use client';

import React from 'react';

import { cn } from '@/lib/utils';

import * as CustomIcons from './CustomIcons';
import { IconProps, IconType, CustomIconType, LucideIconType } from './Icons.types';
import { ImageIcon } from './ImageIcon';
import { LucideIcon } from './LucideIcon';

interface IconComponentProps extends IconProps {
  name?: IconType;
  src?: string;
  alt?: string;
}

/**
 * 통합 아이콘 컴포넌트
 * 완전히 통일된 타입 시스템으로 Lucide, 커스텀 SVG, 이미지 아이콘을 지원
 */
export const Icon: React.FC<IconComponentProps> = (props) => {
  const { name, src, alt, size = 'md', color = 'current', className, onClick, ...rest } = props;

  // ImageIcon용 size 변환 (xs, xl, 2xl, 3xl 제외)
  const getImageIconSize = (size: IconProps['size']) => {
    if (typeof size === 'number') return size;
    if (size === 'xs' || size === 'xl' || size === '2xl' || size === '3xl') return 'md';
    return size;
  };

  // 이미지 아이콘인 경우
  if (src) {
    return (
      <ImageIcon
        src={src}
        alt={alt || name || 'icon'}
        size={getImageIconSize(size)}
        onClick={onClick}
        className={cn(
          'cursor-pointer hover:opacity-80 transition-opacity',
          onClick && 'cursor-pointer',
          className,
        )}
        {...rest}
      />
    );
  }

  // name이 없는 경우
  if (!name) {
    console.warn('Icon 컴포넌트에 name 또는 src가 필요합니다.');
    return null;
  }

  // 커스텀 아이콘 컴포넌트 매핑 (완전한 타입 안전성)
  const customIconComponents: Record<
    CustomIconType,
    React.ComponentType<typeof CustomIcons.UFOIcon extends React.ComponentType<infer P> ? P : never>
  > = {
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

  // 커스텀 아이콘인 경우
  if (name in customIconComponents) {
    const CustomIconComponent = customIconComponents[name as CustomIconType];
    return (
      <CustomIconComponent
        size={size}
        color={color}
        onClick={onClick}
        className={cn(onClick && 'cursor-pointer hover:opacity-80 transition-opacity', className)}
        {...rest}
      />
    );
  }

  // Lucide 아이콘인 경우
  try {
    return (
      <LucideIcon
        name={name as LucideIconType}
        size={size}
        color={color}
        onClick={onClick}
        className={cn(onClick && 'cursor-pointer hover:opacity-80 transition-opacity', className)}
        {...rest}
      />
    );
  } catch (error) {
    console.warn(`아이콘 "${name}"을 찾을 수 없습니다:`, error);
    return (
      <LucideIcon
        name="AlertCircle"
        size={size}
        color={color}
        onClick={onClick}
        className={cn(onClick && 'cursor-pointer hover:opacity-80 transition-opacity', className)}
        {...rest}
      />
    );
  }
};

export { LucideIcon, ImageIcon };
export * from './CustomIcons';
