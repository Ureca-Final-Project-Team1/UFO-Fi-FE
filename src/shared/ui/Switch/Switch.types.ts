import * as SwitchPrimitive from '@radix-ui/react-switch';
import { VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { switchRootVariants, switchThumbVariants } from './SwitchVariants';

export interface SwitchProps
  extends Omit<React.ComponentProps<typeof SwitchPrimitive.Root>, 'className'>,
    VariantProps<typeof switchRootVariants> {
  className?: string;
}

export interface SwitchThumbProps extends VariantProps<typeof switchThumbVariants> {
  className?: string;
}
