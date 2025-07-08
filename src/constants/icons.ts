// 아이콘 경로 상수
export const ICON_PATHS = {
  UFO_LOGO: '/icons/ufo-logo.svg',
} as const;

// 아이콘 사이즈 상수
export const ICON_SIZES = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
  '2xl': 40,
  '3xl': 48,
} as const;

// 아이콘 색상 상수
export const ICON_COLORS = {
  // Primary 색상
  primary: 'var(--color-primary-700)',
  primaryLight: 'var(--color-primary-300)',
  primary100: 'var(--color-primary-100)',
  primary200: 'var(--color-primary-200)',
  primary400: 'var(--color-primary-400)',
  primary500: 'var(--color-primary-500)',
  primary600: 'var(--color-primary-600)',

  // Secondary 색상
  yellow: 'var(--color-secondary-yellow)',
  pink: 'var(--color-secondary-pink)',
  cyan: 'var(--color-secondary-cyan)',
  blue: 'var(--color-secondary-blue)',
  fuchsia: 'var(--color-secondary-fuchsia)',
  indigo: 'var(--color-secondary-indigo)',

  // Black 색상
  white: '#ffffff',
  black100: 'var(--color-black-100)',
  black200: 'var(--color-black-200)',
  black300: 'var(--color-black-300)',
  black400: 'var(--color-black-400)',
  black500: 'var(--color-black-500)',
  black600: 'var(--color-black-600)',
  black700: 'var(--color-black-700)',
  black800: 'var(--color-black-800)',

  // Status 색상
  positive: 'var(--color-status-positive)',
  cautionary: 'var(--color-status-cautionary)',
  negative: 'var(--color-status-negative)',

  // Accent 색상
  red: 'var(--color-accent-red)',

  // 기본값
  current: 'currentColor',
} as const;
