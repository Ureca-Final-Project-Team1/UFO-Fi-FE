'use client';

import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { Check } from 'lucide-react';

import { cn } from '@/lib/utils';

import { radioItemVariants } from './radioVariants';

export interface RadioGroupItemProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> {
  'aria-label'?: string;
  color?: string;
  variant?: 'default' | 'filled' | 'outlined';
  size?: 'default' | 'sm' | 'lg';
}

export function RadioGroupItem({
  className,
  variant = 'default',
  size = 'default',
  color,
  ...props
}: RadioGroupItemProps) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      data-variant={variant}
      data-size={size}
      className={cn(radioItemVariants({ variant, size, color: color as string }), className)}
      {...props}
    >
      <RadioGroupPrimitive.Indicator asChild>
        <Check className="size-full p-0.5" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
}
