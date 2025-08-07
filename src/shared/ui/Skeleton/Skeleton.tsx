import * as React from 'react';

import { cn } from '@/lib/utils';

import type { SkeletonProps, SkeletonElement, AnimationVariant } from './Skeleton.types';
import { skeletonVariants } from './SkeletonVariants';

const SkeletonComponent = React.forwardRef<HTMLElement, SkeletonProps>(
  ({ className, as: Component = 'div', variant = 'pulse', size, shape, color, ...props }, ref) => {
    const elementProps = {
      ref,
      className: cn(
        skeletonVariants({
          variant,
          size,
          shape,
          color,
        }),
        className,
      ),
      ...props,
    };

    switch (Component) {
      case 'span':
        return React.createElement('span', elementProps);
      case 'p':
        return React.createElement('p', elementProps);
      case 'h1':
        return React.createElement('h1', elementProps);
      case 'h2':
        return React.createElement('h2', elementProps);
      case 'h3':
        return React.createElement('h3', elementProps);
      case 'h4':
        return React.createElement('h4', elementProps);
      case 'h5':
        return React.createElement('h5', elementProps);
      case 'h6':
        return React.createElement('h6', elementProps);
      default:
        return React.createElement('div', elementProps);
    }
  },
);

SkeletonComponent.displayName = 'Skeleton';

export { SkeletonComponent as Skeleton };
export type { SkeletonProps, SkeletonElement, AnimationVariant };
