import type * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import type { ComponentProps } from 'react';

export type RadioGroupProps = ComponentProps<typeof RadioGroupPrimitive.Root>;

export type RadioGroupItemProps = ComponentProps<typeof RadioGroupPrimitive.Item> & {
  'aria-label'?: string;
};
