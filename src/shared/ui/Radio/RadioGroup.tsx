'use client';

import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import * as React from 'react';

import { cn } from '@/lib/utils';
import { Label } from '@/shared';

import { RadioGroupProps } from './Radio.types';
import { RadioGroupItem } from './RadioGroupItem';
import { radioGroupVariants } from './RadioVariants';

export function RadioGroup({
  options,
  value,
  color,
  defaultValue,
  onValueChange,
  className,
  variant = 'default',
  size = 'default',
  ...props
}: RadioGroupProps) {
  return (
    <RadioGroupPrimitive.Root
      className={cn(radioGroupVariants({ variant, size }), className)}
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      {...props}
    >
      {options.map((label) => {
        const val = label.toLowerCase();
        return (
          <div key={val} className={`flex items-center text-${color || 'white'} space-x-2`}>
            <RadioGroupItem id={val} value={val} color={color || 'white'} />
            <Label htmlFor={val}>{label}</Label>
          </div>
        );
      })}
    </RadioGroupPrimitive.Root>
  );
}
