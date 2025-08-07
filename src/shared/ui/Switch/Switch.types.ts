import * as SwitchPrimitive from '@radix-ui/react-switch';
import type { VariantProps } from 'class-variance-authority';
import type { ComponentProps } from 'react';

import {
  switchVariants,
  switchThumbVariants,
  switchLabelVariants,
  switchContainerVariants,
  switchGroupVariants,
} from './SwitchVariants';

// Switch Props
export interface SwitchProps
  extends Omit<ComponentProps<typeof SwitchPrimitive.Root>, 'size' | 'disabled'> {
  className?: string;
  size?: VariantProps<typeof switchVariants>['size'];
  variant?: VariantProps<typeof switchVariants>['variant'];
  theme?: VariantProps<typeof switchVariants>['theme'];
  disabled?: VariantProps<typeof switchVariants>['disabled'];
}

// Switch Thumb Props
export interface SwitchThumbProps
  extends ComponentProps<typeof SwitchPrimitive.Thumb>,
    VariantProps<typeof switchThumbVariants> {
  className?: string;
}

// Switch Label Props
export interface SwitchLabelProps extends VariantProps<typeof switchLabelVariants> {
  children: React.ReactNode;
  className?: string;
  htmlFor?: string;
}

// Switch Container Props
export interface SwitchContainerProps extends VariantProps<typeof switchContainerVariants> {
  children: React.ReactNode;
  className?: string;
}

// Switch Group Props
export interface SwitchGroupProps extends VariantProps<typeof switchGroupVariants> {
  children: React.ReactNode;
  className?: string;
}

// Switch with Label Props
export interface SwitchWithLabelProps extends SwitchProps {
  label?: React.ReactNode;
  labelPosition?: 'left' | 'right' | 'top' | 'bottom';
  labelSize?: VariantProps<typeof switchLabelVariants>['size'];
  labelVariant?: VariantProps<typeof switchLabelVariants>['variant'];
  containerLayout?: VariantProps<typeof switchContainerVariants>['layout'];
  containerAlignment?: VariantProps<typeof switchContainerVariants>['alignment'];
  containerSpacing?: VariantProps<typeof switchContainerVariants>['spacing'];
}

// Switch Item Props (for groups)
export interface SwitchItemProps extends SwitchWithLabelProps {
  id: string;
  value: string;
}

// Switch Group with Items Props
export interface SwitchGroupWithItemsProps extends SwitchGroupProps {
  items: SwitchItemProps[];
  value?: string[];
  onValueChange?: (value: string[]) => void;
  multiple?: boolean;
}

// Switch Size Types
export type SwitchSize = 'sm' | 'md' | 'lg' | 'xl';

// Switch Variant Types
export type SwitchVariant =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'success'
  | 'warning'
  | 'error'
  | 'custom';

// Switch Theme Types
export type SwitchTheme = 'light' | 'dark' | 'auto';

// Switch Layout Types
export type SwitchLayout = 'horizontal' | 'vertical' | 'reverse';

// Switch Alignment Types
export type SwitchAlignment = 'start' | 'center' | 'end' | 'between';

// Switch Spacing Types
export type SwitchSpacing = 'sm' | 'md' | 'lg' | 'xl';
