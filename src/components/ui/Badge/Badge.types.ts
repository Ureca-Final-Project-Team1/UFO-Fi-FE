import type { VariantProps } from 'class-variance-authority';
import type * as React from 'react';

import type { badgeVariants } from './badgeVariants';
import { IconType } from '../Icons';

export interface BadgeProps
  extends React.ComponentProps<'span'>,
    VariantProps<typeof badgeVariants> {
  asChild?: boolean;
  showIcon?: boolean;
  icon?: IconType;
  children?: React.ReactNode;
}
