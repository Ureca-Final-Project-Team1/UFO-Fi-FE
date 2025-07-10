import * as React from 'react';

import { getGbLabel } from '@/lib/sliderUtils';

import BaseSlider from './BaseSlider';
import type { DataSliderProps } from './Slider.types';

export function DataSlider({
  value,
  onValueChange,
  showTicks = false,
  showLabels = false,
  minLabel,
  maxLabel,
  max = 10, // 기본값 10, props로 받을 수 있게
}: DataSliderProps & { max?: number }) {
  const steps = max;

  return (
    <div className="relative w-full max-w-md px-4">
      {/* 중앙 값 라벨 */}
      <div className="text-center text-cyan-300 font-bold text-lg mb-2">{value[0]}GB</div>

      <div className="relative w-full max-w-[320px] mx-auto">
        {/* 눈금선 + 숫자 (min/max label은 하단에서만 표시) */}
        {showTicks && (
          <div className="absolute left-0 right-0 flex justify-between px-[2px] z-10">
            {Array.from({ length: steps + 1 }).map((_, i) => (
              <div key={i} className="flex flex-col items-center w-0">
                <div
                  className={`h-4 w-0.5 ${i === 0 || i === steps ? 'invisible' : 'bg-white opacity-70'}`}
                />
                <span className="text-xs text-white mt-1">{getGbLabel(i, steps)}</span>
              </div>
            ))}
          </div>
        )}

        {/* 슬라이더 바와 Thumb만 BaseSlider로 분리 */}
        <BaseSlider
          thumbs={value}
          min={0}
          max={steps}
          step={1}
          value={value}
          onValueChange={onValueChange}
          className="relative z-20 flex w-full touch-none select-none items-center"
          getThumbValueText={(v) => `${v}GB`}
        />

        {/* showTicks가 false일 때만 minLabel, maxLabel 표시 */}
        {!showTicks && (minLabel || maxLabel) && (
          <div className="flex justify-between text-xs text-gray-400 mt-2">
            <span>{minLabel}</span>
            <span>{maxLabel}</span>
          </div>
        )}

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
