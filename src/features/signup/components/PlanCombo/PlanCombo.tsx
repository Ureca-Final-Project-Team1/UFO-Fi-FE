'use client';

import { useState } from 'react';

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
import { planComboHeaderClass, planComboItemClass } from './planComboVariants';

export function PlanCombo({ planNames = [], onSelect }: PlanComboProps) {
  const [input, setInput] = useState('');
  const [selected, setSelected] = useState('');

  const handlePlanSelect = (value: string) => {
    const newValue = value === selected ? '' : value;
    setSelected(newValue);
    setInput(newValue);
    onSelect?.(newValue);
  };

  const showList = input !== selected || input === '';

  return (
    <div>
      <p className={planComboHeaderClass}>요금제 선택</p>
      <Command className="w-[260px]">
        <CommandInput
          placeholder="요금제를 선택해 주세요."
          value={input}
          onInput={(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.currentTarget.value)}
          className="h-[50px] justify-between text-[16px]"
        />

        {showList && (
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
        )}
      </Command>
    </div>
  );
}
