import { cva } from 'class-variance-authority';

export const progressVariants = cva('relative w-full overflow-hidden rounded-full bg-gray-200', {
  variants: {
    size: {
      sm: 'h-1',
      md: 'h-2',
      lg: 'h-3',
      xl: 'h-4',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export const progressIndicatorVariants = cva(
  'h-full w-full flex-1 transition-all duration-300 ease-in-out bg-cyan-300',
);
