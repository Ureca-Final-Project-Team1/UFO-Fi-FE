'use client';

import * as SliderPrimitive from '@radix-ui/react-slider';
import React, { useMemo } from 'react';

import { cn } from '@/lib/utils';

import { SliderProps } from './Slider.types';
import {
  sliderRootVariants,
  sliderTrackVariants,
  sliderRangeVariants,
  sliderThumbVariants,
} from './SliderVariants';

// range가 true면 value/defaultValue가 배열이어야 하며, 아니면 단일 값이어야 함
// 여러 Thumb 지원을 위해 _values 배열 생성
const Slider = ({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  range = false, // 단일/범위 슬라이더 구분용 prop
  variant = 'default',
  size = 'default',
  orientation = 'horizontal',
  disabled = false,
  ...props
}: SliderProps) => {
  const _values = useMemo(
    () =>
      range
        ? Array.isArray(value)
          ? value
          : Array.isArray(defaultValue)
            ? defaultValue
            : [min, max]
        : [
            typeof value === 'number'
              ? value
              : typeof defaultValue === 'number'
                ? defaultValue
                : min,
          ],
    [value, defaultValue, min, max, range],
  );

  return (
    <SliderPrimitive.Root
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      className={cn(sliderRootVariants({ variant, size, orientation, disabled }), className)}
      {...props}
    >
      <SliderPrimitive.Track
        data-slot="slider-track"
        className={cn(sliderTrackVariants({ variant, size, orientation }))}
      >
        <SliderPrimitive.Range
          data-slot="slider-range"
          className={cn(sliderRangeVariants({ variant, orientation }))}
        />
      </SliderPrimitive.Track>
      {Array.from({ length: range ? _values.length : 1 }, (_, index) => (
        <SliderPrimitive.Thumb
          data-slot="slider-thumb"
          key={index}
          className={cn(
            sliderThumbVariants({ variant, size, state: disabled ? 'disabled' : 'default' }),
          )}
        />
      ))}
    </SliderPrimitive.Root>
  );
};

export default Slider;
