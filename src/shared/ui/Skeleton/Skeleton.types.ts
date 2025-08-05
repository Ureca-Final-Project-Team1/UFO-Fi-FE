import { VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { skeletonVariants } from './SkeletonVariants';

export type SkeletonElement = 'div' | 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export type AnimationVariant = 'pulse' | 'shimmer' | 'none';

export interface SkeletonProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof skeletonVariants> {
  as?: SkeletonElement;
}
