'use client';

import * as SelectPrimitive from '@radix-ui/react-select';
import * as React from 'react';

import { cn } from '@/lib/utils';

import type { SelectLabelProps } from './Select.types';

export function SelectLabel({ className, ...props }: SelectLabelProps) {
  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      className={cn('text-muted-foreground px-2 py-1.5 text-xs', className)}
      {...props}
    />
  );
}
