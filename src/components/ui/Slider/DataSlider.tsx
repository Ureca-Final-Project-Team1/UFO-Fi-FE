import * as SliderPrimitive from '@radix-ui/react-slider';
import * as React from 'react';

import { getGbLabel } from '@/lib/sliderUtils';

import type { DataSliderProps } from './Slider.types';

export function DataSlider({
  value,
  onValueChange,
  showTicks = false,
  showLabels = false,
}: DataSliderProps) {
  const steps = 10;

  return (
    <div className="relative w-full max-w-md px-4">
      <div className="text-center text-cyan-300 font-bold text-lg mb-2">{value[0]}GB</div>

      <div className="relative w-full max-w-[320px] mx-auto">
        {/* 눈금선 + 숫자 */}
        {showTicks && (
          <div className="absolute left-0 right-0 flex justify-between px-[2px] z-10">
            {Array.from({ length: steps + 1 }).map((_, i) => (
              <div key={i} className="flex flex-col items-center w-0">
                {/* 0GB, 10GB는 투명한 박스로 자리 확보 */}
                <div
                  className={`h-4 w-0.5 ${i === 0 || i === steps ? 'invisible' : 'bg-white opacity-70'}`}
                />
                <span className="text-xs text-white mt-1">{getGbLabel(i, steps)}</span>
              </div>
            ))}
          </div>
        )}

        {/* 슬라이더 */}
        <SliderPrimitive.Root
          className="relative z-20 flex w-full touch-none select-none items-center"
          min={0}
          max={steps}
          step={1}
          value={value}
          onValueChange={onValueChange}
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

        {/* 아래쪽 라벨만 따로 쓰고 싶을 때 */}
        {showLabels && !showTicks && (
          <div className="mt-2 flex justify-between text-white text-xs w-full px-[2px]">
            {Array.from({ length: steps + 1 }).map((_, i) => (
              <span key={i} className="w-[1px] -translate-x-1/2 text-center">
                {getGbLabel(i, steps)}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
