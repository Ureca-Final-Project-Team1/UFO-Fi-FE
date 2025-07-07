import React from 'react';

import * as CustomIcons from './CustomIcons';
import { IconProps, IconType, CustomIconType, LucideIconType } from './Icons.types';
import { ImageIcon } from './ImageIcon';
import { LucideIcon } from './LucideIcon';

interface IconComponentProps extends IconProps {
  name: IconType;
  src?: string; // 이미지 아이콘인 경우 사용
  alt?: string; // 이미지 아이콘인 경우 사용
}

/**
 * 통합 아이콘 컴포넌트
 * Lucide 아이콘, 커스텀 SVG 아이콘, 이미지 아이콘을 하나의 인터페이스로 사용
 */
export const Icon: React.FC<IconComponentProps> = ({ name, src, alt, ...props }) => {
  // 이미지 아이콘인 경우
  if (src) {
    return <ImageIcon src={src} alt={alt || name} {...props} />;
  }

  // 커스텀 아이콘인 경우
  const customIconComponents: Record<CustomIconType, React.ComponentType<IconProps>> = {
    ufo: CustomIcons.UFOIcon,
    purchase: CustomIcons.PurchaseIcon,
    planet: CustomIcons.PlanetIcon,
    trending: CustomIcons.TrendingIcon,
    astronaut: CustomIcons.AstronautIcon,
  };

  if (name in customIconComponents) {
    const CustomIconComponent = customIconComponents[name as CustomIconType];
    return <CustomIconComponent {...props} />;
  }

  // Lucide 아이콘인 경우
  return <LucideIcon name={name as LucideIconType} {...props} />;
};

export { LucideIcon, ImageIcon };
export * from './CustomIcons';
