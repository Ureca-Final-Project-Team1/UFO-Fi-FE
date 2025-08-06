import { cva } from 'class-variance-authority';

// Tooltip Content variants
export const tooltipContentVariants = cva(
  'z-50 w-fit origin-(--radix-tooltip-content-transform-origin) text-balance animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground',
        primary: 'bg-blue-500 text-white',
        secondary: 'bg-gray-500 text-white',
        success: 'bg-green-500 text-white',
        warning: 'bg-yellow-500 text-black',
        error: 'bg-red-500 text-white',
        custom: '',
      },
      size: {
        sm: 'px-2 py-1 text-xs',
        md: 'px-3 py-1.5 text-xs',
        lg: 'px-4 py-2 text-sm',
        xl: 'px-5 py-2.5 text-base',
      },
      theme: {
        light: 'bg-white text-gray-900 border border-gray-200',
        dark: 'bg-gray-900 text-white border border-gray-700',
        custom: '',
      },
      rounded: {
        none: 'rounded-none',
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-lg',
        full: 'rounded-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      theme: 'light',
      rounded: 'md',
    },
  },
);

// Tooltip Arrow variants
export const tooltipArrowVariants = cva(
  'z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]',
  {
    variants: {
      variant: {
        default: 'bg-primary fill-primary',
        primary: 'bg-blue-500 fill-blue-500',
        secondary: 'bg-gray-500 fill-gray-500',
        success: 'bg-green-500 fill-green-500',
        warning: 'bg-yellow-500 fill-yellow-500',
        error: 'bg-red-500 fill-red-500',
        custom: '',
      },
      size: {
        sm: 'size-2',
        md: 'size-2.5',
        lg: 'size-3',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  },
);
