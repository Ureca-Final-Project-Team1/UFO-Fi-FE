import { cva } from 'class-variance-authority';

export const selectTriggerVariants = cva(
  [
    'border-input text-white',
    'data-[placeholder]:text-muted-foreground',
    "[&_svg:not([class*='text-'])]:text-muted-foreground",
    'focus-visible:border-ring',
    'focus-visible:ring-ring/50',
    'aria-invalid:ring-destructive/20',
    'dark:aria-invalid:ring-destructive/40',
    'aria-invalid:border-destructive',
    'dark:bg-input/30',
    'dark:hover:bg-input/50',
    'flex w-fit items-center justify-between gap-2',
    'rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap',
    'shadow-xs transition-[color,box-shadow] outline-none',
    'focus-visible:ring-[3px]',
    'disabled:cursor-not-allowed disabled:opacity-50',
    'data-[size=default]:h-9',
    'data-[size=sm]:h-8',
    '*:data-[slot=select-value]:line-clamp-1',
    '*:data-[slot=select-value]:flex',
    '*:data-[slot=select-value]:items-center',
    '*:data-[slot=select-value]:gap-2',
    '[&_svg]:pointer-events-none',
    '[&_svg]:shrink-0',
    "[&_svg:not([class*='size-'])]:size-4",
  ],
  {
    variants: {
      size: {
        sm: 'data-[size=sm]:h-8',
        default: 'data-[size=default]:h-9',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  },
);

export const selectContentVariants = cva([
  'bg-popover text-popover-foreground',
  'data-[state=open]:animate-in data-[state=closed]:animate-out',
  'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
  'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
  'data-[side=bottom]:slide-in-from-top-2',
  'data-[side=left]:slide-in-from-right-2',
  'data-[side=right]:slide-in-from-left-2',
  'data-[side=top]:slide-in-from-bottom-2',
  'relative z-50 max-h-(--radix-select-content-available-height)',
  'min-w-[8rem] origin-(--radix-select-content-transform-origin)',
  'overflow-x-hidden overflow-y-auto rounded-md border shadow-md',
]);

export const selectItemVariants = cva([
  'focus:bg-accent focus:text-accent-foreground',
  "[&_svg:not([class*='text-'])]:text-muted-foreground",
  'relative flex w-full cursor-default items-center gap-2',
  'rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none',
  'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
  '[&_svg]:pointer-events-none [&_svg]:shrink-0',
  "[&_svg:not([class*='size-'])]:size-4",
  '*:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2',
]);

export const selectLabelVariants = cva('text-muted-foreground px-2 py-1.5 text-xs');

export const selectSeparatorVariants = cva('bg-border pointer-events-none -mx-1 my-1 h-px');

export const selectScrollButtonVariants = cva(
  'flex cursor-default items-center justify-center py-1',
);
