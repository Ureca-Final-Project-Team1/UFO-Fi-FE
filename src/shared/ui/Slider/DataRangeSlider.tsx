import React from 'react';

import { getRangeLabel } from '@/utils/sliderUtils';

import BaseSlider from './BaseSlider';
import type { DataSliderProps } from './Slider.types';

export function DataRangeSlider({
  value,
  onValueChange,
  minLabel,
  maxLabel,
  min = 0,
  max = 20,
}: DataSliderProps & { min?: number; max?: number }) {
  const minGap = 1;

  const handleChange = (newValue: number[]) => {
    if (newValue[1] - newValue[0] >= minGap) {
      onValueChange(newValue);
    }
  };

  return (
    <div className="w-full max-w-md px-4">
      <div className="text-center font-bold text-lg mb-2 text-cyan-300">
        {getRangeLabel(value, max)}
      </div>
      <BaseSlider
        thumbs={value}
        min={min}
        max={max}
        step={1}
        value={value}
        onValueChange={handleChange}
        className="relative flex w-full touch-none select-none items-center"
        getThumbValueText={(v) => `${v}ZET`}
      />
      {(minLabel || maxLabel) && (
        <div className="flex justify-between text-white text-sm mt-1">
          <span>{minLabel}</span>
          <span>{maxLabel}</span>
        </div>
      )}
    </div>
  );
}
