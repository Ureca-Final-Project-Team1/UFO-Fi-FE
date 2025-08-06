import { cva } from 'class-variance-authority';

// Toaster 컨테이너 variants
export const toasterVariants = cva('toaster group', {
  variants: {
    theme: {
      default: '',
      light: 'light',
      dark: 'dark',
      auto: 'auto',
    },
    position: {
      'top-left': '',
      'top-center': '',
      'top-right': '',
      'bottom-left': '',
      'bottom-center': '',
      'bottom-right': '',
    },
    expand: {
      true: '',
      false: '',
    },
    richColors: {
      true: '',
      false: '',
    },
    closeButton: {
      true: '',
      false: '',
    },
  },
  defaultVariants: {
    theme: 'default',
    position: 'bottom-center',
    expand: true,
    richColors: true,
    closeButton: true,
  },
});

// Toaster 스타일 variants
export const toasterStyleVariants = cva('', {
  variants: {
    theme: {
      default: {
        '--normal-bg': 'var(--popover)',
        '--normal-text': 'var(--popover-foreground)',
        '--normal-border': 'var(--border)',
      },
      light: {
        '--normal-bg': 'hsl(0 0% 100%)',
        '--normal-text': 'hsl(240 10% 3.9%)',
        '--normal-border': 'hsl(240 5.9% 90%)',
      },
      dark: {
        '--normal-bg': 'hsl(240 10% 3.9%)',
        '--normal-text': 'hsl(0 0% 98%)',
        '--normal-border': 'hsl(240 3.7% 15.9%)',
      },
      custom: {
        '--normal-bg': 'var(--custom-popover)',
        '--normal-text': 'var(--custom-popover-foreground)',
        '--normal-border': 'var(--custom-border)',
      },
    },
    variant: {
      default: {},
      success: {
        '--success-bg': 'hsl(142 76% 36%)',
        '--success-text': 'hsl(0 0% 98%)',
        '--success-border': 'hsl(142 76% 36%)',
      },
      error: {
        '--error-bg': 'hsl(0 84% 60%)',
        '--error-text': 'hsl(0 0% 98%)',
        '--error-border': 'hsl(0 84% 60%)',
      },
      warning: {
        '--warning-bg': 'hsl(48 96% 53%)',
        '--warning-text': 'hsl(0 0% 98%)',
        '--warning-border': 'hsl(48 96% 53%)',
      },
      info: {
        '--info-bg': 'hsl(199 89% 48%)',
        '--info-text': 'hsl(0 0% 98%)',
        '--info-border': 'hsl(199 89% 48%)',
      },
    },
  },
  defaultVariants: {
    theme: 'default',
    variant: 'default',
  },
});

// Toast 메시지 variants
export const toastVariants = cva('toast', {
  variants: {
    type: {
      default: '',
      success: 'success',
      error: 'error',
      warning: 'warning',
      info: 'info',
      loading: 'loading',
    },
    size: {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
    },
    duration: {
      short: 'duration-2000',
      medium: 'duration-4000',
      long: 'duration-6000',
      persistent: 'duration-0',
    },
  },
  defaultVariants: {
    type: 'default',
    size: 'md',
    duration: 'medium',
  },
});

// Toast 액션 버튼 variants
export const toastActionVariants = cva('toast-action', {
  variants: {
    variant: {
      default: 'bg-primary text-primary-foreground hover:bg-primary/90',
      secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
      destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
      outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
      ghost: 'hover:bg-accent hover:text-accent-foreground',
    },
    size: {
      sm: 'h-8 px-2 text-xs',
      md: 'h-9 px-3 text-sm',
      lg: 'h-10 px-4 text-base',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
});

// Toast 닫기 버튼 variants
export const toastCloseVariants = cva('toast-close', {
  variants: {
    variant: {
      default: 'hover:bg-accent hover:text-accent-foreground',
      ghost: 'hover:bg-transparent',
      subtle: 'hover:bg-muted/50',
    },
    size: {
      sm: 'h-6 w-6',
      md: 'h-8 w-8',
      lg: 'h-10 w-10',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
});

// Toast 아이콘 variants
export const toastIconVariants = cva('toast-icon', {
  variants: {
    type: {
      default: 'text-foreground',
      success: 'text-green-500',
      error: 'text-red-500',
      warning: 'text-yellow-500',
      info: 'text-blue-500',
      loading: 'text-blue-500 animate-spin',
    },
    size: {
      sm: 'h-4 w-4',
      md: 'h-5 w-5',
      lg: 'h-6 w-6',
    },
  },
  defaultVariants: {
    type: 'default',
    size: 'md',
  },
});
