import { cva } from 'class-variance-authority';

// 메인 Command 컨테이너
export const commandVariants = cva(
  'bg-popover text-popover-foreground flex h-full w-full flex-col overflow-hidden rounded-md',
  {
    variants: {
      size: {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl',
        full: 'max-w-full',
      },
      theme: {
        default: 'bg-white border border-gray-200',
        dark: 'bg-gray-900 border border-gray-700',
        minimal: 'bg-transparent border-none',
      },
    },
    defaultVariants: {
      size: 'md',
      theme: 'default',
    },
  },
);

// Command Input
export const commandInputVariants = cva(
  'placeholder:text-muted-foreground flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-hidden disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      inputSize: {
        sm: 'h-8 text-xs',
        md: 'h-10 text-sm',
        lg: 'h-12 text-base',
      },
      variant: {
        default: 'border-b border-gray-200',
        outlined: 'border border-gray-300 rounded-md',
        filled: 'bg-gray-50 border-none',
      },
    },
    defaultVariants: {
      inputSize: 'md',
      variant: 'default',
    },
  },
);

// Command Item
export const commandItemVariants = cva(
  "data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      size: {
        sm: 'px-1.5 py-1 text-xs',
        md: 'px-2 py-1.5 text-sm',
        lg: 'px-3 py-2 text-base',
      },
      variant: {
        default:
          'hover:bg-gray-100 data-[selected=true]:bg-blue-100 data-[selected=true]:text-blue-900',
        minimal:
          'hover:bg-transparent data-[selected=true]:bg-transparent data-[selected=true]:text-blue-600',
        card: 'hover:bg-gray-50 data-[selected=true]:bg-blue-50 data-[selected=true]:text-blue-900 rounded-md',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'default',
    },
  },
);

// Command Group
export const commandGroupVariants = cva(
  'text-foreground [&_[cmdk-group-heading]]:text-muted-foreground overflow-hidden p-1 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium',
  {
    variants: {
      spacing: {
        compact: 'p-0.5 [&_[cmdk-group-heading]]:py-1',
        default: 'p-1 [&_[cmdk-group-heading]]:py-1.5',
        relaxed: 'p-2 [&_[cmdk-group-heading]]:py-2',
      },
    },
    defaultVariants: {
      spacing: 'default',
    },
  },
);

// Command List
export const commandListVariants = cva('scroll-py-1 overflow-x-hidden overflow-y-auto', {
  variants: {
    maxHeight: {
      sm: 'max-h-[200px]',
      md: 'max-h-[300px]',
      lg: 'max-h-[400px]',
      xl: 'max-h-[500px]',
      none: 'max-h-none',
    },
  },
  defaultVariants: {
    maxHeight: 'md',
  },
});

// Command Empty
export const commandEmptyVariants = cva('py-6 text-center', {
  variants: {
    size: {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base',
    },
    variant: {
      default: 'text-gray-500',
      muted: 'text-gray-400',
      primary: 'text-blue-500',
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'default',
  },
});

// Command Shortcut
export const commandShortcutVariants = cva('ml-auto text-xs tracking-widest', {
  variants: {
    variant: {
      default: 'text-muted-foreground',
      primary: 'text-blue-500',
      secondary: 'text-gray-500',
      accent: 'text-green-500',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});
