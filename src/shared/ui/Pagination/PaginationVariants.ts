import { cva } from 'class-variance-authority';

// 메인 Pagination 컨테이너 variants - 기존 디자인 유지
export const paginationVariants = cva('flex items-center justify-center gap-2 select-none', {
  variants: {
    variant: {
      default: '',
      minimal: 'gap-1',
      elevated: 'bg-white shadow-lg rounded-lg p-2',
      compact: 'gap-1',
      outlined: 'border border-gray-200 rounded-lg p-2',
    },
    size: {
      sm: 'gap-1',
      md: 'gap-2',
      lg: 'gap-3',
    },
    alignment: {
      left: 'justify-start',
      center: 'justify-center',
      right: 'justify-end',
    },
    layout: {
      horizontal: 'flex-row',
      vertical: 'flex-col gap-1',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
    alignment: 'center',
    layout: 'horizontal',
  },
});

// 네비게이션 버튼 variants - 기존 디자인 그대로 유지
export const paginationNavigationVariants = cva(
  'flex items-center justify-center rounded-lg border border-gray-200 transition-all duration-200 ease-in-out',
  {
    variants: {
      variant: {
        default: '',
        minimal: 'border-transparent',
        outlined: 'border-gray-300',
        filled: 'bg-gray-100 border-gray-200',
        ghost: 'border-transparent hover:bg-gray-100',
      },
      size: {
        sm: 'size-8',
        md: 'size-10',
        lg: 'size-12',
      },
      iconSize: {
        sm: '[&>svg]:size-3',
        md: '[&>svg]:size-4',
        lg: '[&>svg]:size-5',
      },
      disabledVariant: {
        muted: 'opacity-30 cursor-not-allowed bg-gray-50 text-gray-400',
        hidden: 'hidden',
        disabled: 'opacity-50 cursor-not-allowed bg-gray-100 text-gray-400',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      iconSize: 'md',
      disabledVariant: 'muted',
    },
  },
);

// 활성화된 네비게이션 버튼 variants - 기존 hover 스타일 유지
export const paginationNavigationActiveVariants = cva(
  'hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 active:scale-95',
  {
    variants: {
      hoverVariant: {
        subtle: 'hover:bg-gray-50 hover:border-gray-300',
        elevated: 'hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600',
        colored: 'hover:bg-blue-100 hover:border-blue-400 hover:text-blue-700',
      },
    },
    defaultVariants: {
      hoverVariant: 'elevated',
    },
  },
);

// 페이지 번호 버튼 variants - 기존 디자인 그대로 유지
export const paginationButtonVariants = cva(
  'flex items-center justify-center rounded-lg border font-medium transition-all duration-200 ease-in-out',
  {
    variants: {
      variant: {
        default: '',
        minimal: 'border-transparent',
        outlined: 'border-gray-300',
        filled: 'bg-gray-100 border-gray-200',
        ghost: 'border-transparent hover:bg-gray-100',
      },
      size: {
        sm: 'size-8 text-sm',
        md: 'size-10 text-base',
        lg: 'size-12 text-lg',
      },
      activeVariant: {
        primary: 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-200',
        secondary: 'bg-gray-600 border-gray-600 text-white shadow-lg shadow-gray-200',
        accent: 'bg-purple-600 border-purple-600 text-white shadow-lg shadow-purple-200',
        custom: 'bg-green-600 border-green-600 text-white shadow-lg shadow-green-200',
      },
      hoverVariant: {
        subtle: 'hover:bg-gray-50 hover:border-gray-300',
        elevated: 'hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600',
        colored: 'hover:bg-blue-100 hover:border-blue-400 hover:text-blue-700',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      activeVariant: 'primary',
      hoverVariant: 'elevated',
    },
  },
);

// 비활성화된 페이지 번호 버튼 variants - 기존 디자인 유지
export const paginationButtonInactiveVariants = cva('border-gray-200 text-gray-700', {
  variants: {
    inactiveVariant: {
      default: 'border-gray-200 text-gray-700',
      muted: 'border-gray-100 text-gray-500',
      subtle: 'border-gray-300 text-gray-600',
    },
  },
  defaultVariants: {
    inactiveVariant: 'default',
  },
});

// 생략 부호 variants - 기존 디자인 유지
export const paginationDotsVariants = cva('flex items-center justify-center font-medium', {
  variants: {
    variant: {
      default: 'text-gray-400',
      minimal: 'text-gray-300',
      animated: 'text-gray-400 animate-pulse',
      custom: 'text-blue-400',
    },
    size: {
      sm: 'size-8 text-sm',
      md: 'size-10 text-base',
      lg: 'size-12 text-lg',
    },
    color: {
      default: 'text-gray-400',
      muted: 'text-gray-300',
      primary: 'text-blue-400',
      custom: 'text-purple-400',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
    color: 'default',
  },
});

// 페이지 번호 컨테이너 variants - 기존 gap 유지
export const paginationNumbersVariants = cva('flex items-center', {
  variants: {
    gap: {
      sm: 'gap-0.5',
      md: 'gap-1',
      lg: 'gap-2',
    },
    layout: {
      horizontal: 'flex-row',
      vertical: 'flex-col',
    },
  },
  defaultVariants: {
    gap: 'md',
    layout: 'horizontal',
  },
});

// 네비게이션 버튼 컨테이너 variants
export const paginationNavigationContainerVariants = cva('flex items-center', {
  variants: {
    gap: {
      sm: 'gap-1',
      md: 'gap-2',
      lg: 'gap-3',
    },
    showFirstLast: {
      true: '',
      false: '',
    },
  },
  defaultVariants: {
    gap: 'md',
    showFirstLast: true,
  },
});
