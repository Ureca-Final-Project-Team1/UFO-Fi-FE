import { cva } from 'class-variance-authority';

export const headerVariants = cva('border-b shadow-sm', {
  variants: {
    variant: {
      default: 'bg-white border-gray-200',
      dark: 'bg-gray-900 border-gray-700 text-white',
      transparent: 'bg-transparent border-transparent',
    },
    size: {
      default: 'px-4 py-3 lg:px-8',
      compact: 'px-3 py-2 lg:px-6',
      large: 'px-6 py-4 lg:px-10',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

export const logoVariants = cva('rounded-lg flex items-center justify-center', {
  variants: {
    variant: {
      default: 'bg-blue-600',
      dark: 'bg-blue-500',
      transparent: 'bg-blue-600',
    },
    size: {
      default: 'w-8 h-8',
      compact: 'w-6 h-6',
      large: 'w-10 h-10',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

export const titleVariants = cva('font-bold', {
  variants: {
    variant: {
      default: 'text-gray-900',
      dark: 'text-white',
      transparent: 'text-gray-900',
    },
    size: {
      default: 'text-xl',
      compact: 'text-lg',
      large: 'text-2xl',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

export const userAvatarVariants = cva('rounded-full flex items-center justify-center', {
  variants: {
    variant: {
      default: 'bg-gray-200',
      dark: 'bg-gray-700',
      transparent: 'bg-gray-200',
    },
    size: {
      default: 'w-8 h-8',
      compact: 'w-6 h-6',
      large: 'w-10 h-10',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

export const userNameVariants = cva('font-medium', {
  variants: {
    variant: {
      default: 'text-gray-600',
      dark: 'text-gray-300',
      transparent: 'text-gray-600',
    },
    size: {
      default: 'text-sm',
      compact: 'text-xs',
      large: 'text-base',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});
