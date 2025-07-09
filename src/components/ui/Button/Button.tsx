import { type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

import { buttonVariants } from './buttonVariants';
import { Icon, IconType } from '../Icons';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  icon?: IconType;
  iconPosition?: 'left' | 'right';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size = 'default', icon, iconPosition = 'left', children, ...props },
    ref,
  ) => {
    const classes = cn(buttonVariants({ variant, size }), className);

    const mapButtonSizeToIconSize = (btnSize: ButtonProps['size']) => {
      switch (btnSize) {
        case 'sm':
        case 'default':
        case 'compact':
          return 'sm';
        case 'lg':
        case 'full-width':
          return 'md';
        case 'icon':
          return 'lg';
        default:
          return 'md';
      }
    };

    const iconSize = mapButtonSizeToIconSize(size);

    return (
      <button
        ref={ref}
        style={{ fontFamily: 'Pretendard, sans-serif' }}
        className={classes}
        {...props}
      >
        <span className={cn('flex items-center', icon && children ? 'gap-2' : '')}>
          {icon && iconPosition === 'left' && <Icon name={icon} size={iconSize} />}
          {size !== 'icon' && children}
          {icon && iconPosition === 'right' && <Icon name={icon} size={iconSize} />}
        </span>
      </button>
    );
  },
);

Button.displayName = 'Button';

export { Button };
