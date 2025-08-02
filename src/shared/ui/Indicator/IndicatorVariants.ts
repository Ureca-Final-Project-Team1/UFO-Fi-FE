import { cva } from 'class-variance-authority';

export const indicatorVariants = cva(
  'inline-flex items-center justify-center rounded-full border-2 border-current',
  {
    variants: {
      size: {
        sm: 'h-2 w-2',
        md: 'h-3 w-3',
        lg: 'h-4 w-4',
      },
      variant: {
        default: 'bg-primary text-primary-foreground',
        secondary: 'bg-secondary text-secondary-foreground',
        destructive: 'bg-destructive text-destructive-foreground',
        outline: 'text-foreground',
      },
      orientation: {
        horizontal: 'flex-row',
        vertical: 'flex-col',
      },
      spacing: {
        tight: 'gap-1',
        normal: 'gap-2',
        wide: 'gap-3',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'default',
      orientation: 'horizontal',
      spacing: 'normal',
    },
  },
);

export const basicDotVariants = cva('inline-block rounded-full', {
  variants: {
    size: {
      sm: 'h-2 w-2',
      md: 'h-3 w-3',
      lg: 'h-4 w-4',
    },
    state: {
      completed: 'bg-green-500',
      active: 'bg-blue-500',
      pending: 'bg-gray-300',
    },
  },
  defaultVariants: {
    size: 'md',
    state: 'pending',
  },
});

export const hoverVariants = cva('', {
  variants: {
    enabled: {
      true: 'hover:scale-110 transition-transform duration-200',
      false: '',
    },
  },
  defaultVariants: {
    enabled: true,
  },
});

export const cursorVariants = cva('', {
  variants: {
    clickable: {
      true: 'cursor-pointer',
      false: 'cursor-default',
    },
  },
  defaultVariants: {
    clickable: false,
  },
});

export const stepStateMap = {
  completed: 'completed',
  active: 'active',
  pending: 'pending',
} as const;

export const ariaLabelMap = {
  format: (step: number, total: number) => `Step ${step} of ${total}`,
} as const;
