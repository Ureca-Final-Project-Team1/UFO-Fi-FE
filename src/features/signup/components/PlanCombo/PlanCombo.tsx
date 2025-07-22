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

export function PlanCombo({ planNames = [], onSelect, value }: PlanComboProps) {
  const [input, setInput] = useState('');
  const [selected, setSelected] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [hasUserSelected, setHasUserSelected] = useState(false);

  useEffect(() => {
    if (value && !hasUserSelected) {
      setInput(value);
      setSelected(value);
    }
  }, [value, hasUserSelected]);

  useEffect(() => {
    if (planNames.length > 0 && !hasUserSelected) {
      setIsOpen(true);
    }
    setHasUserSelected(false);
  }, [planNames, hasUserSelected]);

  const handlePlanSelect = (value: string) => {
    const newValue = value === selected ? '' : value;
    setSelected(newValue);
    setInput(newValue);
    setIsOpen(false);
    setHasUserSelected(true);
    onSelect?.(newValue);
  };

  return (
    <div className="relative w-full">
      <Command className="w-full">
        <CommandInput
          placeholder="요금제를 선택해 주세요."
          value={input}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 100)}
          onInput={(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.currentTarget.value)}
          className="h-[50px] justify-between text-[16px]"
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
                    {selected === name && <Icon name="Check" className="ml-auto opacity-100" />}
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
