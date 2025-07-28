import { cva, type VariantProps } from 'class-variance-authority';

export const loadingContainerVariants = cva('flex items-center justify-center', {
  variants: {
    fullScreen: {
      true: 'min-h-screen w-full',
      false: 'p-4',
    },
    variant: {
      default: 'flex-col gap-2',
      spinner: 'flex-col gap-2',
      dots: 'flex-col gap-2',
      pulse: 'flex-col gap-2',
    },
  },
  defaultVariants: {
    fullScreen: false,
    variant: 'default',
  },
});

export const loadingSpinnerVariants = cva(
  'animate-spin rounded-full border-2 border-cyan-400 border-t-transparent',
  {
    variants: {
      size: {
        sm: 'w-4 h-4',
        md: 'w-8 h-8',
        lg: 'w-12 h-12',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
);

export const loadingDotsVariants = cva('bg-cyan-400 rounded-full animate-pulse', {
  variants: {
    size: {
      sm: 'w-2 h-2',
      md: 'w-3 h-3',
      lg: 'w-4 h-4',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export const loadingMessageVariants = cva('text-white', {
  variants: {
    size: {
      sm: 'caption-14-regular',
      md: 'caption-14-regular',
      lg: 'body-16-medium',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export type LoadingContainerVariants = VariantProps<typeof loadingContainerVariants>;
export type LoadingSpinnerVariants = VariantProps<typeof loadingSpinnerVariants>;
export type LoadingDotsVariants = VariantProps<typeof loadingDotsVariants>;
export type LoadingMessageVariants = VariantProps<typeof loadingMessageVariants>;
