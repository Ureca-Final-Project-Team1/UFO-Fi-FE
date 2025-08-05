import { cva } from 'class-variance-authority';

export const sliderRootVariants = cva('relative flex w-full touch-none items-center select-none', {
  variants: {
    variant: {
      default: '',
      dark: '',
      minimal: '',
    },
    size: {
      default: '',
      compact: '',
      large: '',
    },
    orientation: {
      horizontal: '',
      vertical: 'h-full min-h-44 w-auto flex-col',
    },
    disabled: {
      true: 'opacity-50',
      false: '',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
    orientation: 'horizontal',
    disabled: false,
  },
});

export const sliderTrackVariants = cva('relative grow overflow-hidden rounded-full', {
  variants: {
    variant: {
      default: 'bg-muted',
      dark: 'bg-gray-700',
      minimal: 'bg-gray-200',
    },
    size: {
      default: 'h-1.5 w-full',
      compact: 'h-1 w-full',
      large: 'h-2 w-full',
    },
    orientation: {
      horizontal: '',
      vertical: 'h-full w-1.5',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
    orientation: 'horizontal',
  },
});

export const sliderRangeVariants = cva('absolute', {
  variants: {
    variant: {
      default: 'bg-primary',
      dark: 'bg-blue-500',
      minimal: 'bg-gray-400',
    },
    orientation: {
      horizontal: 'h-full',
      vertical: 'w-full',
    },
  },
  defaultVariants: {
    variant: 'default',
    orientation: 'horizontal',
  },
});

export const sliderThumbVariants = cva(
  'block shrink-0 rounded-full border shadow-sm transition-[color,box-shadow]',
  {
    variants: {
      variant: {
        default: 'border-primary bg-background ring-ring/50',
        dark: 'border-blue-500 bg-white ring-blue-500/50',
        minimal: 'border-gray-400 bg-white ring-gray-400/50',
      },
      size: {
        default: 'size-4',
        compact: 'size-3',
        large: 'size-5',
      },
      state: {
        default: '',
        hover: 'ring-4',
        focus: 'ring-4 outline-hidden',
        disabled: 'pointer-events-none opacity-50',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      state: 'default',
    },
  },
);

// BaseSlider variants
export const baseSliderTrackVariants = cva('relative grow overflow-hidden rounded-full', {
  variants: {
    variant: {
      default: 'bg-gray-300',
      dark: 'bg-gray-600',
      minimal: 'bg-gray-200',
    },
    size: {
      default: 'h-2',
      compact: 'h-1.5',
      large: 'h-3',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

export const baseSliderRangeVariants = cva('absolute h-full', {
  variants: {
    variant: {
      default:
        'bg-gradient-to-r from-[var(--color-badge-text-cyan)] to-[var(--color-exploration-gradient-to)]',
      dark: 'bg-gradient-to-r from-blue-500 to-purple-500',
      minimal: 'bg-gradient-to-r from-gray-400 to-gray-600',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export const baseSliderThumbVariants = cva('block rounded-full border-2 shadow', {
  variants: {
    variant: {
      default: 'border-white bg-pink-500',
      dark: 'border-gray-800 bg-blue-500',
      minimal: 'border-white bg-gray-500',
    },
    size: {
      default: 'h-5 w-5',
      compact: 'h-4 w-4',
      large: 'h-6 w-6',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

// DataSlider variants
export const dataSliderContainerVariants = cva('relative w-full', {
  variants: {
    variant: {
      default: 'px-4',
      dark: 'px-4',
      minimal: 'px-3',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export const dataSliderMiddleLabelVariants = cva('text-center font-bold text-lg mb-2', {
  variants: {
    variant: {
      default: 'text-cyan-300',
      dark: 'text-blue-400',
      minimal: 'text-gray-700',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export const dataSliderTicksContainerVariants = cva(
  'absolute left-0 right-0 flex justify-between z-10',
  {
    variants: {
      variant: {
        default: 'px-[2px]',
        dark: 'px-[2px]',
        minimal: 'px-[1px]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export const dataSliderTickLineVariants = cva('h-4 w-0.5', {
  variants: {
    variant: {
      default: 'bg-white opacity-70',
      dark: 'bg-gray-300 opacity-70',
      minimal: 'bg-gray-400 opacity-70',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export const dataSliderTickTextVariants = cva('text-xs mt-1', {
  variants: {
    variant: {
      default: 'text-white',
      dark: 'text-gray-300',
      minimal: 'text-gray-600',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export const dataSliderLabelsContainerVariants = cva('flex justify-between text-xs mt-2', {
  variants: {
    variant: {
      default: 'text-gray-400',
      dark: 'text-gray-500',
      minimal: 'text-gray-500',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export const dataSliderBottomLabelsVariants = cva('mt-2 flex justify-between text-xs w-full', {
  variants: {
    variant: {
      default: 'text-white px-[2px]',
      dark: 'text-gray-300 px-[2px]',
      minimal: 'text-gray-700 px-[2px]',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});
