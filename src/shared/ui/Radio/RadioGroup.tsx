'use client';

import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import * as React from 'react';

import { Label } from '@/shared/ui/Label';
import { cn } from '@/utils/utils';

import { RadioGroupItem } from './RadioGroupItem';

type RadioGroupProps = {
  options: string[];
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  className?: string;
};

export function RadioGroup({ options, defaultValue, onValueChange, className }: RadioGroupProps) {
  return (
    <RadioGroupPrimitive.Root
      className={cn('grid gap-2', className)}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
    >
      {options.map((label) => {
        const value = label.toLowerCase();
        return (
          <div key={value} className="flex items-center text-white space-x-2">
            <RadioGroupItem id={value} value={value} />
            <Label htmlFor={value}>{label}</Label>
          </div>
        );
      })}
    </RadioGroupPrimitive.Root>
  );
}
