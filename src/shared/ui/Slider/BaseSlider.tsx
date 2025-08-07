import * as SliderPrimitive from '@radix-ui/react-slider';
import React from 'react';

import { cn } from '@/lib/utils';

import { sliderTrackVariants, sliderRangeVariants, sliderThumbVariants } from './SliderVariants';

interface BaseSliderProps extends React.ComponentProps<typeof SliderPrimitive.Root> {
  thumbs: number[];
  getThumbValueText?: (value: number, index: number) => string;
  trackVariant?: 'default' | 'primary' | 'secondary' | 'accent' | 'custom';
  trackSize?: 'sm' | 'md' | 'lg';
  rangeVariant?: 'default' | 'primary' | 'secondary' | 'accent' | 'gradient' | 'custom';
  thumbSize?: 'sm' | 'md' | 'lg';
  thumbVariant?: 'default' | 'primary' | 'secondary' | 'accent' | 'custom';
  thumbRingColor?: 'default' | 'primary' | 'secondary' | 'accent' | 'custom';
}

const BaseSlider = ({
  thumbs,
  getThumbValueText,
  trackVariant = 'default',
  trackSize = 'md',
  rangeVariant = 'default',
  thumbSize = 'md',
  thumbVariant = 'default',
  thumbRingColor = 'default',
  ...props
}: BaseSliderProps) => (
  <SliderPrimitive.Root {...props}>
    <SliderPrimitive.Track
      className={cn(
        sliderTrackVariants({
          variant: trackVariant,
          size: trackSize,
        }),
      )}
    >
      <SliderPrimitive.Range
        className={cn(
          sliderRangeVariants({
            variant: rangeVariant,
          }),
        )}
      />
    </SliderPrimitive.Track>
    {thumbs.map((value, i) => (
      <SliderPrimitive.Thumb
        key={i}
        className={cn(
          sliderThumbVariants({
            size: thumbSize,
            variant: thumbVariant,
            ringColor: thumbRingColor,
          }),
        )}
        aria-label={`슬라이더 썸 ${i + 1}`}
        aria-valuetext={getThumbValueText ? getThumbValueText(value, i) : `${value}`}
      />
    ))}
  </SliderPrimitive.Root>
);

export default BaseSlider;
