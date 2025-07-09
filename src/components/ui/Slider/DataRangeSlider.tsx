import * as SliderPrimitive from '@radix-ui/react-slider';
import * as React from 'react';

import { getRangeLabel } from '@/lib/sliderUtils';

import type { DataSliderProps } from './Slider.types';

export function DataRangeSlider({ value, onValueChange }: DataSliderProps) {
  const minGap = 1; // 최소 간격: 500원 (1칸)

  const handleChange = (newValue: number[]) => {
    if (newValue[1] - newValue[0] >= minGap) {
      onValueChange(newValue);
    }
  };

  return (
    <div className="w-full max-w-md px-4">
      <div className="text-center font-bold text-lg mb-2 text-cyan-300">{getRangeLabel(value)}</div>

      <SliderPrimitive.Root
        className="relative flex w-[290px] touch-none select-none items-center"
        min={0}
        max={20}
        step={1}
        value={value}
        onValueChange={handleChange}
      >
        <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-gray-300">
          <SliderPrimitive.Range className="absolute h-full bg-gradient-to-r from-[var(--color-badge-text-cyan)] to-[var(--color-exploration-gradient-to)]" />
        </SliderPrimitive.Track>
        {value.map((_, i) => (
          <SliderPrimitive.Thumb
            key={i}
            className="block h-5 w-5 rounded-full border-2 border-white bg-pink-500 shadow"
          />
        ))}
      </SliderPrimitive.Root>

      <div className="flex justify-between text-white text-sm mt-1">
        <span>0원</span>
        <span>10,000원</span>
      </div>
    </div>
  );
}
