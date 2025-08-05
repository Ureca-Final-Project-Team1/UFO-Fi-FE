import { cva } from 'class-variance-authority';

export const tooltipProviderVariants = cva('', {
  variants: {
    variant: {
      default: '',
      dark: '',
      minimal: '',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export const tooltipContentVariants = cva(
  'animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md px-3 py-1.5 text-xs text-balance',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground',
        dark: 'bg-gray-900 text-white border border-gray-700',
        minimal: 'bg-white text-gray-900 border border-gray-200 shadow-lg',
      },
      size: {
        default: 'px-3 py-1.5 text-xs',
        sm: 'px-2 py-1 text-xs',
        lg: 'px-4 py-2 text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export const tooltipArrowVariants = cva(
  'size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]',
  {
    variants: {
      variant: {
        default: 'bg-primary fill-primary',
        dark: 'bg-gray-900 fill-gray-900',
        minimal: 'bg-white fill-white',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);
