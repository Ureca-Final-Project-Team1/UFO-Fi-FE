import { cva } from 'class-variance-authority';

export const switchRootVariants = cva(
  'peer inline-flex shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all duration-300 outline-none',
  {
    variants: {
      variant: {
        default: '',
        dark: '',
        minimal: '',
      },
      size: {
        default: 'h-[1.15rem] w-8',
        sm: 'h-4 w-6',
        lg: 'h-6 w-12',
      },
      state: {
        checked: '',
        unchecked: '',
      },
      disabled: {
        true: 'cursor-not-allowed opacity-50',
        false: '',
      },
    },
    compoundVariants: [
      {
        variant: 'default',
        state: 'checked',
        class: 'bg-yellow-200',
      },
      {
        variant: 'default',
        state: 'unchecked',
        class: 'bg-gray-300 dark:bg-input/80',
      },
      {
        variant: 'dark',
        state: 'checked',
        class: 'bg-blue-600',
      },
      {
        variant: 'dark',
        state: 'unchecked',
        class: 'bg-gray-600',
      },
      {
        variant: 'minimal',
        state: 'checked',
        class: 'bg-gray-900',
      },
      {
        variant: 'minimal',
        state: 'unchecked',
        class: 'bg-gray-200',
      },
    ],
    defaultVariants: {
      variant: 'default',
      size: 'default',
      state: 'unchecked',
      disabled: false,
    },
  },
);

export const switchThumbVariants = cva(
  'pointer-events-none block rounded-full ring-0 transition-transform duration-200',
  {
    variants: {
      variant: {
        default: '',
        dark: '',
        minimal: '',
      },
      size: {
        default: 'size-4',
        sm: 'size-3',
        lg: 'size-5',
      },
      state: {
        checked: '',
        unchecked: '',
      },
    },
    compoundVariants: [
      {
        variant: 'default',
        state: 'checked',
        class: 'bg-background translate-x-[calc(100%-2px)]',
      },
      {
        variant: 'default',
        state: 'unchecked',
        class: 'bg-background dark:bg-foreground translate-x-0',
      },
      {
        variant: 'dark',
        state: 'checked',
        class: 'bg-white translate-x-[calc(100%-2px)]',
      },
      {
        variant: 'dark',
        state: 'unchecked',
        class: 'bg-gray-300 translate-x-0',
      },
      {
        variant: 'minimal',
        state: 'checked',
        class: 'bg-white translate-x-[calc(100%-2px)]',
      },
      {
        variant: 'minimal',
        state: 'unchecked',
        class: 'bg-gray-400 translate-x-0',
      },
    ],
    defaultVariants: {
      variant: 'default',
      size: 'default',
      state: 'unchecked',
    },
  },
);
