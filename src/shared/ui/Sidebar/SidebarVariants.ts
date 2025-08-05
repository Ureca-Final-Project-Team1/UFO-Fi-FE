import { cva } from 'class-variance-authority';

export const sidebarVariants = cva('h-screen flex flex-col', {
  variants: {
    variant: {
      default: 'bg-white border-r border-gray-200',
      dark: 'bg-gray-900 border-r border-gray-700',
      minimal: 'bg-gray-50 border-r border-gray-200',
    },
    size: {
      default: 'w-72',
      compact: 'w-64',
      large: 'w-80',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

export const sidebarNavVariants = cva('flex-1 overflow-y-auto', {
  variants: {
    variant: {
      default: 'px-4 py-6 space-y-2',
      dark: 'px-4 py-6 space-y-2',
      minimal: 'px-3 py-4 space-y-1',
    },
    size: {
      default: '',
      compact: 'px-3 py-4',
      large: 'px-6 py-8 space-y-3',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

export const menuItemContainerVariants = cva('', {
  variants: {
    level: {
      0: 'mb-1',
      1: '',
      2: '',
    },
  },
  defaultVariants: {
    level: 0,
  },
});

export const menuItemVariants = cva(
  'flex items-center gap-3 rounded-lg text-sm font-medium transition-all duration-200 group',
  {
    variants: {
      variant: {
        default: '',
        dark: '',
        minimal: '',
      },
      size: {
        default: 'px-4 py-3',
        compact: 'px-3 py-2',
        large: 'px-6 py-4',
      },
      level: {
        0: '',
        1: 'ml-6 py-2',
        2: 'ml-12 py-2',
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
        class: 'bg-blue-50 text-blue-700 border-l-4 border-blue-700',
      },
      {
        variant: 'default',
        state: 'inactive',
        class: 'text-gray-700 hover:bg-gray-50 hover:text-gray-900',
      },
      {
        variant: 'dark',
        state: 'active',
        class: 'bg-blue-900/20 text-blue-400 border-l-4 border-blue-400',
      },
      {
        variant: 'dark',
        state: 'inactive',
        class: 'text-gray-300 hover:bg-gray-800 hover:text-white',
      },
      {
        variant: 'minimal',
        state: 'active',
        class: 'bg-gray-100 text-gray-900 border-l-4 border-gray-900',
      },
      {
        variant: 'minimal',
        state: 'inactive',
        class: 'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
      },
    ],
    defaultVariants: {
      variant: 'default',
      size: 'default',
      level: 0,
      state: 'inactive',
    },
  },
);

export const menuItemIconVariants = cva('transition-colors', {
  variants: {
    variant: {
      default: '',
      dark: '',
      minimal: '',
    },
    size: {
      default: 'size-5',
      compact: 'size-4',
      large: 'size-6',
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
      class: 'text-blue-700',
    },
    {
      variant: 'default',
      state: 'inactive',
      class: 'text-gray-500 group-hover:text-gray-700',
    },
    {
      variant: 'dark',
      state: 'active',
      class: 'text-blue-400',
    },
    {
      variant: 'dark',
      state: 'inactive',
      class: 'text-gray-400 group-hover:text-gray-300',
    },
    {
      variant: 'minimal',
      state: 'active',
      class: 'text-gray-900',
    },
    {
      variant: 'minimal',
      state: 'inactive',
      class: 'text-gray-500 group-hover:text-gray-700',
    },
  ],
  defaultVariants: {
    variant: 'default',
    size: 'default',
    state: 'inactive',
  },
});

export const chevronIconVariants = cva('transition-all duration-200', {
  variants: {
    variant: {
      default: '',
      dark: '',
      minimal: '',
    },
    size: {
      default: 'size-4',
      compact: 'size-3',
      large: 'size-5',
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
      class: 'text-blue-700',
    },
    {
      variant: 'default',
      state: 'inactive',
      class: 'text-gray-400 group-hover:text-gray-600',
    },
    {
      variant: 'dark',
      state: 'active',
      class: 'text-blue-400',
    },
    {
      variant: 'dark',
      state: 'inactive',
      class: 'text-gray-500 group-hover:text-gray-400',
    },
    {
      variant: 'minimal',
      state: 'active',
      class: 'text-gray-900',
    },
    {
      variant: 'minimal',
      state: 'inactive',
      class: 'text-gray-400 group-hover:text-gray-600',
    },
  ],
  defaultVariants: {
    variant: 'default',
    size: 'default',
    state: 'inactive',
  },
});

export const submenuContainerVariants = cva(
  'overflow-hidden transition-all duration-300 ease-in-out',
  {
    variants: {
      isOpen: {
        true: 'max-h-96 opacity-100',
        false: 'max-h-0 opacity-0',
      },
    },
    defaultVariants: {
      isOpen: false,
    },
  },
);

export const submenuItemsContainerVariants = cva('', {
  variants: {
    variant: {
      default: 'mt-1 space-y-1',
      dark: 'mt-1 space-y-1',
      minimal: 'mt-1 space-y-0.5',
    },
    size: {
      default: '',
      compact: 'mt-0.5 space-y-0.5',
      large: 'mt-2 space-y-2',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});
