import { cva } from 'class-variance-authority';

// 메인 Skeleton 컨테이너 variants
export const skeletonVariants = cva('rounded-md', {
  variants: {
    variant: {
      pulse: 'animate-pulse bg-muted',
      shimmer:
        'animate-shimmer bg-gradient-to-r from-muted via-muted/50 to-muted bg-[length:200%_100%]',
      none: 'bg-muted',
    },
    size: {
      sm: 'h-3',
      md: 'h-4',
      lg: 'h-6',
      xl: 'h-8',
    },
    shape: {
      default: 'rounded-md',
      rounded: 'rounded-full',
      square: 'rounded-none',
      pill: 'rounded-full',
    },
    color: {
      default: 'bg-muted',
      light: 'bg-gray-100',
      dark: 'bg-gray-300',
      custom: 'bg-blue-100',
    },
  },
  defaultVariants: {
    variant: 'pulse',
    size: 'md',
    shape: 'default',
    color: 'default',
  },
});

// 애니메이션 variants
export const skeletonAnimationVariants = cva('', {
  variants: {
    animation: {
      pulse: 'animate-pulse',
      shimmer: 'animate-shimmer',
      none: '',
      bounce: 'animate-bounce',
      spin: 'animate-spin',
    },
    duration: {
      fast: 'duration-200',
      normal: 'duration-500',
      slow: 'duration-1000',
    },
  },
  defaultVariants: {
    animation: 'pulse',
    duration: 'normal',
  },
});

// 배경 variants
export const skeletonBackgroundVariants = cva('', {
  variants: {
    background: {
      default: 'bg-muted',
      shimmer: 'bg-gradient-to-r from-muted via-muted/50 to-muted bg-[length:200%_100%]',
      light: 'bg-gray-100',
      dark: 'bg-gray-300',
      blue: 'bg-blue-100',
      green: 'bg-green-100',
      purple: 'bg-purple-100',
    },
  },
  defaultVariants: {
    background: 'default',
  },
});

// 크기 variants
export const skeletonSizeVariants = cva('', {
  variants: {
    width: {
      sm: 'w-16',
      md: 'w-32',
      lg: 'w-48',
      xl: 'w-64',
      full: 'w-full',
    },
    height: {
      sm: 'h-3',
      md: 'h-4',
      lg: 'h-6',
      xl: 'h-8',
      '2xl': 'h-12',
    },
  },
  defaultVariants: {
    width: 'md',
    height: 'md',
  },
});

// 텍스트 스켈레톤 variants
export const skeletonTextVariants = cva('rounded', {
  variants: {
    variant: {
      pulse: 'animate-pulse bg-muted',
      shimmer:
        'animate-shimmer bg-gradient-to-r from-muted via-muted/50 to-muted bg-[length:200%_100%]',
      none: 'bg-muted',
    },
    size: {
      xs: 'h-2',
      sm: 'h-3',
      md: 'h-4',
      lg: 'h-5',
      xl: 'h-6',
    },
    lines: {
      1: '',
      2: 'space-y-2',
      3: 'space-y-2',
      4: 'space-y-2',
      5: 'space-y-2',
    },
  },
  defaultVariants: {
    variant: 'pulse',
    size: 'md',
    lines: 1,
  },
});

// 아바타 스켈레톤 variants
export const skeletonAvatarVariants = cva('rounded-full', {
  variants: {
    variant: {
      pulse: 'animate-pulse bg-muted',
      shimmer:
        'animate-shimmer bg-gradient-to-r from-muted via-muted/50 to-muted bg-[length:200%_100%]',
      none: 'bg-muted',
    },
    size: {
      sm: 'w-8 h-8',
      md: 'w-10 h-10',
      lg: 'w-12 h-12',
      xl: 'w-16 h-16',
      '2xl': 'w-20 h-20',
    },
  },
  defaultVariants: {
    variant: 'pulse',
    size: 'md',
  },
});

// 카드 스켈레톤 variants
export const skeletonCardVariants = cva('rounded-lg', {
  variants: {
    variant: {
      pulse: 'animate-pulse bg-muted',
      shimmer:
        'animate-shimmer bg-gradient-to-r from-muted via-muted/50 to-muted bg-[length:200%_100%]',
      none: 'bg-muted',
    },
    size: {
      sm: 'p-3',
      md: 'p-4',
      lg: 'p-6',
      xl: 'p-8',
    },
  },
  defaultVariants: {
    variant: 'pulse',
    size: 'md',
  },
});
