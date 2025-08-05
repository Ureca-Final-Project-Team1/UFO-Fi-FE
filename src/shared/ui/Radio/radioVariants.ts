import { cva } from 'class-variance-authority';

export const radioGroupVariants = cva('grid gap-2', {
  variants: {
    variant: {
      default: '',
      vertical: 'flex flex-col',
      horizontal: 'flex flex-row gap-4',
    },
    size: {
      default: 'gap-2',
      compact: 'gap-1',
      large: 'gap-3',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

export const radioItemVariants = cva(
  'border-input text-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 aspect-square shrink-0 rounded-full border shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: '',
        filled: 'bg-primary border-primary',
        outlined: 'border-2',
      },
      size: {
        default: 'size-4',
        sm: 'size-3',
        lg: 'size-5',
      },
      color: {
        default: '',
        primary: 'border-primary focus-visible:ring-primary/50',
        secondary: 'border-secondary focus-visible:ring-secondary/50',
        success: 'border-green-500 focus-visible:ring-green-500/50',
        warning: 'border-yellow-500 focus-visible:ring-yellow-500/50',
        error: 'border-red-500 focus-visible:ring-red-500/50',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      color: 'default',
    },
  },
);
