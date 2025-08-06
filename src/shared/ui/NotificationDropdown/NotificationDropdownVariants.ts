import { cva } from 'class-variance-authority';

// NotificationDropdown 컨테이너 variants
export const notificationDropdownVariants = cva('relative', {
  variants: {
    variant: {
      default: '',
      minimal: '',
      elevated: '',
      transparent: '',
    },
    size: {
      sm: '',
      md: '',
      lg: '',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
});

// NotificationTrigger variants
export const notificationTriggerVariants = cva(
  'relative transition-all duration-200 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-white/30',
  {
    variants: {
      variant: {
        default: 'rounded-full hover:bg-white/10 active:scale-95',
        minimal: 'rounded-md hover:bg-gray-100 active:scale-95',
        outlined: 'rounded-full border border-gray-300 hover:bg-gray-50 active:scale-95',
        filled: 'rounded-full bg-blue-600 hover:bg-blue-700 active:scale-95',
      },
      size: {
        sm: 'size-8',
        md: 'size-10',
        lg: 'size-12',
      },
      badgePosition: {
        'top-right': '',
        'top-left': '',
        'bottom-right': '',
        'bottom-left': '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      badgePosition: 'top-right',
    },
  },
);

// NotificationTrigger Badge variants
export const notificationBadgeVariants = cva('absolute', {
  variants: {
    variant: {
      dot: 'animate-pulse',
      count: 'animate-bounce',
      pulse: 'animate-pulse',
    },
    position: {
      'top-right': '-top-0.5 -right-0.5',
      'top-left': '-top-0.5 -left-0.5',
      'bottom-right': '-bottom-0.5 -right-0.5',
      'bottom-left': '-bottom-0.5 -left-0.5',
    },
  },
  defaultVariants: {
    variant: 'dot',
    position: 'top-right',
  },
});

// NotificationItem variants
export const notificationItemVariants = cva(
  'flex items-start gap-3 w-full cursor-pointer transition-colors border-l-4',
  {
    variants: {
      variant: {
        default: '',
        minimal: 'border-l-2',
        card: 'rounded-lg border-l-0 border shadow-sm',
        compact: 'gap-2',
      },
      size: {
        sm: 'p-3',
        md: 'p-4',
        lg: 'p-5',
      },
      layout: {
        horizontal: 'flex-row',
        vertical: 'flex-col',
      },
      unreadStyle: {
        border: 'border-blue-200',
        background: 'bg-blue-50/50',
        badge: '',
        text: '',
      },
      isUnread: {
        true: '',
        false: 'border-transparent hover:bg-gray-50',
      },
    },
    compoundVariants: [
      // isUnread + unreadStyle 조합
      {
        isUnread: true,
        unreadStyle: 'background',
        class: 'bg-blue-50/50',
      },
      {
        isUnread: true,
        unreadStyle: 'border',
        class: 'border-blue-200',
      },
    ],
    defaultVariants: {
      variant: 'default',
      size: 'md',
      layout: 'horizontal',
      unreadStyle: 'border',
      isUnread: false,
    },
  },
);

// NotificationItem Icon variants
export const notificationItemIconVariants = cva(
  'flex-shrink-0 rounded-full flex items-center justify-center relative',
  {
    variants: {
      size: {
        sm: 'size-8',
        md: 'size-10',
        lg: 'size-12',
      },
      variant: {
        default: 'bg-blue-50',
        minimal: 'bg-gray-50',
        colored: 'bg-blue-100',
        custom: 'bg-transparent',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'default',
    },
  },
);

// NotificationItem Content variants
export const notificationItemContentVariants = cva('flex-1 min-w-0', {
  variants: {
    layout: {
      horizontal: '',
      vertical: 'text-center',
    },
  },
  defaultVariants: {
    layout: 'horizontal',
  },
});

// NotificationItem Title variants
export const notificationItemTitleVariants = cva('leading-5', {
  variants: {
    size: {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base',
    },
    unread: {
      true: 'font-bold text-gray-900',
      false: 'font-semibold text-gray-700',
    },
  },
  defaultVariants: {
    size: 'md',
    unread: false,
  },
});

// NotificationItem Description variants
export const notificationItemDescriptionVariants = cva('leading-5 line-clamp-2', {
  variants: {
    size: {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base',
    },
    unread: {
      true: 'text-gray-800',
      false: 'text-gray-600',
    },
  },
  defaultVariants: {
    size: 'md',
    unread: false,
  },
});

// NotificationItem Time variants
export const notificationItemTimeVariants = cva('flex-shrink-0 ml-3 flex-shrink-0 mt-0.5', {
  variants: {
    size: {
      sm: 'text-xs',
      md: 'text-xs',
      lg: 'text-sm',
    },
    variant: {
      default: 'text-gray-500',
      muted: 'text-gray-400',
      primary: 'text-blue-500',
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'default',
  },
});

// NotificationItem Unread Badge variants
export const notificationItemUnreadBadgeVariants = cva(
  'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium',
  {
    variants: {
      variant: {
        default: 'bg-blue-100 text-blue-800',
        primary: 'bg-blue-500 text-white',
        minimal: 'bg-gray-100 text-gray-600',
        custom: 'bg-transparent text-current',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

// NotificationItem Text Indicator variants
export const notificationItemTextIndicatorVariants = cva('inline-block ml-1 rounded-full', {
  variants: {
    size: {
      sm: 'size-1.5',
      md: 'size-2',
      lg: 'size-2.5',
    },
    variant: {
      default: 'bg-blue-500',
      primary: 'bg-blue-600',
      secondary: 'bg-gray-500',
      custom: 'bg-current',
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'default',
  },
});

// NotificationHeader variants
export const notificationHeaderVariants = cva('px-4 py-3 border-b', {
  variants: {
    variant: {
      default: 'border-gray-100 bg-gray-50/80 backdrop-blur-sm',
      minimal: 'border-gray-200 bg-white',
      elevated: 'border-gray-200 bg-gray-50 shadow-sm',
      transparent: 'border-transparent bg-transparent',
    },
    size: {
      sm: 'px-3 py-2',
      md: 'px-4 py-3',
      lg: 'px-5 py-4',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
});

// NotificationHeader Title variants
export const notificationHeaderTitleVariants = cva('font-bold flex items-center gap-2', {
  variants: {
    size: {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base',
    },
    variant: {
      default: 'text-gray-900',
      primary: 'text-blue-900',
      muted: 'text-gray-700',
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'default',
  },
});

// NotificationHeader Badge variants
export const notificationHeaderBadgeVariants = cva('text-xs font-bold px-2 py-0.5 rounded-full', {
  variants: {
    variant: {
      default: 'bg-red-100 text-red-600',
      primary: 'bg-blue-100 text-blue-600',
      warning: 'bg-yellow-100 text-yellow-600',
      success: 'bg-green-100 text-green-600',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

// NotificationHeader Mark All Read Button variants
export const notificationHeaderMarkAllReadVariants = cva(
  'text-xs font-semibold transition-colors hover:underline',
  {
    variants: {
      variant: {
        default: 'text-blue-600 hover:text-blue-800',
        primary: 'text-blue-500 hover:text-blue-700',
        secondary: 'text-gray-600 hover:text-gray-800',
        custom: 'text-current hover:opacity-80',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

// NotificationEmpty variants
export const notificationEmptyVariants = cva('py-12 px-6 text-center', {
  variants: {
    variant: {
      default: '',
      minimal: 'py-8 px-4',
      illustrated: 'py-16 px-8',
    },
    size: {
      sm: '',
      md: '',
      lg: '',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
});

// NotificationEmpty Icon variants
export const notificationEmptyIconVariants = cva(
  'bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4',
  {
    variants: {
      size: {
        sm: 'w-12 h-12',
        md: 'w-16 h-16',
        lg: 'w-20 h-20',
      },
      variant: {
        default: 'bg-gray-100',
        primary: 'bg-blue-100',
        minimal: 'bg-transparent',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'default',
    },
  },
);

// NotificationEmpty Title variants
export const notificationEmptyTitleVariants = cva('font-semibold mb-2', {
  variants: {
    size: {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base',
    },
    variant: {
      default: 'text-gray-900',
      primary: 'text-blue-900',
      muted: 'text-gray-700',
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'default',
  },
});

// NotificationEmpty Description variants
export const notificationEmptyDescriptionVariants = cva('', {
  variants: {
    size: {
      sm: 'text-xs',
      md: 'text-xs',
      lg: 'text-sm',
    },
    variant: {
      default: 'text-gray-500',
      muted: 'text-gray-400',
      primary: 'text-blue-500',
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'default',
  },
});

// NotificationList variants
export const notificationListVariants = cva('overflow-y-auto overscroll-contain', {
  variants: {
    maxHeight: {
      sm: 'max-h-64',
      md: 'max-h-96',
      lg: 'max-h-[500px]',
      xl: 'max-h-[600px]',
      none: 'max-h-none',
    },
  },
  defaultVariants: {
    maxHeight: 'md',
  },
});

// NotificationDropdown Content variants
export const notificationDropdownContentVariants = cva(
  'overflow-hidden p-0 shadow-xl border border-gray-200 bg-white',
  {
    variants: {
      size: {
        sm: 'w-64',
        md: 'w-80',
        lg: 'w-96',
        xl: 'w-[500px]',
      },
      variant: {
        default: 'shadow-xl border border-gray-200 bg-white',
        minimal: 'shadow-lg border border-gray-100 bg-white',
        elevated: 'shadow-2xl border border-gray-300 bg-white',
        transparent: 'shadow-none border-none bg-transparent',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'default',
    },
  },
);
