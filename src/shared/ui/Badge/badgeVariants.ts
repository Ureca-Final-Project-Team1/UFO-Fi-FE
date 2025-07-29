import { cva } from 'class-variance-authority';

export const badgeVariants = cva(
  'inline-flex items-center justify-center rounded-full border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-white text-gray-900 [a&]:hover:bg-white/90',
        carrier: 'border-transparent bg-white text-gray-900 [a&]:hover:bg-white/90',
        secondary: 'border-transparent bg-[#175F89] text-white [a&]:hover:bg-[#175F89]/90',
        destructive:
          'border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
        outline: 'text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground',
      },
      state: {
        selling: 'bg-(--color-badge-selling) text-(--color-text-selling)',
        sold: 'bg-(--color-badge-sold) text-(--color-text-sold)',
        timeout: 'bg-(--color-badge-timeout) text-(--color-text-timeout)',
        reported: 'bg-(--color-badge-reported) text-(--color-text-reported)',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);
