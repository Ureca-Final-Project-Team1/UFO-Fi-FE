import { cva } from 'class-variance-authority';

export const skeletonVariants = cva('', {
  variants: {
    variant: {
      pulse: 'animate-pulse bg-muted',
      shimmer:
        'animate-shimmer bg-gradient-to-r from-muted via-muted/50 to-muted bg-[length:200%_100%]',
      none: '',
    },
    size: {
      default: 'rounded-md',
      sm: 'rounded-sm',
      lg: 'rounded-lg',
      full: 'rounded-full',
    },
  },
  defaultVariants: {
    variant: 'pulse',
    size: 'default',
  },
});
