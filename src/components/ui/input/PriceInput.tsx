import { useState } from 'react';

import { cn } from '@/lib/utils';

import { Input } from './Input';
import { CustomInputProps } from './Input.types';

export function PriceInput(props: CustomInputProps) {
  const [value, setValue] = useState('');

  const formatPrice = (input: string) => {
    const onlyNums = input.replace(/[^0-9]/g, '');
    if (!onlyNums) return '';
    return Number(onlyNums).toLocaleString('ko-KR');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPrice(e.target.value);
    setValue(formatted);
    props.onChange?.(e); // 외부 핸들러 유지
  };

  return (
    <Input
      {...props}
      value={value}
      onChange={handleChange}
      inputMode="numeric"
      pattern="[0-9,]*"
      placeholder="금액 입력"
      className={cn(
        'bg-[#001f9c] text-[#23d8ff] text-center font-semibold placeholder-[#23d8ff]',
        props.className,
      )}
    />
  );
}
