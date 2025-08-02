import { cva } from 'class-variance-authority';

// span 컨테이너 variants
export const spanVariants = cva('', {
  variants: {
    variant: {
      base: 'inline-flex items-center justify-center shrink-0',
    },
  },
  defaultVariants: {
    variant: 'base',
  },
});

// 기본값 설정
export const defaultValues = {
  size: 'md',
  color: 'current',
  className: '',
  children: null,
} as const;
