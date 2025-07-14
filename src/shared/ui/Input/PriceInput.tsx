'use client';

import { useState } from 'react';

import { cn } from '@/lib/utils';
import { formatPrice } from '@/utils/formatPrice';
import { getOnlyNumbers } from '@/utils/getOnlyNumbers';

import { Input } from './Input';
import { CustomInputProps } from './Input.types';

export function PriceInput(props: CustomInputProps) {
  // rawValue: 숫자만 (실제 값)
  const [rawValue, setRawValue] = useState('');
  // 표시용 포맷팅 값 (1,000 단위)
  const formattedValue = formatPrice(rawValue);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const onlyNums = getOnlyNumbers(e.target.value);
    setRawValue(onlyNums);
    props.onChange?.(e); // 외부 핸들러 유지
  };

  return (
    <Input
      {...props}
      value={formattedValue}
      onChange={handleChange}
      inputMode="numeric"
      pattern="[0-9,]*"
      placeholder="금액 입력"
      className={cn(
        'bg-[var(--color-badge-bg-dark)] text-[var(--color-text-selling)] text-center font-semibold placeholder-[var(--color-text-selling)]',
        props.className,
      )}
    />
  );
}
