import { Slot } from '@radix-ui/react-slot';
import * as React from 'react';

import { cn } from '@/lib/utils';

import { stateInfo, type BadgeProps } from './Badge.types';
import { badgeVariants } from './badgeVariants';
import { Icon } from '../Icons';

function Badge({
  className,
  variant,
  state,
  showIcon = false,
  icon = 'AlertCircle',
  asChild = false,
  children,
  ...props
}: BadgeProps) {
  const Comp = asChild ? Slot : 'span';
  const status = state ? stateInfo[state] : null;

  const appliedClass = state
    ? badgeVariants({ state })
    : badgeVariants({ variant: variant || 'default' });

  return (
    <Comp data-slot="badge" className={cn(appliedClass, className, 'caption-12-bold')} {...props}>
      {status ? (
        <div className="flex items-center gap-1.5">
          {showIcon && status.showDot && (
            <div
              className={cn('w-3 h-3 rounded-full', {
                'bg-(--color-text-selling)': state === 'selling',
                'bg-(--color-text-sold)': state === 'sold',
                'bg-(--color-text-timeout)': state === 'timeout',
                'bg-(--color-text-reported)': state === 'reported',
              })}
            />
          )}
          {showIcon && status.icon && <Icon name={status.icon} alt={status.label} size="sm" />}
          <span>{status.label}</span>
        </div>
      ) : (
        <div className="flex items-center gap-1.5">
          {showIcon && <Icon name={icon} alt="custom-icon" size="sm" />}
          <span>{children}</span>
        </div>
      )}
    </Comp>
  );
}

export { Badge };
