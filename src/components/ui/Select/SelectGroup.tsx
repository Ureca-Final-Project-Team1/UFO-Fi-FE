'use client';

import * as SelectPrimitive from '@radix-ui/react-select';
import * as React from 'react';

import type { SelectGroupProps } from './Select.types';

export function SelectGroup(props: SelectGroupProps) {
  return <SelectPrimitive.Group data-slot="select-group" {...props} />;
}
