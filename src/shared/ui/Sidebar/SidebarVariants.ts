import { cva } from 'class-variance-authority';

// 메인 Sidebar 컨테이너 variants
export const sidebarVariants = cva(
  'w-72 h-screen bg-white border-r border-gray-200 flex flex-col',
  {
    variants: {
      variant: {
        default: 'bg-white border-gray-200',
        dark: 'bg-gray-900 border-gray-700',
        light: 'bg-gray-50 border-gray-100',
        elevated: 'bg-white border-gray-200 shadow-lg',
      },
      size: {
        sm: 'w-64',
        md: 'w-72',
        lg: 'w-80',
        xl: 'w-96',
      },
      position: {
        left: 'border-r',
        right: 'border-l',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      position: 'left',
    },
  },
);

// 네비게이션 컨테이너 variants
export const sidebarNavigationVariants = cva('flex-1 px-4 py-6 space-y-2 overflow-y-auto', {
  variants: {
    padding: {
      sm: 'px-3 py-4',
      md: 'px-4 py-6',
      lg: 'px-6 py-8',
    },
    spacing: {
      sm: 'space-y-1',
      md: 'space-y-2',
      lg: 'space-y-3',
    },
  },
  defaultVariants: {
    padding: 'md',
    spacing: 'md',
  },
});

// 메뉴 아이템 variants
export const sidebarMenuItemVariants = cva(
  'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 group',
  {
    variants: {
      variant: {
        default: '',
        minimal: 'px-3 py-2',
        spacious: 'px-6 py-4',
      },
      size: {
        sm: 'text-xs py-2',
        md: 'text-sm py-3',
        lg: 'text-base py-4',
      },
      level: {
        0: '',
        1: 'ml-6 py-2',
        2: 'ml-12 py-2',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      level: 0,
    },
  },
);

// 활성화된 메뉴 아이템 variants
export const sidebarMenuItemActiveVariants = cva(
  'bg-blue-50 text-blue-700 border-l-4 border-blue-700',
  {
    variants: {
      activeVariant: {
        primary: 'bg-blue-50 text-blue-700 border-l-4 border-blue-700',
        secondary: 'bg-gray-50 text-gray-700 border-l-4 border-gray-700',
        accent: 'bg-purple-50 text-purple-700 border-l-4 border-purple-700',
        custom: 'bg-green-50 text-green-700 border-l-4 border-green-700',
      },
    },
    defaultVariants: {
      activeVariant: 'primary',
    },
  },
);

// 비활성화된 메뉴 아이템 variants
export const sidebarMenuItemInactiveVariants = cva(
  'text-gray-700 hover:bg-gray-50 hover:text-gray-900',
  {
    variants: {
      inactiveVariant: {
        default: 'text-gray-700 hover:bg-gray-50 hover:text-gray-900',
        subtle: 'text-gray-600 hover:bg-gray-100 hover:text-gray-800',
        muted: 'text-gray-500 hover:bg-gray-50 hover:text-gray-700',
      },
    },
    defaultVariants: {
      inactiveVariant: 'default',
    },
  },
);

// 메뉴 아이콘 variants
export const sidebarIconVariants = cva('size-5 transition-colors', {
  variants: {
    size: {
      sm: 'size-4',
      md: 'size-5',
      lg: 'size-6',
    },
    activeColor: {
      primary: 'text-blue-700',
      secondary: 'text-gray-700',
      accent: 'text-purple-700',
      custom: 'text-green-700',
    },
    inactiveColor: {
      default: 'text-gray-500 group-hover:text-gray-700',
      subtle: 'text-gray-400 group-hover:text-gray-600',
      muted: 'text-gray-300 group-hover:text-gray-500',
    },
  },
  defaultVariants: {
    size: 'md',
    activeColor: 'primary',
    inactiveColor: 'default',
  },
});

// 하위 메뉴 컨테이너 variants
export const sidebarSubmenuVariants = cva(
  'overflow-hidden transition-all duration-300 ease-in-out',
  {
    variants: {
      isOpen: {
        true: 'max-h-96 opacity-100',
        false: 'max-h-0 opacity-0',
      },
      animation: {
        smooth: 'transition-all duration-300 ease-in-out',
        fast: 'transition-all duration-200 ease-out',
        slow: 'transition-all duration-500 ease-in-out',
      },
    },
    defaultVariants: {
      isOpen: false,
      animation: 'smooth',
    },
  },
);

// 하위 메뉴 아이템 컨테이너 variants
export const sidebarSubmenuItemsVariants = cva('mt-1 space-y-1', {
  variants: {
    spacing: {
      sm: 'space-y-0.5',
      md: 'space-y-1',
      lg: 'space-y-2',
    },
  },
  defaultVariants: {
    spacing: 'md',
  },
});

// 화살표 아이콘 variants
export const sidebarChevronVariants = cva('size-4 transition-all duration-200', {
  variants: {
    size: {
      sm: 'size-3',
      md: 'size-4',
      lg: 'size-5',
    },
    activeColor: {
      primary: 'text-blue-700',
      secondary: 'text-gray-700',
      accent: 'text-purple-700',
      custom: 'text-green-700',
    },
    inactiveColor: {
      default: 'text-gray-400 group-hover:text-gray-600',
      subtle: 'text-gray-300 group-hover:text-gray-500',
      muted: 'text-gray-200 group-hover:text-gray-400',
    },
  },
  defaultVariants: {
    size: 'md',
    activeColor: 'primary',
    inactiveColor: 'default',
  },
});
