import { cva } from 'class-variance-authority';

// 드롭다운 컨텐츠 variants
export const dropdownContentVariants = cva('', {
  variants: {
    variant: {
      default: 'w-80 max-h-96 overflow-hidden bg-white rounded-lg shadow-lg border border-gray-200',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

// 헤더 variants
export const headerVariants = cva('', {
  variants: {
    variant: {
      default: 'px-4 py-3 border-b border-gray-100',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

// 헤더 제목 variants
export const headerTitleVariants = cva('', {
  variants: {
    variant: {
      default: 'text-sm font-semibold text-gray-900 flex items-center gap-2',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

// 헤더 배지 variants
export const headerBadgeVariants = cva('', {
  variants: {
    variant: {
      default: 'ml-1 px-1.5 py-0.5 text-xs font-medium bg-red-500 text-white rounded-full',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

// 전체 읽음 버튼 variants
export const markAllButtonVariants = cva('', {
  variants: {
    variant: {
      default: 'text-xs text-blue-600 hover:text-blue-700 font-medium',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

// 컨텐츠 컨테이너 variants
export const contentVariants = cva('', {
  variants: {
    variant: {
      default: 'max-h-80 overflow-y-auto',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

// 로딩 컨테이너 variants
export const loadingContainerVariants = cva('', {
  variants: {
    variant: {
      default: 'flex flex-col items-center justify-center py-8',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

// 로딩 아이콘 variants
export const loadingIconVariants = cva('', {
  variants: {
    variant: {
      default: 'w-6 h-6 text-gray-400 animate-spin',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

// 로딩 텍스트 variants
export const loadingTextVariants = cva('', {
  variants: {
    variant: {
      default: 'mt-2 text-sm text-gray-500',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

// 빈 상태 컨테이너 variants
export const emptyContainerVariants = cva('', {
  variants: {
    variant: {
      default: 'flex flex-col items-center justify-center py-8 px-4',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

// 빈 상태 아이콘 컨테이너 variants
export const emptyIconContainerVariants = cva('', {
  variants: {
    variant: {
      default: 'w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

// 빈 상태 아이콘 variants
export const emptyIconVariants = cva('', {
  variants: {
    variant: {
      default: 'w-6 h-6 text-gray-400',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

// 빈 상태 제목 variants
export const emptyTitleVariants = cva('', {
  variants: {
    variant: {
      default: 'text-sm font-medium text-gray-900 mb-1',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

// 빈 상태 설명 variants
export const emptyDescriptionVariants = cva('', {
  variants: {
    variant: {
      default: 'text-xs text-gray-500 text-center',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

// 리스트 컨테이너 variants
export const listContainerVariants = cva('', {
  variants: {
    variant: {
      default: 'divide-y divide-gray-100',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

// 메시지 맵
export const messageMap = {
  markAllRead: '모두 읽음',
  loading: '알림을 불러오는 중...',
  empty: {
    title: '알림이 없습니다',
    description: '새로운 알림이 도착하면 여기에 표시됩니다',
  },
} as const;
