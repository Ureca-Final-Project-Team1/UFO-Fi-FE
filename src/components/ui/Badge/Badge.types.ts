import type { VariantProps } from 'class-variance-authority';
import type * as React from 'react';

import type { badgeVariants } from './badgeVariants';

export interface BadgeProps
  extends React.ComponentProps<'span'>,
    VariantProps<typeof badgeVariants> {
  asChild?: boolean;
}
