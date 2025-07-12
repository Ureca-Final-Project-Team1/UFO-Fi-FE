'use client';

import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import * as React from 'react';

import { cn } from '@/lib/utils';

import { RadioGroupItemProps } from './Radio.types';
import { radioItem } from './radioVariants';

export function RadioGroupItem({
  className,
  value,
  color,
  'aria-label': ariaLabel,
  ...rest
}: RadioGroupItemProps) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      className={cn(radioItem(), className)}
      value={value}
      aria-label={ariaLabel || 'Radio option'}
      {...rest}
    >
      <RadioGroupPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="relative flex items-center justify-center"
      >
        <div className={`rounded-full w-3 h-3 bg-${color}`} />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
}
