import { VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { Chip } from './Chip';
import { chipVariants } from './chipVariants';

export interface ChipProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof chipVariants> {
  selected?: boolean;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
  dropdown?: React.ReactNode | ((props: { closeDropdown: () => void }) => React.ReactNode);
}

export { Chip, chipVariants };
