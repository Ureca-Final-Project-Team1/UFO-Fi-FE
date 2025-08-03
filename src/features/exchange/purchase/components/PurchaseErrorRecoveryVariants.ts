import { cva } from 'class-variance-authority';

export const overlayVariants = cva(
  'fixed inset-0 backdrop-blur-sm z-50 flex items-center justify-center p-4',
  {
    variants: {
      variant: {
        default: 'bg-black/80',
        light: 'bg-black/40',
        dark: 'bg-black/90',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

// 모달 variants
export const modalVariants = cva('rounded-2xl p-8 max-w-sm w-full mx-4 relative', {
  variants: {
    variant: {
      default: 'bg-gray-800',
      light: 'bg-white',
      dark: 'bg-gray-900',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

// 아이콘 컨테이너 variants
export const iconContainerVariants = cva('text-center mb-6');

// 아이콘 variants
export const iconVariants = cva('mb-4', {
  variants: {
    size: {
      sm: 'text-3xl',
      md: 'text-5xl',
      lg: 'text-7xl',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

// 제목 variants
export const titleVariants = cva('font-bold mb-2', {
  variants: {
    size: {
      sm: 'text-lg',
      md: 'text-xl',
      lg: 'text-2xl',
    },
    color: {
      default: 'text-white',
      light: 'text-gray-900',
      dark: 'text-white',
    },
  },
  defaultVariants: {
    size: 'md',
    color: 'default',
  },
});

// 메시지 variants
export const messageVariants = cva('text-sm leading-relaxed whitespace-pre-line', {
  variants: {
    color: {
      default: 'text-gray-300',
      light: 'text-gray-600',
      dark: 'text-gray-400',
    },
  },
  defaultVariants: {
    color: 'default',
  },
});

// 에러 상세 정보 variants
export const errorDetailVariants = cva('border rounded-lg p-3 mb-6');

// 에러 상세 텍스트 variants
export const errorDetailTextVariants = cva('text-xs text-center', {
  variants: {
    color: {
      default: 'text-gray-400',
      light: 'text-gray-500',
      dark: 'text-gray-300',
    },
  },
  defaultVariants: {
    color: 'default',
  },
});

// 재시도 경고 variants
export const retryWarningVariants = cva('border rounded-lg p-4 mb-6', {
  variants: {
    variant: {
      default: 'bg-red-900/20 border-red-500/30',
      light: 'bg-red-50 border-red-200',
      dark: 'bg-red-900/30 border-red-600/40',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

// 재시도 경고 텍스트 variants
export const retryWarningTextVariants = cva('text-sm text-center', {
  variants: {
    color: {
      default: 'text-red-300',
      light: 'text-red-600',
      dark: 'text-red-400',
    },
  },
  defaultVariants: {
    color: 'default',
  },
});

// 액션 컨테이너 variants
export const actionContainerVariants = cva('space-y-3');

// 주요 버튼 variants
export const primaryButtonVariants = cva('font-semibold', {
  variants: {
    size: {
      sm: 'py-2 text-sm',
      md: 'py-3 text-base',
      lg: 'py-4 text-lg',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

// 보조 버튼 컨테이너 variants
export const secondaryButtonContainerVariants = cva('flex gap-3');

// 보조 버튼 variants
export const secondaryButtonVariants = cva('flex-1', {
  variants: {
    size: {
      sm: 'py-1 text-xs',
      md: 'py-2 text-sm',
      lg: 'py-3 text-base',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

// 푸터 variants
export const footerVariants = cva('mt-4 text-center');

// 푸터 텍스트 variants
export const footerTextVariants = cva('text-xs', {
  variants: {
    color: {
      default: 'text-gray-500',
      light: 'text-gray-400',
      dark: 'text-gray-600',
    },
  },
  defaultVariants: {
    color: 'default',
  },
});
