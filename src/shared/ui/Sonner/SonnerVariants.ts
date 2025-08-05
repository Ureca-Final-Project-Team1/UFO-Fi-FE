import { cva } from 'class-variance-authority';

export const sonnerVariants = cva('toaster group', {
  variants: {
    variant: {
      default: '',
      dark: '',
      minimal: '',
    },
    position: {
      'top-left': '',
      'top-center': '',
      'top-right': '',
      'bottom-left': '',
      'bottom-center': '',
      'bottom-right': '',
    },
  },
  defaultVariants: {
    variant: 'default',
    position: 'bottom-center',
  },
});

export const sonnerStyleVariants = {
  default: {
    '--normal-bg': 'var(--popover)',
    '--normal-text': 'var(--popover-foreground)',
    '--normal-border': 'var(--border)',
  },
  dark: {
    '--normal-bg': 'hsl(var(--background))',
    '--normal-text': 'hsl(var(--foreground))',
    '--normal-border': 'hsl(var(--border))',
  },
  minimal: {
    '--normal-bg': 'hsl(var(--card))',
    '--normal-text': 'hsl(var(--card-foreground))',
    '--normal-border': 'hsl(var(--border))',
  },
} as const;

export const sonnerConfigVariants = {
  default: {
    expand: true,
    richColors: true,
    closeButton: true,
  },
  compact: {
    expand: false,
    richColors: false,
    closeButton: true,
  },
  minimal: {
    expand: false,
    richColors: false,
    closeButton: false,
  },
} as const;
