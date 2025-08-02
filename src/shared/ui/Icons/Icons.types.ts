import { ComponentProps } from 'react';

import { ICON_SIZES, ICON_COLORS } from '@/constants/icons';

// 기본 아이콘 Props - HTMLSpanElement 기반
export interface BaseIconProps extends ComponentProps<'span'> {
  size?: keyof typeof ICON_SIZES | number;
  color?: keyof typeof ICON_COLORS | string;
}

export interface IconProps extends BaseIconProps {
  name?: IconType;
}

export interface ImageIconProps extends Omit<BaseIconProps, 'color'> {
  src: string;
  alt: string;
  priority?: boolean;
  fallbackIcon?: LucideIconType;
}

export interface LucideIconProps extends BaseIconProps {
  name: LucideIconType;
}

export type CustomIconProps = BaseIconProps;

export interface IconWrapperProps extends BaseIconProps {
  children: React.ReactNode;
}

// Lucide 아이콘 타입 정의
export type LucideIconType =
  | 'Plus'
  | 'Bell'
  | 'User'
  | 'Home'
  | 'Search'
  | 'Settings'
  | 'FilePenLine'
  | 'Menu'
  | 'Sparkles'
  | 'Database'
  | 'Coins'
  | 'Calculator'
  | 'X'
  | 'Sticker'
  | 'ChevronLeft'
  | 'ChevronRight'
  | 'ChevronDown'
  | 'ChevronUp'
  | 'Heart'
  | 'Star'
  | 'Package'
  | 'TriangleAlert'
  | 'Siren'
  | 'Download'
  | 'CirclePlus'
  | 'RadioTower'
  | 'Upload'
  | 'Edit'
  | 'Trash2'
  | 'Eye'
  | 'EyeOff'
  | 'Hourglass'
  | 'CircleCheck'
  | 'Dot'
  | 'ChartNoAxesColumn'
  | 'BellRing'
  | 'AlertCircle'
  | 'ImageOff'
  | 'Loader2'
  | 'Signal'
  | 'RotateCw'
  | 'HelpCircle'
  | 'Link'
  | 'Share'
  | 'Gift'
  | 'MoreHorizontal'
  | 'Check'
  | 'LogOut'
  | 'Shield'
  | 'File'
  | 'RotateCcw'
  | 'CircleMinus'
  | 'FileText'
  | 'UserX'
  | 'RefreshCw'
  | 'UserCheck'
  | 'Users'
  | 'Focus'
  | 'ArrowUp';

// 커스텀 아이콘 타입 정의
export type CustomIconType =
  | 'ufo'
  | 'planet'
  | 'trending'
  | 'astronaut'
  | 'satellite'
  | 'box'
  | 'rotate'
  | 'graph'
  | 'circle-minus'
  | 'return'
  | 'emblaprev'
  | 'emblanext';

// 전체 아이콘 타입
export type IconType = LucideIconType | CustomIconType;
