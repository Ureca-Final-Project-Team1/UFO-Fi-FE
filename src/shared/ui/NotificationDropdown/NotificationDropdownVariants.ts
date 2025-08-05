import { cva } from 'class-variance-authority';

export const notificationDropdownVariants = cva(
  'w-80 max-h-[500px] overflow-hidden p-0 shadow-xl border',
  {
    variants: {
      variant: {
        default: 'border-gray-200 bg-white',
        dark: 'border-gray-700 bg-gray-900',
        minimal: 'border-gray-100 bg-white',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export const notificationHeaderVariants = cva('px-4 py-3 border-b backdrop-blur-sm', {
  variants: {
    variant: {
      default: 'border-gray-100 bg-gray-50/80',
      dark: 'border-gray-700 bg-gray-800/80',
      minimal: 'border-gray-100 bg-gray-50/50',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export const notificationTitleVariants = cva('text-sm font-bold flex items-center gap-2', {
  variants: {
    variant: {
      default: 'text-gray-900',
      dark: 'text-white',
      minimal: 'text-gray-900',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export const notificationBadgeVariants = cva('text-xs font-bold px-2 py-0.5 rounded-full', {
  variants: {
    variant: {
      default: 'bg-red-100 text-red-600',
      dark: 'bg-red-900 text-red-300',
      minimal: 'bg-red-50 text-red-600',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export const markAllReadButtonVariants = cva(
  'text-xs font-semibold transition-colors hover:underline',
  {
    variants: {
      variant: {
        default: 'text-blue-600 hover:text-blue-800',
        dark: 'text-blue-400 hover:text-blue-300',
        minimal: 'text-blue-600 hover:text-blue-700',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export const emptyStateContainerVariants = cva('py-12 px-6 text-center', {
  variants: {
    variant: {
      default: '',
      dark: '',
      minimal: '',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export const emptyStateIconVariants = cva(
  'w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4',
  {
    variants: {
      variant: {
        default: 'bg-gray-100',
        dark: 'bg-gray-800',
        minimal: 'bg-gray-50',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export const emptyStateTitleVariants = cva('text-sm font-semibold mb-2', {
  variants: {
    variant: {
      default: 'text-gray-900',
      dark: 'text-white',
      minimal: 'text-gray-900',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export const emptyStateDescriptionVariants = cva('text-xs', {
  variants: {
    variant: {
      default: 'text-gray-500',
      dark: 'text-gray-400',
      minimal: 'text-gray-500',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export const notificationTriggerVariants = cva(
  'relative size-10 rounded-full transition-all duration-200 active:scale-95 flex items-center justify-center focus:outline-none focus:ring-2',
  {
    variants: {
      variant: {
        default: 'hover:bg-white/10 focus:ring-white/30',
        dark: 'hover:bg-gray-800/10 focus:ring-gray-600/30',
        minimal: 'hover:bg-gray-100 focus:ring-gray-300/30',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export const notificationItemVariants = cva(
  'flex items-start gap-3 p-4 w-full cursor-pointer transition-colors border-l-4',
  {
    variants: {
      variant: {
        default: '',
        dark: '',
        minimal: '',
      },
      state: {
        unread: '',
        read: 'border-transparent hover:bg-gray-50',
      },
    },
    compoundVariants: [
      {
        variant: 'default',
        state: 'unread',
        class: 'bg-blue-50/50 border-blue-200 hover:bg-blue-50',
      },
      {
        variant: 'dark',
        state: 'unread',
        class: 'bg-blue-900/20 border-blue-600 hover:bg-blue-900/30',
      },
      {
        variant: 'dark',
        state: 'read',
        class: 'border-transparent hover:bg-gray-800',
      },
      {
        variant: 'minimal',
        state: 'unread',
        class: 'bg-blue-50/30 border-blue-200 hover:bg-blue-50/50',
      },
    ],
    defaultVariants: {
      variant: 'default',
      state: 'read',
    },
  },
);

export const notificationItemIconVariants = cva(
  'flex-shrink-0 size-10 rounded-full flex items-center justify-center relative',
  {
    variants: {
      variant: {
        default: 'bg-blue-50',
        dark: 'bg-blue-900/30',
        minimal: 'bg-blue-50/50',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export const notificationItemTitleVariants = cva('text-sm leading-5', {
  variants: {
    variant: {
      default: '',
      dark: '',
      minimal: '',
    },
    state: {
      unread: '',
      read: 'font-semibold text-gray-700',
    },
  },
  compoundVariants: [
    {
      variant: 'default',
      state: 'unread',
      class: 'font-bold text-gray-900',
    },
    {
      variant: 'dark',
      state: 'unread',
      class: 'font-bold text-white',
    },
    {
      variant: 'dark',
      state: 'read',
      class: 'font-semibold text-gray-300',
    },
    {
      variant: 'minimal',
      state: 'unread',
      class: 'font-bold text-gray-900',
    },
  ],
  defaultVariants: {
    variant: 'default',
    state: 'read',
  },
});

export const notificationItemContentVariants = cva('text-sm leading-5 line-clamp-2', {
  variants: {
    variant: {
      default: '',
      dark: '',
      minimal: '',
    },
    state: {
      unread: '',
      read: 'text-gray-600',
    },
  },
  compoundVariants: [
    {
      variant: 'default',
      state: 'unread',
      class: 'text-gray-800',
    },
    {
      variant: 'dark',
      state: 'unread',
      class: 'text-gray-200',
    },
    {
      variant: 'dark',
      state: 'read',
      class: 'text-gray-400',
    },
    {
      variant: 'minimal',
      state: 'unread',
      class: 'text-gray-800',
    },
  ],
  defaultVariants: {
    variant: 'default',
    state: 'read',
  },
});

export const notificationItemTimeVariants = cva('text-xs ml-3 flex-shrink-0 mt-0.5', {
  variants: {
    variant: {
      default: 'text-gray-500',
      dark: 'text-gray-400',
      minimal: 'text-gray-500',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export const notificationItemBadgeVariants = cva(
  'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium',
  {
    variants: {
      variant: {
        default: 'bg-blue-100 text-blue-800',
        dark: 'bg-blue-900 text-blue-300',
        minimal: 'bg-blue-50 text-blue-700',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);
