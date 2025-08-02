import { cva, type VariantProps } from 'class-variance-authority';

export const loadingContainerVariants = cva('flex items-center justify-center', {
  variants: {
    fullScreen: {
      true: 'min-h-screen w-full',
      false: 'min-h-[80vh] w-full',
    },
    variant: {
      default: 'flex-col gap-2',
      spinner: 'flex-col gap-2',
      dots: 'flex-col gap-2',
      pulse: 'flex-col gap-2',
      signal: 'flex-col gap-2',
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
        sm: 'size-4',
        md: 'size-8',
        lg: 'size-12',
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
      sm: 'size-2',
      md: 'size-3',
      lg: 'size-4',
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
