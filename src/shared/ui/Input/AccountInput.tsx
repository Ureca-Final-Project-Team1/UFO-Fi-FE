'use client';

import { useState } from 'react';

import { cn } from '@/lib/utils';
import { getOnlyNumbers } from '@/utils/getOnlyNumbers';

import { Input } from './Input';
import { CustomInputProps } from './Input.types';

export function AccountInput(props: CustomInputProps) {
  const [innerValue, setInnerValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const onlyNums = getOnlyNumbers(e.target.value); // 숫자만 남기기
    setInnerValue(onlyNums);
    props.onChange?.(e);
  };

  const valueToUse = props.value ?? innerValue;

  return (
    <Input
      {...props}
      value={valueToUse}
      onChange={handleChange}
      inputMode="numeric"
      pattern="[0-9]*"
      placeholder="계좌번호 입력"
      className={cn(
        'bg-[#030824] border border-white/20 text-white placeholder-white/50 rounded-md',
        props.className,
      )}
    />
  );
}
