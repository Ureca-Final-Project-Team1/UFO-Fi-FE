import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import type { VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { tooltipContentVariants, tooltipArrowVariants } from './TooltipVariants';

// Tooltip Content Props
export interface TooltipContentProps
  extends React.ComponentProps<typeof TooltipPrimitive.Content>,
    VariantProps<typeof tooltipContentVariants> {
  side?: 'top' | 'bottom' | 'left' | 'right';
  sideOffset?: number;
}

// Tooltip Arrow Props
export interface TooltipArrowProps
  extends React.ComponentProps<typeof TooltipPrimitive.Arrow>,
    VariantProps<typeof tooltipArrowVariants> {}

// Main Tooltip Props
export interface TooltipProps extends React.ComponentProps<typeof TooltipPrimitive.Root> {
  content: React.ReactNode;
  children: React.ReactNode;
  side?: 'top' | 'bottom' | 'left' | 'right';
  sideOffset?: number;
  className?: string;
  // Content variants
  contentVariant?: VariantProps<typeof tooltipContentVariants>['variant'];
  contentSize?: VariantProps<typeof tooltipContentVariants>['size'];
  contentTheme?: VariantProps<typeof tooltipContentVariants>['theme'];
  contentRounded?: VariantProps<typeof tooltipContentVariants>['rounded'];
  // Arrow variants
  arrowVariant?: VariantProps<typeof tooltipArrowVariants>['variant'];
  arrowSize?: VariantProps<typeof tooltipArrowVariants>['size'];
}

// Tooltip Variant Types
export type TooltipVariant =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'error'
  | 'custom';

// Tooltip Size Types
export type TooltipSize = 'sm' | 'md' | 'lg' | 'xl';

// Tooltip Theme Types
export type TooltipTheme = 'light' | 'dark' | 'custom';

// Tooltip Rounded Types
export type TooltipRounded = 'none' | 'sm' | 'md' | 'lg' | 'full';

// Tooltip Arrow Size Types
export type TooltipArrowSize = 'sm' | 'md' | 'lg';
