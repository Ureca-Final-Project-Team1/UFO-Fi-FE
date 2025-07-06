'use client';

import * as SelectPrimitive from '@radix-ui/react-select';
import { CheckIcon } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/lib/utils';

import type { SelectItemProps } from './Select.types';

export function SelectItem({ className, children, ...props }: SelectItemProps) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        className,
        props.disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
      )}
      disabled={props.disabled}
      {...props}
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      <span className="absolute right-2 flex size-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <CheckIcon className="size-4" />
        </SelectPrimitive.ItemIndicator>
      </span>
    </SelectPrimitive.Item>
  );
}
