import { cva } from 'class-variance-authority';

export const lucideIconVariants = cva('', {
  variants: {
    animation: {
      none: '',
      spin: 'animate-spin',
      pulse: 'animate-pulse',
      bounce: 'animate-bounce',
    },
  },
  defaultVariants: {
    animation: 'none',
  },
});

export const errorMessages = {
  notFound: (name: string) => `Lucide icon "${name}" not found`,
  invalidName: (name: string) => `Invalid icon name: "${name}"`,
};

export const defaultValues = {
  name: 'AlertCircle' as const,
  size: 'md' as const,
  color: 'current' as const,
  className: '',
};
