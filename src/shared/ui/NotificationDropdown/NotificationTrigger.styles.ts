// NotificationTrigger 컴포넌트 스타일 맵
export const buttonStyle = {
  base: 'relative w-10 h-10 rounded-full transition-all duration-200 hover:bg-white/10 active:scale-95 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-white/30',
} as const;

export const iconStyle = {
  bell: 'w-5 h-5',
} as const;

export const badgeStyle = {
  container: 'absolute -top-0.5 -right-0.5',
  badge: 'animate-pulse',
} as const;

export const ariaLabelMap = {
  base: '알림',
  withCount: (count: number) => `알림 (${count}개의 새 알림)`,
} as const;
