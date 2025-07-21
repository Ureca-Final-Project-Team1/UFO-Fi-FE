import type * as DialogPrimitive from '@radix-ui/react-dialog';
import { ComponentProps } from 'react';

export type DialogProps = ComponentProps<typeof DialogPrimitive.Root>;

export interface CommandDialogProps extends DialogProps {
  title?: string;
  description?: string;
  className?: string;
  showCloseButton?: boolean;
}
