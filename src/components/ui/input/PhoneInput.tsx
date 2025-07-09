import { useState } from 'react';

import { cn } from '@/lib/utils';

import { Input } from './input';
import { CustomInputProps } from './Input.types';

export function PhoneInput(props: CustomInputProps) {
  const [innerValue, setInnerValue] = useState('');

  const formatPhoneNumber = (input: string) => {
    const onlyNums = input.replace(/\D/g, '');
    if (onlyNums.length <= 3) return onlyNums;
    if (onlyNums.length <= 7) return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3)}`;
    return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3, 7)}-${onlyNums.slice(7, 11)}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setInnerValue(formatted);
    props.onChange?.(e);
  };

  const valueToUse = props.value ?? innerValue;

  return (
    <Input
      {...props}
      value={valueToUse}
      onChange={handleChange}
      inputMode="numeric"
      pattern="[0-9\-]*"
      placeholder="숫자만 입력 가능합니다."
      className={cn(
        'bg-white text-black placeholder-gray-400 border border-gray-300 rounded-md',
        props.className,
      )}
    />
  );
}
