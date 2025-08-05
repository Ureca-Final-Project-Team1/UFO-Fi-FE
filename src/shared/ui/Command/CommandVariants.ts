import { cva } from 'class-variance-authority';

export const commandVariants = cva('flex h-full w-full flex-col overflow-hidden rounded-md', {
  variants: {
    variant: {
      default: 'bg-popover text-popover-foreground',
      dark: 'bg-gray-900 text-white',
      minimal: 'bg-transparent text-gray-900',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export const commandInputVariants = cva('flex h-9 items-center gap-2 px-3', {
  variants: {
    variant: {
      default: 'border-b',
      dark: 'border-b border-gray-700',
      minimal: 'border-b border-gray-200',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export const commandInputFieldVariants = cva(
  'flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-hidden disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'placeholder:text-muted-foreground',
        dark: 'placeholder:text-gray-400',
        minimal: 'placeholder:text-gray-500',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export const commandListVariants = cva(
  'max-h-[300px] scroll-py-1 overflow-x-hidden overflow-y-auto',
  {
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
  },
);

export const commandEmptyVariants = cva('py-6 text-center md:text-base text-sm', {
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

export const commandGroupVariants = cva(
  'text-foreground overflow-hidden p-1 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium',
  {
    variants: {
      variant: {
        default: '[&_[cmdk-group-heading]]:text-muted-foreground',
        dark: '[&_[cmdk-group-heading]]:text-gray-400',
        minimal: '[&_[cmdk-group-heading]]:text-gray-600',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export const commandSeparatorVariants = cva('-mx-1 h-px', {
  variants: {
    variant: {
      default: 'bg-border',
      dark: 'bg-gray-700',
      minimal: 'bg-gray-200',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export const commandItemVariants = cva(
  "relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground",
        dark: "data-[selected=true]:bg-gray-800 data-[selected=true]:text-white [&_svg:not([class*='text-'])]:text-gray-400",
        minimal:
          "data-[selected=true]:bg-gray-100 data-[selected=true]:text-gray-900 [&_svg:not([class*='text-'])]:text-gray-500",
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export const commandShortcutVariants = cva('ml-auto text-xs tracking-widest', {
  variants: {
    variant: {
      default: 'text-muted-foreground',
      dark: 'text-gray-400',
      minimal: 'text-gray-500',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});
