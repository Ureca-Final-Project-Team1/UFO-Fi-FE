'use client';

import * as SwitchPrimitive from '@radix-ui/react-switch';
import * as React from 'react';

import { cn } from '@/lib/utils';

import { SwitchProps } from './Switch.types';
import { switchRootVariants, switchThumbVariants } from './SwitchVariants';

function Switch({
  className,
  variant = 'default',
  size = 'default',
  disabled = false,
  ...props
}: SwitchProps) {
  const [checked, setChecked] = React.useState(props.checked || false);

  // checked 상태가 변경될 때마다 업데이트
  React.useEffect(() => {
    setChecked(props.checked || false);
  }, [props.checked]);

  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        switchRootVariants({ variant, size, state: checked ? 'checked' : 'unchecked', disabled }),
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          switchThumbVariants({ variant, size, state: checked ? 'checked' : 'unchecked' }),
        )}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
