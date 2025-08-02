import { cva } from 'class-variance-authority';

export const buttonVariants = cva('', {
  variants: {
    variant: {
      default:
        'relative w-10 h-10 rounded-full transition-all duration-200 hover:bg-white/10 active:scale-95 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-white/30',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

// 아이콘 variants
export const iconVariants = cva('', {
  variants: {
    variant: {
      bell: 'w-5 h-5',
    },
  },
  defaultVariants: {
    variant: 'bell',
  },
});

// 배지 컨테이너 variants
export const badgeContainerVariants = cva('', {
  variants: {
    variant: {
      default: 'absolute -top-0.5 -right-0.5',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

// 배지 variants
export const badgeVariants = cva('', {
  variants: {
    variant: {
      default: 'animate-pulse',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

// aria-label 맵
export const ariaLabelMap = {
  base: '알림',
  withCount: (count: number) => `알림 (${count}개의 새 알림)`,
} as const;
