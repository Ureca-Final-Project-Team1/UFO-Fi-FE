import * as React from 'react';

import { cn } from '@/lib/utils';
import { getGbLabel } from '@/shared/utils/sliderUtils';

import BaseSlider from './BaseSlider';
import type { DataSliderProps } from './Slider.types';
import {
  dataSliderContainerVariants,
  dataSliderMiddleLabelVariants,
  dataSliderTicksContainerVariants,
  dataSliderTickLineVariants,
  dataSliderTickTextVariants,
  dataSliderLabelsContainerVariants,
  dataSliderBottomLabelsVariants,
} from './SliderVariants';

export function DataSlider({
  value,
  onValueChange,
  showTicks = false,
  showLabels = false,
  minLabel,
  maxLabel,
  showMiddleLabels = true,
  max = 10, // 기본값 10, props로 받을 수 있게
  variant = 'default',
  size = 'default',
  className,
}: DataSliderProps & { max?: number }) {
  const steps = max;

  return (
    <div className={cn(dataSliderContainerVariants({ variant }), className)}>
      {/* 중앙 값 라벨 */}
      {showMiddleLabels && (
        <div className={cn(dataSliderMiddleLabelVariants({ variant }))}>{value[0]}GB</div>
      )}
      <div className="relative w-full mx-auto">
        {/* 눈금선 + 숫자 (min/max label은 하단에서만 표시) */}
        {showTicks && (
          <div className={cn(dataSliderTicksContainerVariants({ variant }))}>
            {Array.from({ length: steps + 1 }).map((_, i) => (
              <div key={i} className="flex flex-col items-center w-0">
                <div
                  className={cn(
                    dataSliderTickLineVariants({ variant }),
                    i === 0 || i === steps ? 'invisible' : '',
                  )}
                />
                <span className={cn(dataSliderTickTextVariants({ variant }))}>
                  {getGbLabel(i, steps)}
                </span>
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
          variant={variant}
          size={size}
        />

        {/* showTicks가 false일 때만 minLabel, maxLabel 표시 */}
        {!showTicks && (minLabel || maxLabel) && (
          <div className={cn(dataSliderLabelsContainerVariants({ variant }))}>
            <span>{minLabel}</span>
            <span>{maxLabel}</span>
          </div>
        )}

        {/* 아래쪽 라벨만 따로 쓰고 싶을 때 */}
        {showLabels && !showTicks && (
          <div className={cn(dataSliderBottomLabelsVariants({ variant }))}>
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
