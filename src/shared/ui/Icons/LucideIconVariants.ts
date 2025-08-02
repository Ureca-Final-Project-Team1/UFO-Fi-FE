import { cva } from 'class-variance-authority';

import { LucideIconType } from './Icons.types';

export const lucideIconVariants = cva('', {
  variants: {
    size: {
      xs: 'w-3 h-3',
      sm: 'w-4 h-4',
      md: 'w-6 h-6',
      lg: 'w-8 h-8',
      xl: 'w-10 h-10',
      '2xl': 'w-12 h-12',
      '3xl': 'w-16 h-16',
    },
    color: {
      primary: 'text-primary-500',
      secondary: 'text-secondary-500',
      current: 'text-current',
      white: 'text-white',
      gray: 'text-gray-500',
    },
    animation: {
      none: '',
      spin: 'animate-spin',
      pulse: 'animate-pulse',
      bounce: 'animate-bounce',
    },
  },
  defaultVariants: {
    size: 'md',
    color: 'current',
    animation: 'none',
  },
});

// 에러 메시지 맵
export const errorMessages = {
  notFound: (name: string) => `Not found "${name}"`,
} as const;

// 기본값 설정
export const defaultValues = {
  name: 'HelpCircle' as LucideIconType,
  size: 'md',
  color: 'current',
  className: '',
} as const;
