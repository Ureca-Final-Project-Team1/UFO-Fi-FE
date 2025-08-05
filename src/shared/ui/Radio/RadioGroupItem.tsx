'use client';

import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import * as React from 'react';

import { cn } from '@/lib/utils';

import { RadioGroupItemProps } from './Radio.types';
import { radioItemVariants } from './RadioVariants';

export function RadioGroupItem({
  className,
  value,
  color,
  variant = 'default',
  size = 'default',
  'aria-label': ariaLabel,
  ...rest
}: RadioGroupItemProps) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      className={cn(radioItemVariants({ variant, size, color }), className)}
      value={value}
      aria-label={ariaLabel || 'Radio option'}
      {...rest}
    >
      <RadioGroupPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="relative flex items-center justify-center"
      >
        <div className={`rounded-full size-3 bg-${color}`} />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
}
