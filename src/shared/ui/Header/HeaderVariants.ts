import { cva } from 'class-variance-authority';

export const headerVariants = cva('flex items-center justify-between w-full', {
  variants: {
    variant: {
      default: 'bg-white border-b border-gray-200 shadow-sm',
      minimal: 'bg-white border-b border-gray-100',
      elevated: 'bg-white border-b border-gray-200 shadow-lg',
      transparent: 'bg-transparent border-none shadow-none',
      dark: 'bg-gray-900 border-b border-gray-700 text-white',
    },
    size: {
      sm: 'px-3 py-2',
      md: 'px-4 py-3 lg:px-8',
      lg: 'px-6 py-4 lg:px-12',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
});

// 로고 영역 variants
export const logoVariants = cva('flex items-center gap-3', {
  variants: {
    size: {
      sm: 'gap-2',
      md: 'gap-3',
      lg: 'gap-4',
    },
    variant: {
      default: '',
      minimal: 'gap-2',
      custom: '',
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'default',
  },
});

// 로고 아이콘 variants
export const logoIconVariants = cva('flex items-center justify-center font-bold', {
  variants: {
    size: {
      sm: 'size-6 text-xs',
      md: 'size-8 text-sm',
      lg: 'size-10 text-base',
    },
    variant: {
      default: 'bg-blue-600 text-white rounded-lg',
      minimal: 'bg-gray-100 text-gray-700 rounded-md',
      custom: 'bg-transparent text-current',
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'default',
  },
});

// 로고 텍스트 variants
export const logoTextVariants = cva('font-bold text-gray-900', {
  variants: {
    size: {
      sm: 'text-lg',
      md: 'text-xl',
      lg: 'text-2xl',
    },
    variant: {
      default: 'text-gray-900',
      minimal: 'text-gray-700',
      custom: 'text-current',
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'default',
  },
});

// 사용자 정보 영역 variants
export const userInfoVariants = cva('flex items-center gap-4', {
  variants: {
    display: {
      full: 'flex items-center gap-4',
      avatar: 'flex items-center gap-2',
      hidden: 'hidden',
    },
    position: {
      right: 'ml-auto',
      left: 'mr-auto',
      center: 'mx-auto',
    },
  },
  defaultVariants: {
    display: 'full',
    position: 'right',
  },
});

// 사용자 아바타 variants
export const userAvatarVariants = cva('flex items-center justify-center font-medium rounded-full', {
  variants: {
    size: {
      sm: 'size-6 text-xs',
      md: 'size-8 text-xs',
      lg: 'size-10 text-sm',
    },
    variant: {
      default: 'bg-gray-200 text-gray-600',
      primary: 'bg-blue-100 text-blue-700',
      custom: 'bg-transparent text-current',
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'default',
  },
});

// 사용자 이름 variants
export const userNameVariants = cva('font-medium', {
  variants: {
    size: {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base',
    },
    variant: {
      default: 'text-gray-600',
      primary: 'text-gray-900',
      custom: 'text-current',
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'default',
  },
});

// 액션 버튼 영역 variants
export const actionAreaVariants = cva('flex items-center gap-2', {
  variants: {
    position: {
      right: 'ml-auto',
      left: 'mr-auto',
      center: 'mx-auto',
    },
  },
  defaultVariants: {
    position: 'right',
  },
});
