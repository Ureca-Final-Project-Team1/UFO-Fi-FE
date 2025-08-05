import type * as DialogPrimitive from '@radix-ui/react-dialog';
import { VariantProps } from 'class-variance-authority';
import { Command as CommandPrimitive } from 'cmdk';
import { ComponentProps } from 'react';

import {
  commandVariants,
  commandInputVariants,
  commandInputFieldVariants,
  commandListVariants,
  commandEmptyVariants,
  commandGroupVariants,
  commandSeparatorVariants,
  commandItemVariants,
  commandShortcutVariants,
} from './CommandVariants';

export type DialogProps = ComponentProps<typeof DialogPrimitive.Root>;

export interface CommandDialogProps extends DialogProps {
  title?: string;
  description?: string;
  className?: string;
  showCloseButton?: boolean;
}

export interface CommandProps
  extends ComponentProps<typeof CommandPrimitive>,
    VariantProps<typeof commandVariants> {}

export interface CommandInputProps
  extends ComponentProps<typeof CommandPrimitive.Input>,
    VariantProps<typeof commandInputVariants> {}

export interface CommandInputFieldProps
  extends ComponentProps<typeof CommandPrimitive.Input>,
    VariantProps<typeof commandInputFieldVariants> {}

export interface CommandListProps
  extends ComponentProps<typeof CommandPrimitive.List>,
    VariantProps<typeof commandListVariants> {}

export interface CommandEmptyProps
  extends ComponentProps<typeof CommandPrimitive.Empty>,
    VariantProps<typeof commandEmptyVariants> {}

export interface CommandGroupProps
  extends ComponentProps<typeof CommandPrimitive.Group>,
    VariantProps<typeof commandGroupVariants> {}

export interface CommandSeparatorProps
  extends ComponentProps<typeof CommandPrimitive.Separator>,
    VariantProps<typeof commandSeparatorVariants> {}

export interface CommandItemProps
  extends ComponentProps<typeof CommandPrimitive.Item>,
    VariantProps<typeof commandItemVariants> {}

export interface CommandShortcutProps
  extends ComponentProps<'span'>,
    VariantProps<typeof commandShortcutVariants> {}
