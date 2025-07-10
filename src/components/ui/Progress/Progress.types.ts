import * as ProgressPrimitive from '@radix-ui/react-progress';
import { VariantProps } from 'class-variance-authority';

import { progressVariants } from './progressVariants';

export interface ProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>,
    VariantProps<typeof progressVariants> {
  value?: number;
  className?: string;
}
