import * as SliderPrimitive from '@radix-ui/react-slider';
import React from 'react';

import { cn } from '@/lib/utils';

import { BaseSliderProps } from './Slider.types';
import {
  baseSliderTrackVariants,
  baseSliderRangeVariants,
  baseSliderThumbVariants,
} from './SliderVariants';

const BaseSlider = ({
  thumbs,
  getThumbValueText,
  variant = 'default',
  size = 'default',
  className,
  ...props
}: BaseSliderProps) => (
  <SliderPrimitive.Root className={cn(className)} {...props}>
    <SliderPrimitive.Track className={cn(baseSliderTrackVariants({ variant, size }))}>
      <SliderPrimitive.Range className={cn(baseSliderRangeVariants({ variant }))} />
    </SliderPrimitive.Track>
    {thumbs.map((value, i) => (
      <SliderPrimitive.Thumb
        key={i}
        className={cn(baseSliderThumbVariants({ variant, size }))}
        aria-label={`슬라이더 썸 ${i + 1}`}
        aria-valuetext={getThumbValueText ? getThumbValueText(value, i) : `${value}`}
      />
    ))}
  </SliderPrimitive.Root>
);

export default BaseSlider;
