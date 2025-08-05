import * as SelectPrimitive from '@radix-ui/react-select';
import { VariantProps } from 'class-variance-authority';
import * as React from 'react';

import {
  selectTriggerVariants,
  selectContentVariants,
  selectItemVariants,
  selectLabelVariants,
  selectSeparatorVariants,
  selectScrollButtonVariants,
} from './selectVariants';

export type SelectProps = React.ComponentProps<typeof SelectPrimitive.Root>;

export interface SelectTriggerProps
  extends React.ComponentProps<typeof SelectPrimitive.Trigger>,
    VariantProps<typeof selectTriggerVariants> {
  size?: 'sm' | 'default';
}

export interface SelectContentProps
  extends React.ComponentProps<typeof SelectPrimitive.Content>,
    VariantProps<typeof selectContentVariants> {}

export type SelectGroupProps = React.ComponentProps<typeof SelectPrimitive.Group>;

export type SelectValueProps = React.ComponentProps<typeof SelectPrimitive.Value>;

export interface SelectItemProps
  extends React.ComponentProps<typeof SelectPrimitive.Item>,
    VariantProps<typeof selectItemVariants> {}

export interface SelectLabelProps
  extends React.ComponentProps<typeof SelectPrimitive.Label>,
    VariantProps<typeof selectLabelVariants> {}

export interface SelectSeparatorProps
  extends React.ComponentProps<typeof SelectPrimitive.Separator>,
    VariantProps<typeof selectSeparatorVariants> {}

export interface SelectScrollUpButtonProps
  extends React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>,
    VariantProps<typeof selectScrollButtonVariants> {}

export interface SelectScrollDownButtonProps
  extends React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>,
    VariantProps<typeof selectScrollButtonVariants> {}
