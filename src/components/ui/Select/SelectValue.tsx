'use client';

import * as SelectPrimitive from '@radix-ui/react-select';
import * as React from 'react';

import type { SelectValueProps } from './Select.types';

export function SelectValue(props: SelectValueProps) {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />;
}
