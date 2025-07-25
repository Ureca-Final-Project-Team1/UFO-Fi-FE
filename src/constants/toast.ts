export const TOAST_CONFIG = {
  POSITION: 'bottom-center' as const,
  BOTTOM_OFFSET: '80px',
  EXPAND: true,
  RICH_COLORS: true,
  CLOSE_BUTTON: true,
} as const;

export type ToastPosition = typeof TOAST_CONFIG.POSITION;
