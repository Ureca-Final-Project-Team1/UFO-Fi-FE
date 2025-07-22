'use client';

import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import * as React from 'react';

import { cn } from '@/lib/utils';
import { Label } from '@/shared/ui';

import { RadioGroupItem } from './RadioGroupItem';

type RadioGroupProps = {
  options: string[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  className?: string;
  color?: string;
};

export function RadioGroup({
  options,
  value,
  color,
  defaultValue,
  onValueChange,
  className,
}: RadioGroupProps) {
  return (
    <RadioGroupPrimitive.Root
      className={cn('grid gap-2', className)}
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
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
