import { ICON_SIZES, ICON_COLORS } from '@/constants/icons';

export interface IconProps {
  size?: keyof typeof ICON_SIZES | number;
  color?: keyof typeof ICON_COLORS | string;
  className?: string;
  onClick?: React.MouseEventHandler<SVGElement>;
}

export interface ImageIconProps extends Omit<IconProps, 'color'> {
  src: string;
  alt: string;
  priority?: boolean;
  fallbackIcon?: LucideIconType;
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
  | 'FilePenLine' // 거래명세서 아이콘
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
  | 'Siren' // 신고 버튼
  | 'Download'
  | 'CirclePlus' // 판매 등록
  | 'RadioTower' // 전파 거래소
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
  | 'AlertCircle' // 에러용
  | 'ImageOff' // 이미지 에러용
  | 'Loader2' // 로딩용
  | 'Signal' // 신호 아이콘 추가
  | 'RotateCw';

// 커스텀 아이콘 타입
export type CustomIconType =
  | 'ufo'
  | 'planet'
  | 'trending'
  | 'astronaut'
  | 'satellite'
  | 'box'
  | 'rotate'
  | 'graph';

// 전체 아이콘 타입
export type IconType = LucideIconType | CustomIconType;
