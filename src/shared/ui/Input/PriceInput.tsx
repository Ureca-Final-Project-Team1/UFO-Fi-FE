'use client';

import { useState } from 'react';

import { cn } from '@/lib/utils';
import { formatPrice } from '@/shared/utils/formatPrice';
import { getOnlyNumbers } from '@/shared/utils/getOnlyNumbers';

import { Input } from './Input';
import { CustomInputProps } from './Input.types';

export function PriceInput(props: CustomInputProps) {
  const [internalValue, setInternalValue] = useState('');
  const isControlled = props.value !== undefined;
  const currentValue = isControlled ? String(props.value || '') : internalValue;
  const formattedValue = formatPrice(currentValue); // 표시용 포맷팅 값

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const onlyNums = getOnlyNumbers(e.target.value);
    if (onlyNums.length > 4) {
      return;
    }
    if (!isControlled) {
      setInternalValue(onlyNums);
    }

    const syntheticEvent = {
      ...e,
      target: { ...e.target, value: onlyNums },
    };
    props.onChange?.(syntheticEvent);
  };

  return (
    <Input
      {...props}
      value={formattedValue}
      onChange={handleChange}
      inputMode="numeric"
      pattern="[0-9,]*"
      maxLength={4}
      placeholder="금액 입력"
      className={cn(
        'bg-[#001f9c] text-cyan-400 text-center font-semibold placeholder-cyan-400 text-base md:text-lg',
        props.className,
      )}
    />
  );
}
