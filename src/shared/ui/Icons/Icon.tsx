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
 * Lucide 아이콘, 커스텀 SVG 아이콘, 이미지 아이콘을 하나의 인터페이스로 사용
 */
export const Icon: React.FC<IconComponentProps> = ({
  name,
  src,
  alt,
  onClick,
  className,
  ...props
}) => {
  if (src) {
    return (
      <ImageIcon
        src={src}
        alt={alt || name || 'icon'}
        onClick={onClick}
        className={cn(className, onClick && 'cursor-pointer')}
        {...props}
      />
    );
  }

  if (!name) {
    console.warn('Icon error');
    return null;
  }

  const customIconComponents: Record<CustomIconType, React.ComponentType<IconProps>> = {
    ufo: CustomIcons.UFOIcon,
    planet: CustomIcons.PlanetIcon,
    astronaut: CustomIcons.AstronautIcon,
    satellite: CustomIcons.SatelliteIcon,
    box: CustomIcons.BoxIcon,
    rotate: CustomIcons.RotateIcon,
    graph: CustomIcons.GraphIcon,
  };

  if (name in customIconComponents) {
    const CustomIconComponent = customIconComponents[name as CustomIconType];
    return (
      <CustomIconComponent
        onClick={onClick}
        className={cn(className, onClick && 'cursor-pointer')}
        {...props}
      />
    );
  }

  try {
    return (
      <LucideIcon
        name={name as LucideIconType}
        onClick={onClick}
        className={cn(className, onClick && 'cursor-pointer')}
        {...props}
      />
    );
  } catch (error) {
    console.warn(`${name}`, error);
    return (
      <LucideIcon
        name="AlertCircle"
        onClick={onClick}
        className={cn(className, onClick && 'cursor-pointer')}
        {...props}
      />
    );
  }
};

export { LucideIcon, ImageIcon };
export * from './CustomIcons';
