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
        square: 'w-[340px] h-[340px] max-w-[80vw] max-h-[80vh]',
        'square-tall': 'w-[330px] h-[400px] max-w-[90vw] max-h-[90vh]',
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
    compoundVariants: [
      {
        size: 'square',
        hasCloseButton: false,
        className: 'pt-6 pb-6 px-6',
      },
      {
        size: 'square-tall',
        hasCloseButton: false,
        className: 'pt-6 pb-6 px-8',
      },
    ],
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
