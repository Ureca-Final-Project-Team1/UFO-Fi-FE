import type * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { VariantProps } from 'class-variance-authority';
import type { ComponentProps } from 'react';

import { radioGroupVariants, radioItemVariants } from './RadioVariants';

export interface RadioGroupProps
  extends ComponentProps<typeof RadioGroupPrimitive.Root>,
    VariantProps<typeof radioGroupVariants> {
  options: string[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  color?: string;
}

export interface RadioGroupItemProps
  extends ComponentProps<typeof RadioGroupPrimitive.Item>,
    VariantProps<typeof radioItemVariants> {
  'aria-label'?: string;
  color?: string;
}
