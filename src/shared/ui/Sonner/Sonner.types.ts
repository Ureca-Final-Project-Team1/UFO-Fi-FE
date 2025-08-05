import { VariantProps } from 'class-variance-authority';
import { ToasterProps } from 'sonner';

import { sonnerVariants, sonnerStyleVariants, sonnerConfigVariants } from './SonnerVariants';

export interface SonnerProps
  extends Omit<
      ToasterProps,
      'className' | 'style' | 'position' | 'expand' | 'richColors' | 'closeButton'
    >,
    VariantProps<typeof sonnerVariants> {
  className?: string;
}

export type SonnerVariant = keyof typeof sonnerStyleVariants;
export type SonnerPosition = VariantProps<typeof sonnerVariants>['position'];
export type SonnerConfigVariant = keyof typeof sonnerConfigVariants;
