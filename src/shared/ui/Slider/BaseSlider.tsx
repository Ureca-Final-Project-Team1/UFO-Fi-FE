import * as SliderPrimitive from '@radix-ui/react-slider';
import React from 'react';

interface BaseSliderProps extends React.ComponentProps<typeof SliderPrimitive.Root> {
  thumbs: number[];
  getThumbValueText?: (value: number, index: number) => string;
}

const BaseSlider = ({ thumbs, getThumbValueText, ...props }: BaseSliderProps) => (
  <SliderPrimitive.Root {...props}>
    <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-gray-300">
      <SliderPrimitive.Range className="absolute h-full bg-gradient-to-r from-[var(--color-badge-text-cyan)] to-[var(--color-exploration-gradient-to)]" />
    </SliderPrimitive.Track>
    {thumbs.map((value, i) => (
      <SliderPrimitive.Thumb
        key={i}
        className="block h-5 w-5 rounded-full border-2 border-white bg-pink-500 shadow"
        aria-label={`슬라이더 썸 ${i + 1}`}
        aria-valuetext={getThumbValueText ? getThumbValueText(value, i) : `${value}`}
      />
    ))}
  </SliderPrimitive.Root>
);

export default BaseSlider;
