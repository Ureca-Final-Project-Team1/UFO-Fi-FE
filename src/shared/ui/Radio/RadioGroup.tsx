'use client';

import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';

import { cn } from '@/lib/utils';
import { Label } from '@/shared/ui/Label';

import { RadioGroupItem } from './RadioGroupItem';
import { radioGroupVariants } from './radioVariants';

export interface RadioGroupProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root> {
  options: string[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  color?: string;
  variant?: 'default' | 'vertical' | 'horizontal';
  size?: 'default' | 'compact' | 'large';
}

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
