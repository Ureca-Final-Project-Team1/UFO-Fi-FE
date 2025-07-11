// dotBadgeVariants.ts
import { cva, type VariantProps } from 'class-variance-authority';

const dotBadgeVariants = cva('inline-flex rounded-full', {
  variants: {
    color: {
      green: 'bg-green-500',
      red: 'bg-red-500',
    },
    size: {
      sm: 'h-1.5 w-1.5',
      default: 'h-2 w-2',
      lg: 'h-3 w-3',
    },
  },
  defaultVariants: {
    color: 'green',
    size: 'default',
  },
});

export type { VariantProps };
export { dotBadgeVariants };
