import { cva, type VariantProps } from 'class-variance-authority';

export const tabsTriggerVariants = cva(
  'relative inline-flex items-center justify-center font-semibold transition-colors px-3 py-1 text-sm whitespace-nowrap bg-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        default:
          'text-muted-foreground data-[state=active]:text-foreground data-[state=active]:border-b-2 data-[state=active]:border-primary',
        highlight:
          'text-white data-[state=active]:after:content-[""] data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:w-full data-[state=active]:after:h-[3px]',
        underline:
          'text-gray-400 data-[state=active]:text-white data-[state=active]:after:content-[""] data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-1/2 data-[state=active]:after:-translate-x-1/2 data-[state=active]:after:h-[2px] data-[state=active]:after:w-8',
        darkTab:
          'text-gray-400 data-[state=active]:text-white data-[state=active]:border-b-[3px] data-[state=active]:border-[var(--color-button-border)]',
      },
      size: {
        sm: 'h-8 text-sm w-[72px]',
        md: 'h-9 text-base w-[96px]',
        lg: 'h-10 text-lg w-[120px]',
        full: 'h-10 text-base w-full justify-center',
      },
      underlineColor: {
        yellow: 'data-[state=active]:after:bg-yellow-300',
        cyan: 'data-[state=active]:after:bg-cyan-300',
        white: 'data-[state=active]:after:bg-white',
        primary: 'data-[state=active]:after:bg-primary',
      },
    },
    compoundVariants: [
      {
        variant: ['highlight', 'underline'],
        underlineColor: 'primary',
      },
    ],
    defaultVariants: {
      variant: 'default',
      size: 'md',
      underlineColor: 'primary',
    },
  },
);

export type TabsTriggerVariantProps = VariantProps<typeof tabsTriggerVariants>;
