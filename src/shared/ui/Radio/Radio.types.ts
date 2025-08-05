import { VariantProps } from 'class-variance-authority';
import { ComponentProps } from 'react';

import { radioGroupVariants } from './radioVariants';

export interface RadioProps
  extends Omit<ComponentProps<'input'>, 'size'>,
    VariantProps<typeof radioGroupVariants> {
  label?: string;
  description?: string;
}
