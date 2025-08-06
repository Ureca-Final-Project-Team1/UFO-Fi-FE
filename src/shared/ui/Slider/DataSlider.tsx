import * as React from 'react';

import { cn } from '@/lib/utils';
import { getGbLabel } from '@/shared/utils/sliderUtils';

import BaseSlider from './BaseSlider';
import type { DataSliderProps } from './Slider.types';
import {
  dataSliderVariants,
  sliderMiddleLabelVariants,
  sliderTicksVariants,
  sliderTickVariants,
  sliderTickLineVariants,
  sliderTickLabelVariants,
  sliderBottomLabelVariants,
  sliderBottomLabelItemVariants,
} from './SliderVariants';

export function DataSlider({
  value,
  onValueChange,
  showTicks = false,
  showLabels = false,
  minLabel,
  maxLabel,
  showMiddleLabels = true,
  max = 10,
  padding = 'md',
  width = 'full',
  middleLabelSize = 'lg',
  middleLabelColor = 'custom',
  tickSize = 'md',
  tickLabelSize = 'xs',
  tickLabelColor = 'default',
  bottomLabelColor = 'default',
  bottomLabelItemColor = 'default',
  bottomLabelItemSize = 'xs',
}: DataSliderProps) {
  const steps = max;

  return (
    <div
      className={cn(
        dataSliderVariants({
          padding,
          width,
        }),
      )}
    >
      {/* 중앙 값 라벨 */}
      {showMiddleLabels && (
        <div
          className={cn(
            sliderMiddleLabelVariants({
              size: middleLabelSize,
              color: middleLabelColor,
            }),
          )}
        >
          {value[0]}GB
        </div>
      )}
      <div className="relative w-full mx-auto">
        {/* 눈금선 + 숫자 (min/max label은 하단에서만 표시) */}
        {showTicks && (
          <div className={cn(sliderTicksVariants())}>
            {Array.from({ length: steps + 1 }).map((_, i) => (
              <div
                key={i}
                className={cn(
                  sliderTickVariants({
                    size: tickSize,
                  }),
                )}
              >
                <div
                  className={cn(
                    sliderTickLineVariants({
                      variant: i === 0 || i === steps ? 'invisible' : 'default',
                      size: tickSize,
                    }),
                  )}
                />
                <span
                  className={cn(
                    sliderTickLabelVariants({
                      size: tickLabelSize,
                      color: tickLabelColor,
                    }),
                  )}
                >
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
        />

        {/* showTicks가 false일 때만 minLabel, maxLabel 표시 */}
        {!showTicks && (minLabel || maxLabel) && (
          <div
            className={cn(
              sliderBottomLabelVariants({
                color: bottomLabelColor,
              }),
            )}
          >
            <span>{minLabel}</span>
            <span>{maxLabel}</span>
          </div>
        )}

        {/* 아래쪽 라벨만 따로 쓰고 싶을 때 */}
        {showLabels && !showTicks && (
          <div className="mt-2 flex justify-between text-white text-xs w-full px-[2px]">
            {Array.from({ length: steps + 1 }).map((_, i) => (
              <span
                key={i}
                className={cn(
                  sliderBottomLabelItemVariants({
                    color: bottomLabelItemColor,
                    size: bottomLabelItemSize,
                  }),
                )}
              >
                {getGbLabel(i, steps)}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
