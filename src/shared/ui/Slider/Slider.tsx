'use client';

import * as SliderPrimitive from '@radix-ui/react-slider';
import React, { useMemo } from 'react';

import { cn } from '@/lib/utils';

import type { SliderProps } from './Slider.types';
import {
  sliderVariants,
  sliderTrackVariants,
  sliderRangeVariants,
  sliderThumbVariants,
} from './SliderVariants';

const Slider = ({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  range = false,
  orientation = 'horizontal',
  size = 'md',
  disabled = false,
  trackVariant = 'default',
  trackSize = 'md',
  rangeVariant = 'default',
  thumbSize = 'md',
  thumbVariant = 'default',
  thumbRingColor = 'default',
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
      className={cn(
        sliderVariants({
          orientation,
          size,
          disabled,
        }),
        className,
      )}
      {...props}
    >
      <SliderPrimitive.Track
        data-slot="slider-track"
        className={cn(
          sliderTrackVariants({
            orientation,
            variant: trackVariant,
            size: trackSize,
          }),
        )}
      >
        <SliderPrimitive.Range
          data-slot="slider-range"
          className={cn(
            sliderRangeVariants({
              orientation,
              variant: rangeVariant,
            }),
          )}
        />
      </SliderPrimitive.Track>
      {Array.from({ length: range ? _values.length : 1 }, (_, index) => (
        <SliderPrimitive.Thumb
          data-slot="slider-thumb"
          key={index}
          className={cn(
            sliderThumbVariants({
              size: thumbSize,
              variant: thumbVariant,
              ringColor: thumbRingColor,
            }),
          )}
        />
      ))}
    </SliderPrimitive.Root>
  );
};

export default Slider;
