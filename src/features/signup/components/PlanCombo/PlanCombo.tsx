'use client';

import { useEffect, useState } from 'react';

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  Icon,
} from '@/shared';

import type { PlanComboProps } from './PlanCombo.types';
import { planComboItemClass } from './planComboVariants';

export function PlanCombo({
  planNames = [],
  onSelect,
  value,
  disabled = false,
  placeholder,
}: PlanComboProps) {
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setInput(value || '');
  }, [value]);

  const handlePlanSelect = (selectedValue: string) => {
    const newValue = selectedValue === value ? '' : selectedValue;
    onSelect?.(newValue);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full">
      <Command className="w-full">
        <CommandInput
          placeholder={placeholder || '요금제를 선택해 주세요.'}
          value={input}
          onFocus={() => !disabled && setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 100)}
          onInput={(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.currentTarget.value)}
          className="h-9 justify-between rounded-md text-[14px] md:text-[16px] placeholder:text-gray-400"
          disabled={disabled}
        />

        {isOpen && (
          <div className="absolute top-full left-0 z-10 mt-1 w-full rounded-md bg-white shadow-lg border">
            <CommandList>
              <CommandEmpty>해당 요금제가 없습니다.</CommandEmpty>
              <CommandGroup>
                {planNames.map((name) => (
                  <CommandItem
                    key={name}
                    value={name}
                    onSelect={() => handlePlanSelect(name)}
                    className={planComboItemClass}
                  >
                    {name}
                    {value === name && <Icon name="Check" className="ml-auto opacity-100" />}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </div>
        )}
      </Command>
    </div>
  );
}
