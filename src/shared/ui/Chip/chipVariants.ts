import { cva } from 'class-variance-authority';

export const chipVariants = cva(
  'rounded-full font-medium border transition-colors flex items-center', // 기본 클래스
  {
    variants: {
      variant: {
        default:
          'bg-gray-800 text-gray-200 border-gray-700 hover:border-primary-400 hover:text-primary-400',
        primary: 'bg-primary-600 text-white border-primary-600 hover:bg-primary-700',
        secondary: 'bg-gray-100 text-gray-900 border-gray-300 hover:bg-gray-200',
        outline: 'bg-transparent text-gray-700 border-gray-300 hover:bg-gray-50',
        ghost: 'bg-transparent text-gray-600 border-transparent hover:bg-gray-100',
      },
      size: {
        sm: 'px-2 py-1 text-xs',
        md: 'px-3 py-1.5 text-sm',
        lg: 'px-4 py-2 text-base',
      },
      state: {
        default: '',
        selected: 'bg-primary-600 text-white border-primary-600',
        disabled: 'opacity-50 cursor-not-allowed',
        loading: 'opacity-75 cursor-wait',
      },
    },
    compoundVariants: [
      // selected + variant 조합
      {
        variant: 'primary',
        state: 'selected',
        class: 'bg-primary-700 text-white border-primary-700',
      },
      {
        variant: 'secondary',
        state: 'selected',
        class: 'bg-gray-200 text-gray-900 border-gray-400',
      },
      {
        variant: 'outline',
        state: 'selected',
        class: 'bg-primary-50 text-primary-700 border-primary-500',
      },
      // disabled + variant 조합
      {
        state: 'disabled',
        class: 'opacity-50 cursor-not-allowed hover:border-current hover:text-current',
      },
    ],
    defaultVariants: {
      variant: 'default',
      size: 'md',
      state: 'default',
    },
  },
);
