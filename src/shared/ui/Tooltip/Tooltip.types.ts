import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { VariantProps } from 'class-variance-authority';
import * as React from 'react';

import {
  tooltipContentVariants,
  tooltipArrowVariants,
  tooltipProviderVariants,
} from './TooltipVariants';

export interface TooltipProviderProps
  extends React.ComponentProps<typeof TooltipPrimitive.Provider>,
    VariantProps<typeof tooltipProviderVariants> {
  delayDuration?: number;
}

export interface TooltipProps
  extends React.ComponentProps<typeof TooltipPrimitive.Root>,
    VariantProps<typeof tooltipContentVariants> {
  content: React.ReactNode;
  children: React.ReactNode;
  side?: 'top' | 'bottom' | 'left' | 'right';
  sideOffset?: number;
  className?: string;
}

export interface TooltipContentProps extends VariantProps<typeof tooltipContentVariants> {
  children: React.ReactNode;
  side?: 'top' | 'bottom' | 'left' | 'right';
  sideOffset?: number;
  className?: string;
}

export interface TooltipArrowProps extends VariantProps<typeof tooltipArrowVariants> {
  className?: string;
}
