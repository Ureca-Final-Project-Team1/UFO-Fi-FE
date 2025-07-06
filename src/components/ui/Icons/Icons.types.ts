import { ICON_SIZES, ICON_COLORS } from '@/constants/icons';

export interface IconProps {
  size?: keyof typeof ICON_SIZES | number;
  color?: keyof typeof ICON_COLORS | string;
  className?: string;
}

export interface ImageIconProps extends Omit<IconProps, 'color'> {
  src: string;
  alt: string;
  priority?: boolean;
}

export interface IconWrapperProps extends IconProps {
  children: React.ReactNode;
}

// Lucide 아이콘 타입
export type LucideIconType =
  | 'Plus'
  | 'Bell'
  | 'User'
  | 'Home'
  | 'Search'
  | 'Settings'
  | 'Menu'
  | 'X'
  | 'ChevronLeft'
  | 'ChevronRight'
  | 'Heart'
  | 'Star'
  | 'Download'
  | 'Upload'
  | 'Edit'
  | 'Trash2'
  | 'Eye'
  | 'EyeOff';

// 커스텀 아이콘 타입
export type CustomIconType = 'ufo' | 'purchase' | 'planet' | 'trending' | 'astronaut';

// 전체 아이콘 타입
export type IconType = LucideIconType | CustomIconType;
