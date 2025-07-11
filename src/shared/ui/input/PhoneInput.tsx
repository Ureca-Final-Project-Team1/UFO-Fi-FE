import { useState } from 'react';

import { formatPhoneNumber } from '@/utils/formatPhoneNumber';
import { cn } from '@/utils/utils';

import { Input } from './Input';
import { CustomInputProps } from './Input.types';

export function PhoneInput(props: CustomInputProps) {
  const [innerValue, setInnerValue] = useState('');

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
