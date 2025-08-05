import { cva } from 'class-variance-authority';

export const paginationVariants = cva('flex items-center justify-center gap-2 select-none', {
  variants: {
    variant: {
      default: '',
      dark: '',
      minimal: '',
    },
    size: {
      default: 'gap-2',
      compact: 'gap-1',
      large: 'gap-3',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

export const paginationButtonVariants = cva(
  'flex items-center justify-center rounded-lg border transition-all duration-200 ease-in-out',
  {
    variants: {
      variant: {
        default: 'border-gray-200',
        dark: 'border-gray-600',
        minimal: 'border-gray-200',
      },
      size: {
        default: 'size-10',
        compact: 'size-8',
        large: 'size-12',
      },
      state: {
        enabled: '',
        disabled: '',
      },
    },
    compoundVariants: [
      {
        variant: 'default',
        state: 'enabled',
        class: 'hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 active:scale-95',
      },
      {
        variant: 'default',
        state: 'disabled',
        class: 'opacity-30 cursor-not-allowed bg-gray-50 text-gray-400',
      },
      {
        variant: 'dark',
        state: 'enabled',
        class: 'hover:bg-gray-700 hover:border-gray-500 hover:text-white active:scale-95',
      },
      {
        variant: 'dark',
        state: 'disabled',
        class: 'opacity-30 cursor-not-allowed bg-gray-800 text-gray-500',
      },
      {
        variant: 'minimal',
        state: 'enabled',
        class: 'hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 active:scale-95',
      },
      {
        variant: 'minimal',
        state: 'disabled',
        class: 'opacity-30 cursor-not-allowed bg-gray-50 text-gray-400',
      },
    ],
    defaultVariants: {
      variant: 'default',
      size: 'default',
      state: 'enabled',
    },
  },
);

export const pageNumberVariants = cva(
  'flex items-center justify-center rounded-lg border font-medium transition-all duration-200 ease-in-out',
  {
    variants: {
      variant: {
        default: '',
        dark: '',
        minimal: '',
      },
      size: {
        default: 'size-10',
        compact: 'size-8',
        large: 'size-12',
      },
      state: {
        active: '',
        inactive: '',
      },
    },
    compoundVariants: [
      {
        variant: 'default',
        state: 'active',
        class: 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-200',
      },
      {
        variant: 'default',
        state: 'inactive',
        class:
          'border-gray-200 text-gray-700 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 active:scale-95',
      },
      {
        variant: 'dark',
        state: 'active',
        class: 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-900',
      },
      {
        variant: 'dark',
        state: 'inactive',
        class:
          'border-gray-600 text-gray-300 hover:bg-gray-700 hover:border-gray-500 hover:text-white active:scale-95',
      },
      {
        variant: 'minimal',
        state: 'active',
        class: 'bg-gray-900 border-gray-900 text-white shadow-lg shadow-gray-200',
      },
      {
        variant: 'minimal',
        state: 'inactive',
        class:
          'border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-900 active:scale-95',
      },
    ],
    defaultVariants: {
      variant: 'default',
      size: 'default',
      state: 'inactive',
    },
  },
);

export const paginationDotsVariants = cva('flex items-center justify-center font-medium', {
  variants: {
    variant: {
      default: 'text-gray-400',
      dark: 'text-gray-500',
      minimal: 'text-gray-400',
    },
    size: {
      default: 'size-10',
      compact: 'size-8',
      large: 'size-12',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

export const paginationContainerVariants = cva('flex items-center', {
  variants: {
    variant: {
      default: '',
      dark: '',
      minimal: '',
    },
    size: {
      default: 'gap-1',
      compact: 'gap-0.5',
      large: 'gap-2',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});
