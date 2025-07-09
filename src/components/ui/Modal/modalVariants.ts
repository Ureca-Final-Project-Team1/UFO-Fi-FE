import { cva } from 'class-variance-authority';

export const modalVariants = cva(
  [
    'fixed left-[50%] top-[50%] z-[9999] translate-x-[-50%] translate-y-[-50%]',
    'bg-white shadow-2xl overflow-hidden',
    'duration-300 ease-out',
    'data-[state=open]:animate-in data-[state=closed]:animate-out',
    'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
    'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-105',
  ],
  {
    variants: {
      size: {
        sm: 'w-[280px] max-w-[90vw]',
        md: 'w-[320px] max-w-[90vw]',
        lg: 'w-[380px] max-w-[90vw]',
      },
      rounded: {
        sm: 'rounded-lg', // 8px
        md: 'rounded-xl', // 12px
        lg: 'rounded-2xl', // 16px
        xl: 'rounded-3xl', // 24px
      },
      hasCloseButton: {
        true: 'pt-12 pb-6 px-6',
        false: 'p-6',
      },
    },
    defaultVariants: {
      size: 'md',
      rounded: 'sm',
      hasCloseButton: false,
    },
  },
);

export const modalOverlayVariants = cva([
  'fixed inset-0 z-[9998] bg-black/60 backdrop-blur-sm',
  'data-[state=open]:animate-in data-[state=closed]:animate-out',
  'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
]);

export const modalHeaderVariants = cva([], {
  variants: {
    align: {
      left: 'text-left',
      center: 'text-center',
    },
  },
  defaultVariants: {
    align: 'center',
  },
});

export const modalButtonVariants = cva(
  [
    'font-semibold transition-all duration-200 border-0',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    'rounded-lg',
  ],
  {
    variants: {
      variant: {
        primary: [
          'bg-purple-500',
          'hover:from-purple-600 hover:to-purple-700',
          'text-white shadow-lg transform cursor-pointer',
        ],
        secondary: [
          'border-2 border-gray-200 bg-white',
          'text-gray-700 hover:bg-gray-50 cursor-pointer',
        ],
        danger: [
          'bg-gradient-to-r from-red-500 to-red-600',
          'hover:from-red-600 hover:to-red-700',
          'text-white shadow-lg transform cursor-pointer',
        ],
      },
      size: {
        sm: 'h-10 px-4 text-sm',
        md: 'h-12 px-6 text-base',
        lg: 'h-14 px-8 text-lg',
      },
      width: {
        auto: 'w-auto',
        full: 'w-full',
        flex: 'flex-1',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      width: 'auto',
    },
  },
);
