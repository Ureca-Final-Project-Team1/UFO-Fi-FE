import { cva } from 'class-variance-authority';

export const avatarVariants = cva('rounded-full flex items-center justify-center relative', {
  variants: {
    size: {
      xs: 'size-6 text-xs',
      sm: 'size-8 text-sm',
      md: 'size-12 text-base',
      lg: 'size-16 text-lg',
      xl: 'size-20 text-xl',
      '2xl': 'size-24 text-2xl',
    },
    variant: {
      default: 'bg-gray-200',
      primary: 'bg-blue-500 text-white',
      secondary: 'bg-gray-100 border border-gray-300',
      success: 'bg-green-500 text-white',
      warning: 'bg-yellow-500 text-white',
      error: 'bg-red-500 text-white',
      outline: 'border-2 border-gray-300 bg-transparent',
      selling:
        'bg-gradient-to-br from-purple-400/30 to-indigo-500/30 border border-purple-300/30 backdrop-blur-sm',
    },
    ring: {
      none: '',
      default: 'ring-2 ring-blue-500 ring-offset-2',
      success: 'ring-2 ring-green-500 ring-offset-2',
      warning: 'ring-2 ring-yellow-500 ring-offset-2',
      error: 'ring-2 ring-red-500 ring-offset-2',
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'default',
    ring: 'none',
  },
});
