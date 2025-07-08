import { Slot } from '@radix-ui/react-slot';
import * as React from 'react';

import { cn } from '@/lib/utils';

import type { BadgeProps } from './Badge.types';
import { badgeVariants } from './badgeVariants';
import { Icon } from '../Icons';

const stateInfo = {
  selling: {
    label: '판매중',
    icon: null,
    showDot: true,
  },
  sold: {
    label: '판매완료',
    icon: 'CircleCheck',
    showDot: false,
  },
  timeout: {
    label: '기간만료',
    icon: 'Hourglass',
    showDot: false,
  },
  reported: {
    label: '블라인드',
    icon: 'EyeOff',
    showDot: false,
  },
} as const;

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
            <div className={`w-3.5 h-3.5 rounded-full bg-(--color-text-${state})`} />
          )}
          {showIcon && status.icon && <Icon name={status.icon} alt={state ?? ''} size="sm" />}
          <span>{status.label}</span>
        </div>
      ) : (
        <div className="flex items-center gap-1.5">
          {showIcon && <Icon src={icon} alt="custom-icon" size="sm" />}
          <span>{children}</span>
        </div>
      )}
    </Comp>
  );
}

export { Badge };
