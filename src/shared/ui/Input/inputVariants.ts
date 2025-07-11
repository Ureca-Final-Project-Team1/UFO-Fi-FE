import { cva } from 'class-variance-authority';

export const inputVariants = cva(
  'flex w-full rounded-md px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'bg-background border border-input text-foreground shadow-sm',
        whiteBorder: 'bg-[#030824] border border-white/20 text-white placeholder-white/60',
        blueFill: 'bg-[#001f9c] text-[#23d8ff] text-center font-semibold',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);
