import { cva } from 'class-variance-authority';

export const iconVariants = cva('', {
  variants: {
    variant: {
      default: '',
      clickable: 'cursor-pointer hover:opacity-80 transition-opacity',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export const errorMessages = {
  iconError: 'Icon error: name or src is required',
  iconNotFound: (name: string) => `Icon "${name}" not found`,
};

export const defaultValues = {
  name: 'AlertCircle',
  src: '',
  alt: 'icon',
  onClick: undefined,
  className: '',
};
