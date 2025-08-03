import { cva } from 'class-variance-authority';

// 메인 인디케이터 컨테이너 variants
export const indicatorVariants = cva('flex items-center justify-center', {
  variants: {
    orientation: {
      horizontal: 'flex-row',
      vertical: 'flex-col',
    },
    spacing: {
      tight: 'gap-1',
      normal: 'gap-2',
      wide: 'gap-3',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
    spacing: 'normal',
  },
});

// 원형 점 variants
export const basicDotVariants = cva('rounded-full transition-all duration-300 ease-in-out', {
  variants: {
    size: {
      sm: 'size-2',
      md: 'size-3',
      lg: 'size-4',
    },
    state: {
      pending: 'bg-gray-300 scale-75 opacity-60',
      active: 'bg-primary-500 scale-125 shadow-lg',
      completed: 'bg-primary-400 scale-100',
    },
  },
  defaultVariants: {
    size: 'md',
    state: 'pending',
  },
});

// 호버 스타일 variants
export const hoverVariants = cva('', {
  variants: {
    enabled: {
      true: 'hover:scale-110',
      false: '',
    },
  },
  defaultVariants: {
    enabled: false,
  },
});

// 커서 스타일 variants
export const cursorVariants = cva('', {
  variants: {
    clickable: {
      true: 'cursor-pointer',
      false: '',
    },
  },
  defaultVariants: {
    clickable: false,
  },
});

// 단계 상태 맵
export const stepStateMap = {
  completed: 'completed',
  active: 'active',
  pending: 'pending',
} as const;

// aria-label 맵
export const ariaLabelMap = {
  format: (stepNumber: number, totalSteps: number) => `Step ${stepNumber} of ${totalSteps}`,
} as const;
