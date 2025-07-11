'use client';

import * as LabelPrimitive from '@radix-ui/react-label';
import * as React from 'react';

import { cn } from '@/utils/utils';

import { LabelProps } from './Label.types';
import { labelVariants } from './labelVariants';

function Label({ className, ...props }: LabelProps) {
  return (
    <LabelPrimitive.Root data-slot="label" className={cn(labelVariants, className)} {...props} />
  );
}

export default Label;
