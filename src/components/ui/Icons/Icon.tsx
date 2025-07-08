import React from 'react';

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
export const Icon: React.FC<IconComponentProps> = ({ name, src, alt, ...props }) => {
  if (src) {
    return <ImageIcon src={src} alt={alt || name || 'icon'} {...props} />;
  }

  if (!name) {
    console.warn('Icon error');
    return null;
  }

  // 커스텀 아이콘인 경우
  const customIconComponents: Record<CustomIconType, React.ComponentType<IconProps>> = {
    ufo: CustomIcons.UFOIcon,
    planet: CustomIcons.PlanetIcon,
    trending: CustomIcons.TrendingIcon,
    astronaut: CustomIcons.AstronautIcon,
  };

  // 커스텀 아이콘인지 확인
  if (name in customIconComponents) {
    const CustomIconComponent = customIconComponents[name as CustomIconType];
    return <CustomIconComponent {...props} />;
  }

  // Lucide 아이콘인 경우
  try {
    return <LucideIcon name={name as LucideIconType} {...props} />;
  } catch (error) {
    console.warn(`${name}`, error);
    return <LucideIcon name="AlertCircle" {...props} />;
  }
};

export { LucideIcon, ImageIcon };
export * from './CustomIcons';
