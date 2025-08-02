import { cva } from 'class-variance-authority';

export const sizeVariants = cva('font-medium leading-relaxed', {
  variants: {
    size: {
      sm: 'p-3 text-xs max-w-[200px]',
      md: 'p-4 text-sm max-w-[280px]',
      lg: 'p-5 text-base max-w-[320px]',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

// 스타일 variants
export const variantVariants = cva('rounded-2xl shadow-lg border-2', {
  variants: {
    variant: {
      default: 'bg-white text-black border-gray-100',
      secondary: 'bg-gray-100 text-gray-900 border-gray-200',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

// 꼬리 색상 variants
export const tailColorVariants = {
  default: { borderColor: '#f3f4f6', fillColor: '#ffffff' },
  secondary: { borderColor: '#e5e7eb', fillColor: '#f3f4f6' },
} as const;

// 꼬리 크기 variants
export const tailSizeVariants = {
  sm: 10,
  md: 12,
  lg: 14,
} as const;
