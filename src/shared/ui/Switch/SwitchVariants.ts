import { cva } from 'class-variance-authority';

// Switch Root variants
export const switchVariants = cva(
  'peer inline-flex shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all duration-300 outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      size: {
        sm: 'h-3 w-6',
        md: 'h-[1.15rem] w-8',
        lg: 'h-6 w-12',
        xl: 'h-8 w-16',
      },
      variant: {
        default:
          'data-[state=checked]:bg-yellow-200 data-[state=unchecked]:bg-gray-300 focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input/80',
        primary:
          'data-[state=checked]:bg-primary data-[state=unchecked]:bg-muted focus-visible:border-primary focus-visible:ring-primary/50',
        secondary:
          'data-[state=checked]:bg-secondary data-[state=unchecked]:bg-muted focus-visible:border-secondary focus-visible:ring-secondary/50',
        accent:
          'data-[state=checked]:bg-accent data-[state=unchecked]:bg-muted focus-visible:border-accent focus-visible:ring-accent/50',
        success:
          'data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-gray-300 focus-visible:border-green-500 focus-visible:ring-green-500/50',
        warning:
          'data-[state=checked]:bg-yellow-500 data-[state=unchecked]:bg-gray-300 focus-visible:border-yellow-500 focus-visible:ring-yellow-500/50',
        error:
          'data-[state=checked]:bg-red-500 data-[state=unchecked]:bg-gray-300 focus-visible:border-red-500 focus-visible:ring-red-500/50',
        custom:
          'data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-purple-500 data-[state=checked]:to-pink-500 data-[state=unchecked]:bg-gray-300 focus-visible:border-purple-500 focus-visible:ring-purple-500/50',
      },
      theme: {
        light: '',
        dark: 'dark:data-[state=unchecked]:bg-input/80',
        auto: 'dark:data-[state=unchecked]:bg-input/80',
      },
      disabled: {
        true: '',
        false: '',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'default',
      theme: 'auto',
      disabled: false,
    },
  },
);

// Switch Thumb variants
export const switchThumbVariants = cva(
  'pointer-events-none block rounded-full ring-0 transition-transform duration-200',
  {
    variants: {
      size: {
        sm: 'size-2.5 data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0',
        md: 'size-4 data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0',
        lg: 'size-5 data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0',
        xl: 'size-6 data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0',
      },
      variant: {
        default:
          'bg-background dark:data-[state=unchecked]:bg-foreground dark:data-[state=checked]:bg-primary-foreground',
        primary: 'bg-primary-foreground',
        secondary: 'bg-secondary-foreground',
        accent: 'bg-accent-foreground',
        success: 'bg-white',
        warning: 'bg-white',
        error: 'bg-white',
        custom: 'bg-white shadow-lg',
      },
      theme: {
        light: 'bg-background',
        dark: 'dark:data-[state=unchecked]:bg-foreground dark:data-[state=checked]:bg-primary-foreground',
        auto: 'bg-background dark:data-[state=unchecked]:bg-foreground dark:data-[state=checked]:bg-primary-foreground',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'default',
      theme: 'auto',
    },
  },
);

// Switch Label variants
export const switchLabelVariants = cva('flex items-center gap-2', {
  variants: {
    size: {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base',
      xl: 'text-lg',
    },
    variant: {
      default: 'text-foreground',
      primary: 'text-primary',
      secondary: 'text-secondary-foreground',
      accent: 'text-accent-foreground',
      success: 'text-green-700',
      warning: 'text-yellow-700',
      error: 'text-red-700',
      custom: 'text-foreground',
    },
    disabled: {
      true: 'opacity-50 cursor-not-allowed',
      false: 'cursor-pointer',
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'default',
    disabled: false,
  },
});

// Switch Container variants
export const switchContainerVariants = cva('flex items-center', {
  variants: {
    layout: {
      horizontal: 'flex-row gap-2',
      vertical: 'flex-col gap-1',
      reverse: 'flex-row-reverse gap-2',
    },
    alignment: {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
      between: 'justify-between',
    },
    spacing: {
      sm: 'gap-1',
      md: 'gap-2',
      lg: 'gap-3',
      xl: 'gap-4',
    },
  },
  defaultVariants: {
    layout: 'horizontal',
    alignment: 'start',
    spacing: 'md',
  },
});

// Switch Group variants
export const switchGroupVariants = cva('space-y-2', {
  variants: {
    layout: {
      horizontal: 'flex flex-row flex-wrap gap-4',
      vertical: 'flex flex-col gap-2',
      grid: 'grid grid-cols-2 gap-4',
    },
    size: {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base',
      xl: 'text-lg',
    },
  },
  defaultVariants: {
    layout: 'vertical',
    size: 'md',
  },
});
