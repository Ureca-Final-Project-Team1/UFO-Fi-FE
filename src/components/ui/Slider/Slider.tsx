'use client';

import * as SliderPrimitive from '@radix-ui/react-slider';
import React, { useMemo } from 'react';

import { cn } from '@/lib/utils';

// range가 true면 value/defaultValue가 배열이어야 하며, 아니면 단일 값이어야 함
// 여러 Thumb 지원을 위해 _values 배열 생성
const Slider = ({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  range = false, // 단일/범위 슬라이더 구분용 prop
  ...props
}: React.ComponentProps<typeof SliderPrimitive.Root> & { range?: boolean }) => {
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
        'relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col',
        className,
      )}
      {...props}
    >
      <SliderPrimitive.Track
        data-slot="slider-track"
        className={cn(
          'bg-muted relative grow overflow-hidden rounded-full data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5',
        )}
      >
        <SliderPrimitive.Range
          data-slot="slider-range"
          className={cn(
            'bg-primary absolute data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full',
          )}
        />
      </SliderPrimitive.Track>
      {Array.from({ length: range ? _values.length : 1 }, (_, index) => (
        <SliderPrimitive.Thumb
          data-slot="slider-thumb"
          key={index}
          className="border-primary bg-background ring-ring/50 block size-4 shrink-0 rounded-full border shadow-sm transition-[color,box-shadow] hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50"
        />
      ))}
    </SliderPrimitive.Root>
  );
};

export default Slider;
