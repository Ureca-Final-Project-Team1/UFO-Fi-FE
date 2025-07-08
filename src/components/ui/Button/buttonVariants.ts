// buttonVariants.ts
import { cva } from 'class-variance-authority';

export const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        // 기본 shadcn/ui variants
        primary:
          'bg-primary-300 text-primary-text-dark font-bold text-[15px] hover:bg-primary-hover',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-border bg-background hover:bg-accent hover:text-accent-foreground',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',

        // 커스텀 variants
        'exploration-button':
          'bg-gradient-to-r from-exploration-gradient-from to-exploration-gradient-to border-2 border-exploration-border text-white font-semibold text-[16px] leading-[24px] hover:opacity-90',
        'cancel-button':
          'rounded-[12px] border border-cancel-border bg-white text-cancel-text text-center font-semibold text-[16px] leading-[24px] hover:bg-black-100',
        'number-badge':
          'flex py-3 px-0 items-center flex-shrink-0 rounded-lg border-2 border-badge-border-blue bg-badge-bg-dark text-badge-text-cyan text-center font-semibold text-[18px] leading-[26px] hover:bg-badge-hover-dark',
        'action-button': 'bg-accent-red text-white hover:bg-accent-red/90',
        'next-button': 'bg-primary-300 text-white hover:bg-next-hover',
        'project-button': 'rounded-[5px] bg-primary-200 text-black-700 hover:bg-primary-300/30',
      },
      size: {
        sm: 'h-9 rounded-md px-3 text-sm',
        default: 'h-10 px-4 py-2',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
        'full-width': 'h-[54px] w-[350px] rounded-[10px] px-8 font-bold text-[20px] leading-[28px]',
        compact: 'h-8 px-2 text-xs',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  },
);
