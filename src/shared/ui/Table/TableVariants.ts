import { cva } from 'class-variance-authority';

// Table 컨테이너 variants
export const tableVariants = cva('space-y-4', {
  variants: {
    variant: {
      default: '',
      bordered: 'border border-gray-200 rounded-lg',
      striped: '',
      compact: 'space-y-2',
      spacious: 'space-y-6',
    },
    size: {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base',
      xl: 'text-lg',
    },
    theme: {
      light: '',
      dark: 'dark:bg-gray-900 dark:text-white',
      custom: '',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
    theme: 'light',
  },
});

// Table 메인 컨테이너 variants
export const tableContainerVariants = cva('bg-white rounded-lg shadow overflow-hidden', {
  variants: {
    variant: {
      default: '',
      bordered: 'border border-gray-200',
      striped: '',
      compact: '',
      spacious: '',
    },
    theme: {
      light: 'bg-white',
      dark: 'dark:bg-gray-800',
      custom: '',
    },
    elevation: {
      none: '',
      sm: 'shadow-sm',
      md: 'shadow',
      lg: 'shadow-lg',
      xl: 'shadow-xl',
    },
  },
  defaultVariants: {
    variant: 'default',
    theme: 'light',
    elevation: 'md',
  },
});

// Table 헤더 variants
export const tableHeaderVariants = cva(
  'hidden md:grid gap-4 px-4 py-3 bg-gray-50 border-b border-gray-200 text-sm font-semibold text-gray-700',
  {
    variants: {
      variant: {
        default: 'bg-gray-50',
        primary: 'bg-primary/10 text-primary-900',
        secondary: 'bg-secondary/10 text-secondary-900',
        accent: 'bg-accent/10 text-accent-900',
        custom: 'bg-gradient-to-r from-blue-500 to-purple-500 text-white',
      },
      size: {
        sm: 'px-3 py-2 text-xs',
        md: 'px-4 py-3 text-sm',
        lg: 'px-6 py-4 text-base',
        xl: 'px-8 py-6 text-lg',
      },
      theme: {
        light: 'bg-gray-50 text-gray-700',
        dark: 'dark:bg-gray-700 dark:text-gray-200',
        custom: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      theme: 'light',
    },
  },
);

// Table 모바일 헤더 variants
export const tableMobileHeaderVariants = cva(
  'md:hidden grid gap-4 px-4 py-3 bg-gray-50 border-b border-gray-200 text-sm font-semibold text-gray-700',
  {
    variants: {
      variant: {
        default: 'bg-gray-50',
        primary: 'bg-primary/10 text-primary-900',
        secondary: 'bg-secondary/10 text-secondary-900',
        accent: 'bg-accent/10 text-accent-900',
        custom: 'bg-gradient-to-r from-blue-500 to-purple-500 text-white',
      },
      size: {
        sm: 'px-3 py-2 text-xs',
        md: 'px-4 py-3 text-sm',
        lg: 'px-6 py-4 text-base',
        xl: 'px-8 py-6 text-lg',
      },
      theme: {
        light: 'bg-gray-50 text-gray-700',
        dark: 'dark:bg-gray-700 dark:text-gray-200',
        custom: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      theme: 'light',
    },
  },
);

// Table 헤더 셀 variants
export const tableHeaderCellVariants = cva('flex items-center', {
  variants: {
    alignment: {
      left: 'justify-start',
      center: 'justify-center',
      right: 'justify-end',
      between: 'justify-between',
    },
    size: {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base',
      xl: 'text-lg',
    },
    weight: {
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    },
  },
  defaultVariants: {
    alignment: 'left',
    size: 'md',
    weight: 'semibold',
  },
});

// Table 행 variants
export const tableRowVariants = cva(
  'hidden md:grid gap-4 px-4 py-3 hover:bg-gray-50 transition-colors text-sm',
  {
    variants: {
      variant: {
        default: 'hover:bg-gray-50',
        striped: 'even:bg-gray-50 hover:bg-gray-100',
        bordered: 'border-b border-gray-200 hover:bg-gray-50',
        compact: 'px-3 py-2',
        spacious: 'px-6 py-4',
      },
      size: {
        sm: 'px-3 py-2 text-xs',
        md: 'px-4 py-3 text-sm',
        lg: 'px-6 py-4 text-base',
        xl: 'px-8 py-6 text-lg',
      },
      theme: {
        light: 'hover:bg-gray-50',
        dark: 'dark:hover:bg-gray-700',
        custom: '',
      },
      selected: {
        true: 'bg-blue-50',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      theme: 'light',
      selected: false,
    },
  },
);

// Table 모바일 행 variants
export const tableMobileRowVariants = cva(
  'md:hidden grid gap-4 px-4 py-3 hover:bg-gray-50 transition-colors text-sm',
  {
    variants: {
      variant: {
        default: 'hover:bg-gray-50',
        striped: 'even:bg-gray-50 hover:bg-gray-100',
        bordered: 'border-b border-gray-200 hover:bg-gray-50',
        compact: 'px-3 py-2',
        spacious: 'px-6 py-4',
      },
      size: {
        sm: 'px-3 py-2 text-xs',
        md: 'px-4 py-3 text-sm',
        lg: 'px-6 py-4 text-base',
        xl: 'px-8 py-6 text-lg',
      },
      theme: {
        light: 'hover:bg-gray-50',
        dark: 'dark:hover:bg-gray-700',
        custom: '',
      },
      selected: {
        true: 'bg-blue-50',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      theme: 'light',
      selected: false,
    },
  },
);

// Table 셀 variants
export const tableCellVariants = cva('flex items-center text-gray-900', {
  variants: {
    alignment: {
      left: 'justify-start',
      center: 'justify-center',
      right: 'justify-end',
      between: 'justify-between',
    },
    size: {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base',
      xl: 'text-lg',
    },
    theme: {
      light: 'text-gray-900',
      dark: 'dark:text-gray-100',
      custom: '',
    },
    truncate: {
      true: 'truncate',
      false: '',
    },
  },
  defaultVariants: {
    alignment: 'left',
    size: 'md',
    theme: 'light',
    truncate: false,
  },
});

// Table 빈 상태 variants
export const tableEmptyVariants = cva('px-4 py-8 text-center text-gray-500', {
  variants: {
    size: {
      sm: 'px-3 py-6 text-xs',
      md: 'px-4 py-8 text-sm',
      lg: 'px-6 py-12 text-base',
      xl: 'px-8 py-16 text-lg',
    },
    theme: {
      light: 'text-gray-500',
      dark: 'dark:text-gray-400',
      custom: '',
    },
  },
  defaultVariants: {
    size: 'md',
    theme: 'light',
  },
});

// Table 분할선 variants
export const tableDividerVariants = cva('divide-y divide-gray-100', {
  variants: {
    variant: {
      default: 'divide-gray-100',
      primary: 'divide-primary/20',
      secondary: 'divide-secondary/20',
      accent: 'divide-accent/20',
      custom: 'divide-gray-200',
    },
    theme: {
      light: 'divide-gray-100',
      dark: 'dark:divide-gray-700',
      custom: '',
    },
  },
  defaultVariants: {
    variant: 'default',
    theme: 'light',
  },
});

// Admin Table 헤더 variants
export const adminTableHeaderVariants = cva(
  'flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4',
  {
    variants: {
      layout: {
        default: 'flex-col sm:flex-row',
        horizontal: 'flex-row',
        vertical: 'flex-col',
      },
      alignment: {
        start: 'sm:justify-start',
        center: 'sm:justify-center',
        end: 'sm:justify-end',
        between: 'sm:justify-between',
      },
      spacing: {
        sm: 'gap-2',
        md: 'gap-4',
        lg: 'gap-6',
        xl: 'gap-8',
      },
    },
    defaultVariants: {
      layout: 'default',
      alignment: 'between',
      spacing: 'md',
    },
  },
);

// Admin Table 제목 variants
export const adminTableTitleVariants = cva('text-xl font-bold text-gray-900', {
  variants: {
    size: {
      sm: 'text-lg',
      md: 'text-xl',
      lg: 'text-2xl',
      xl: 'text-3xl',
    },
    theme: {
      light: 'text-gray-900',
      dark: 'dark:text-white',
      custom: '',
    },
  },
  defaultVariants: {
    size: 'md',
    theme: 'light',
  },
});

// Admin Table 설명 variants
export const adminTableDescriptionVariants = cva('text-sm text-gray-600 mt-1', {
  variants: {
    size: {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base',
      xl: 'text-lg',
    },
    theme: {
      light: 'text-gray-600',
      dark: 'dark:text-gray-400',
      custom: '',
    },
  },
  defaultVariants: {
    size: 'md',
    theme: 'light',
  },
});

// Admin Table 선택 알림 variants
export const adminTableSelectionAlertVariants = cva(
  'bg-blue-50 border border-blue-200 rounded-lg p-4',
  {
    variants: {
      variant: {
        default: 'bg-blue-50 border-blue-200',
        primary: 'bg-primary/10 border-primary/20',
        secondary: 'bg-secondary/10 border-secondary/20',
        accent: 'bg-accent/10 border-accent/20',
        success: 'bg-green-50 border-green-200',
        warning: 'bg-yellow-50 border-yellow-200',
        error: 'bg-red-50 border-red-200',
      },
      size: {
        sm: 'p-3',
        md: 'p-4',
        lg: 'p-6',
        xl: 'p-8',
      },
      theme: {
        light: '',
        dark: 'dark:bg-blue-900/20 dark:border-blue-700',
        custom: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      theme: 'light',
    },
  },
);

// Admin Table 선택 알림 내용 variants
export const adminTableSelectionContentVariants = cva(
  'flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4',
  {
    variants: {
      layout: {
        default: 'flex-col sm:flex-row',
        horizontal: 'flex-row',
        vertical: 'flex-col',
      },
      alignment: {
        start: 'sm:justify-start',
        center: 'sm:justify-center',
        end: 'sm:justify-end',
        between: 'sm:justify-between',
      },
      spacing: {
        sm: 'gap-2',
        md: 'gap-4',
        lg: 'gap-6',
        xl: 'gap-8',
      },
    },
    defaultVariants: {
      layout: 'default',
      alignment: 'between',
      spacing: 'md',
    },
  },
);

// Admin Table 선택 카운트 variants
export const adminTableSelectionCountVariants = cva('flex items-center gap-2', {
  variants: {
    size: {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base',
      xl: 'text-lg',
    },
    theme: {
      light: 'text-blue-700',
      dark: 'dark:text-blue-300',
      custom: '',
    },
    weight: {
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    },
  },
  defaultVariants: {
    size: 'md',
    theme: 'light',
    weight: 'medium',
  },
});

// Admin Table 선택 인디케이터 variants
export const adminTableSelectionIndicatorVariants = cva('size-2 bg-blue-500 rounded-full', {
  variants: {
    size: {
      sm: 'size-1.5',
      md: 'size-2',
      lg: 'size-2.5',
      xl: 'size-3',
    },
    variant: {
      default: 'bg-blue-500',
      primary: 'bg-primary',
      secondary: 'bg-secondary',
      accent: 'bg-accent',
      success: 'bg-green-500',
      warning: 'bg-yellow-500',
      error: 'bg-red-500',
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'default',
  },
});

// Table 페이지네이션 컨테이너 variants
export const tablePaginationContainerVariants = cva(
  'px-4 py-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4',
  {
    variants: {
      size: {
        sm: 'px-3 py-3',
        md: 'px-4 py-4',
        lg: 'px-6 py-6',
        xl: 'px-8 py-8',
      },
      theme: {
        light: 'border-gray-200',
        dark: 'dark:border-gray-700',
        custom: '',
      },
      layout: {
        default: 'flex-col sm:flex-row',
        horizontal: 'flex-row',
        vertical: 'flex-col',
      },
    },
    defaultVariants: {
      size: 'md',
      theme: 'light',
      layout: 'default',
    },
  },
);

// Table 페이지 크기 선택 variants
export const tablePageSizeVariants = cva('flex items-center gap-2', {
  variants: {
    size: {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base',
      xl: 'text-lg',
    },
    theme: {
      light: 'text-gray-600',
      dark: 'dark:text-gray-400',
      custom: '',
    },
  },
  defaultVariants: {
    size: 'md',
    theme: 'light',
  },
});

// Table 페이지 크기 셀렉트 variants
export const tablePageSizeSelectVariants = cva('px-2 py-1 border border-gray-300 rounded text-sm', {
  variants: {
    size: {
      sm: 'px-1 py-0.5 text-xs',
      md: 'px-2 py-1 text-sm',
      lg: 'px-3 py-2 text-base',
      xl: 'px-4 py-3 text-lg',
    },
    theme: {
      light: 'border-gray-300',
      dark: 'dark:border-gray-600 dark:bg-gray-700',
      custom: '',
    },
  },
  defaultVariants: {
    size: 'md',
    theme: 'light',
  },
});

// Table 데이터 정보 variants
export const tableDataInfoVariants = cva('text-sm text-gray-600', {
  variants: {
    size: {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base',
      xl: 'text-lg',
    },
    theme: {
      light: 'text-gray-600',
      dark: 'dark:text-gray-400',
      custom: '',
    },
  },
  defaultVariants: {
    size: 'md',
    theme: 'light',
  },
});
