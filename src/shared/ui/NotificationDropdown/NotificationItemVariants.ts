import { cva } from 'class-variance-authority';

// 알림 타입별 설정 (사용하지 않는 색상 필드 제거)
export const notificationConfig = {
  BENEFIT: {
    icon: 'Gift',
  },
  SELL: {
    icon: 'CirclePlus',
  },
  INTERESTED_POST: {
    icon: 'Heart',
  },
  REPORTED: {
    icon: 'Shield',
  },
  FOLLOWER_POST: {
    icon: 'Users',
  },
  TRADE: {
    icon: 'RadioTower',
  },
} as const;

// 기본값 설정
export const defaultValues = {
  onClick: () => {},
} as const;

// 컨테이너 variants
export const containerVariants = cva('', {
  variants: {
    variant: {
      base: 'flex items-start gap-3 p-4 w-full cursor-pointer transition-colors border-l-4',
      unread:
        'flex items-start gap-3 p-4 w-full cursor-pointer transition-colors border-l-4 bg-blue-50/50 border-blue-200 hover:bg-blue-50',
      read: 'flex items-start gap-3 p-4 w-full cursor-pointer transition-colors border-l-4 border-transparent hover:bg-gray-50',
    },
  },
  defaultVariants: {
    variant: 'base',
  },
});

// 제목 variants
export const titleVariants = cva('', {
  variants: {
    variant: {
      base: 'text-sm leading-5',
      unread: 'text-sm leading-5 font-bold text-gray-900',
      read: 'text-sm leading-5 font-semibold text-gray-700',
    },
  },
  defaultVariants: {
    variant: 'base',
  },
});

// 내용 variants
export const contentVariants = cva('', {
  variants: {
    variant: {
      base: 'text-sm leading-5 line-clamp-2',
      unread: 'text-sm leading-5 line-clamp-2 text-gray-800',
      read: 'text-sm leading-5 line-clamp-2 text-gray-600',
    },
  },
  defaultVariants: {
    variant: 'base',
  },
});

// 배지 variants
export const badgeVariants = cva('', {
  variants: {
    variant: {
      base: 'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium',
      unread:
        'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800',
    },
  },
  defaultVariants: {
    variant: 'base',
  },
});
