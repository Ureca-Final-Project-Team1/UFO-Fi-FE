'use client';

import * as SwitchPrimitive from '@radix-ui/react-switch';
import * as React from 'react';

import { cn } from '@/lib/utils';

import type { SwitchProps } from './Switch.types';
import { switchVariants, switchThumbVariants } from './SwitchVariants';

function Switch({
  className,
  size = 'md',
  variant = 'default',
  theme = 'auto',
  disabled = false,
  ...props
}: SwitchProps) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        switchVariants({
          size,
          variant,
          theme,
          disabled,
        }),
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          switchThumbVariants({
            size,
            variant,
            theme,
          }),
        )}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
