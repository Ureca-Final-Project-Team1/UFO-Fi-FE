import { cva } from 'class-variance-authority';

export const sizeVariants = cva('', {
  variants: {
    size: {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

// 단위 variants
export const unitVariants = cva('ml-1', {
  variants: {
    variant: {
      default: '',
      bold: 'font-bold',
      muted: 'text-gray-500',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});
