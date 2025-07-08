import { type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

import { buttonVariants } from './buttonVariants';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, icon, iconPosition = 'left', children, ...props }, ref) => {
    const classes = cn(buttonVariants({ variant, size }), className);

    return (
      <button ref={ref} className={classes} {...props}>
        <span className={cn('flex items-center', icon && children ? 'gap-2' : '')}>
          {icon && iconPosition === 'left' && icon}
          {children}
          {icon && iconPosition === 'right' && icon}
        </span>
      </button>
    );
  },
);

Button.displayName = 'Button';

export { Button };
