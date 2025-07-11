import { cva } from 'class-variance-authority';

export const titleVariants = cva('', {
  variants: {
    size: {
      sm: 'body-16-semibold',
      md: 'body-18-bold',
      lg: 'body-20-bold',
    },
  },
  defaultVariants: {
    size: 'lg',
  },
});
