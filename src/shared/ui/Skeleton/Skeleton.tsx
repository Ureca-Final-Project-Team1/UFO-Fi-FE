import * as React from 'react';

import { cn } from '@/utils/utils';

type SkeletonElement = 'div' | 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

type AnimationVariant = 'pulse' | 'shimmer' | 'none';

interface SkeletonProps extends React.HTMLAttributes<HTMLElement> {
  as?: SkeletonElement;
  variant?: AnimationVariant;
}

const getAnimationClass = (variant: AnimationVariant): string => {
  switch (variant) {
    case 'pulse':
      return 'animate-pulse';
    case 'shimmer':
      return 'animate-shimmer bg-gradient-to-r from-muted via-muted/50 to-muted bg-[length:200%_100%]';
    case 'none':
      return '';
    default:
      return 'animate-pulse';
  }
};

const getBackgroundClass = (variant: AnimationVariant): string => {
  return variant === 'shimmer' ? '' : 'bg-muted';
};

const SkeletonComponent = React.forwardRef<HTMLElement, SkeletonProps>(
  ({ className, as: Component = 'div', variant = 'pulse', ...props }, ref) => {
    const elementProps = {
      ref,
      className: cn(
        'rounded-md',
        getAnimationClass(variant),
        getBackgroundClass(variant),
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
