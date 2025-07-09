import { cva } from 'class-variance-authority';

export const indicatorVariants = cva('flex items-center justify-center', {
  variants: {
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
    orientation: 'horizontal',
    spacing: 'normal',
  },
});

// 원형 점 variants
export const basicDotVariants = cva(
  'rounded-full transition-all duration-300 ease-in-out cursor-pointer',
  {
    variants: {
      size: {
        sm: 'w-2 h-2',
        md: 'w-3 h-3',
        lg: 'w-4 h-4',
      },
      state: {
        pending: 'bg-gray-300 scale-75 opacity-60',
        active: 'bg-primary-500 scale-125 shadow-lg',
        completed: 'bg-primary-400 scale-100',
      },
    },
    defaultVariants: {
      size: 'md',
      state: 'pending',
    },
  },
);
