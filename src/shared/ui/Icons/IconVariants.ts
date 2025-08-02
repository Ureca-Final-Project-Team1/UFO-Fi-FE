import { cva } from 'class-variance-authority';

import { IconType } from './Icons.types';

// 에러 메시지 맵
export const errorMessages = {
  iconError: 'Icon name is required',
  iconNotFound: (name: string) => `Icon "${name}" not found`,
} as const;

// 기본값 설정
export const defaultValues = {
  name: 'HelpCircle' as IconType,
  src: '',
  alt: '',
  onClick: undefined,
  className: '',
} as const;

// 아이콘 variants
export const iconVariants = cva('', {
  variants: {
    variant: {
      default: '',
      clickable: 'cursor-pointer',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});
