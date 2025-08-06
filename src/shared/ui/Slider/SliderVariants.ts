import { cva } from 'class-variance-authority';

// 메인 Slider Root variants
export const sliderVariants = cva(
  'relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50',
  {
    variants: {
      orientation: {
        horizontal: '',
        vertical: 'h-full min-h-44 w-auto flex-col',
      },
      size: {
        sm: 'h-6',
        md: 'h-8',
        lg: 'h-10',
      },
      disabled: {
        true: 'opacity-50 cursor-not-allowed',
        false: '',
      },
    },
    defaultVariants: {
      orientation: 'horizontal',
      size: 'md',
      disabled: false,
    },
  },
);

// Slider Track variants
export const sliderTrackVariants = cva('relative grow overflow-hidden rounded-full', {
  variants: {
    orientation: {
      horizontal: 'w-full',
      vertical: 'h-full',
    },
    variant: {
      default: 'bg-muted',
      primary: 'bg-primary/20',
      secondary: 'bg-secondary',
      accent: 'bg-accent/20',
      custom: 'bg-gray-300',
    },
    size: {
      sm: 'data-[orientation=horizontal]:h-1 data-[orientation=vertical]:w-1',
      md: 'data-[orientation=horizontal]:h-1.5 data-[orientation=vertical]:w-1.5',
      lg: 'data-[orientation=horizontal]:h-2 data-[orientation=vertical]:w-2',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
    variant: 'default',
    size: 'md',
  },
});

// Slider Range variants
export const sliderRangeVariants = cva('absolute', {
  variants: {
    orientation: {
      horizontal: 'h-full',
      vertical: 'w-full',
    },
    variant: {
      default: 'bg-primary',
      primary: 'bg-primary',
      secondary: 'bg-secondary',
      accent: 'bg-accent',
      gradient: 'bg-gradient-to-r from-cyan-400 to-purple-500',
      custom: 'bg-pink-500',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
    variant: 'default',
  },
});

// Slider Thumb variants
export const sliderThumbVariants = cva(
  'block shrink-0 rounded-full border shadow-sm transition-[color,box-shadow] hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      size: {
        sm: 'size-3',
        md: 'size-4',
        lg: 'size-5',
      },
      variant: {
        default: 'border-primary bg-background ring-ring/50',
        primary: 'border-primary bg-primary',
        secondary: 'border-secondary bg-secondary',
        accent: 'border-accent bg-accent',
        custom: 'border-white bg-pink-500',
      },
      ringColor: {
        default: 'ring-ring/50',
        primary: 'ring-primary/50',
        secondary: 'ring-secondary/50',
        accent: 'ring-accent/50',
        custom: 'ring-white/50',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'default',
      ringColor: 'default',
    },
  },
);

// DataSlider 컨테이너 variants
export const dataSliderVariants = cva('relative w-full px-4', {
  variants: {
    padding: {
      sm: 'px-2',
      md: 'px-4',
      lg: 'px-6',
    },
    width: {
      sm: 'w-64',
      md: 'w-80',
      lg: 'w-96',
      full: 'w-full',
    },
  },
  defaultVariants: {
    padding: 'md',
    width: 'full',
  },
});

// 중앙 값 라벨 variants
export const sliderMiddleLabelVariants = cva('text-center font-bold mb-2', {
  variants: {
    size: {
      sm: 'text-lg',
      md: 'text-xl',
      lg: 'text-2xl',
      xl: 'text-3xl',
    },
    color: {
      default: 'text-foreground',
      primary: 'text-primary',
      secondary: 'text-secondary',
      accent: 'text-accent',
      custom: 'text-cyan-300',
    },
  },
  defaultVariants: {
    size: 'lg',
    color: 'custom',
  },
});

// 눈금선 컨테이너 variants
export const sliderTicksVariants = cva(
  'absolute left-0 right-0 flex justify-between px-[2px] z-10',
  {
    variants: {
      position: {
        top: 'top-0',
        bottom: 'bottom-0',
      },
    },
    defaultVariants: {
      position: 'top',
    },
  },
);

// 눈금선 variants
export const sliderTickVariants = cva('flex flex-col items-center w-0', {
  variants: {
    size: {
      sm: 'h-2',
      md: 'h-4',
      lg: 'h-6',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

// 눈금선 라인 variants
export const sliderTickLineVariants = cva('w-0.5', {
  variants: {
    variant: {
      default: 'bg-white opacity-70',
      primary: 'bg-primary opacity-70',
      secondary: 'bg-secondary opacity-70',
      accent: 'bg-accent opacity-70',
      invisible: 'invisible',
    },
    size: {
      sm: 'h-2',
      md: 'h-4',
      lg: 'h-6',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
});

// 눈금선 라벨 variants
export const sliderTickLabelVariants = cva('mt-1', {
  variants: {
    size: {
      xs: 'text-xs',
      sm: 'text-sm',
      md: 'text-base',
    },
    color: {
      default: 'text-white',
      primary: 'text-primary',
      secondary: 'text-secondary',
      muted: 'text-muted-foreground',
    },
  },
  defaultVariants: {
    size: 'xs',
    color: 'default',
  },
});

// 하단 라벨 컨테이너 variants
export const sliderBottomLabelVariants = cva('flex justify-between text-xs mt-2', {
  variants: {
    color: {
      default: 'text-gray-400',
      primary: 'text-primary',
      secondary: 'text-secondary',
      muted: 'text-muted-foreground',
    },
  },
  defaultVariants: {
    color: 'default',
  },
});

// 하단 라벨 variants
export const sliderBottomLabelItemVariants = cva('w-[1px] -translate-x-1/2 text-center', {
  variants: {
    color: {
      default: 'text-white',
      primary: 'text-primary',
      secondary: 'text-secondary',
      muted: 'text-muted-foreground',
    },
    size: {
      xs: 'text-xs',
      sm: 'text-sm',
      md: 'text-base',
    },
  },
  defaultVariants: {
    color: 'default',
    size: 'xs',
  },
});
