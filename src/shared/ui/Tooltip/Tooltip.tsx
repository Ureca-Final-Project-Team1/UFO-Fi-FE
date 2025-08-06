'use client';

import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import * as React from 'react';

import { cn } from '@/lib/utils';

import type { TooltipProps } from './Tooltip.types';
import { tooltipContentVariants, tooltipArrowVariants } from './TooltipVariants';

// TooltipProvider는 그대로 유지
function TooltipProvider({
  delayDuration = 0,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      {...props}
    />
  );
}

// Main Tooltip 컴포넌트
function Tooltip({
  content,
  children,
  side = 'top',
  sideOffset = 0,
  className,
  // Content variants
  contentVariant,
  contentSize,
  contentTheme,
  contentRounded,
  // Arrow variants
  arrowVariant,
  arrowSize,
  ...props
}: TooltipProps) {
  return (
    <TooltipProvider>
      <TooltipPrimitive.Root data-slot="tooltip" {...props}>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            data-slot="tooltip-content"
            side={side}
            sideOffset={sideOffset}
            className={cn(
              tooltipContentVariants({
                variant: contentVariant,
                size: contentSize,
                theme: contentTheme,
                rounded: contentRounded,
              }),
              className,
            )}
          >
            {content}
            <TooltipPrimitive.Arrow
              className={cn(
                tooltipArrowVariants({
                  variant: arrowVariant,
                  size: arrowSize,
                }),
              )}
            />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipProvider>
  );
}

export { Tooltip, TooltipProvider };
