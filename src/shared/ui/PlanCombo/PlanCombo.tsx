'use client';

import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';
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
  const [showList, setShowList] = useState(true);

  const handlePlanSelect = (value: string) => {
    const newValue = value === selected ? '' : value;
    setSelected(newValue);
    setInput(newValue);
    onSelect?.(newValue);
  };

  useEffect(() => {
    if (input === selected && input !== '') setShowList(false);
    else setShowList(true);
  }, [input, selected]);

  return (
    <div>
      <p className={planComboHeaderClass}>요금제 선택</p>
      <Command className="w-[260px]">
        <CommandInput
          placeholder="요금제를 선택해 주세요."
          value={input}
          onInput={(e) => setInput(e.currentTarget.value)}
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
                  <Icon
                    name="Check"
                    className={cn('ml-auto', selected === name ? 'opacity-100' : 'opacity-0')}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        )}
      </Command>
    </div>
  );
}
