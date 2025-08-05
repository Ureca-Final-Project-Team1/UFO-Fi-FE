'use client';

import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import * as React from 'react';

import { cn } from '@/lib/utils';

import { TooltipProviderProps, TooltipProps } from './Tooltip.types';
import {
  tooltipProviderVariants,
  tooltipContentVariants,
  tooltipArrowVariants,
} from './TooltipVariants';

// TooltipProvider는 그대로 유지
function TooltipProvider({
  delayDuration = 0,
  variant = 'default',
  className,
  ...props
}: TooltipProviderProps) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      className={cn(tooltipProviderVariants({ variant }), className)}
      {...props}
    />
  );
}

function Tooltip({
  content,
  children,
  side = 'top',
  sideOffset = 0,
  variant = 'default',
  size = 'default',
  className,
  ...props
}: TooltipProps) {
  return (
    <TooltipProvider variant={variant}>
      <TooltipPrimitive.Root data-slot="tooltip" {...props}>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            data-slot="tooltip-content"
            side={side}
            sideOffset={sideOffset}
            className={cn(tooltipContentVariants({ variant, size }), className)}
          >
            {content}
            <TooltipPrimitive.Arrow className={cn(tooltipArrowVariants({ variant }))} />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipProvider>
  );
}

export { Tooltip, TooltipProvider };
