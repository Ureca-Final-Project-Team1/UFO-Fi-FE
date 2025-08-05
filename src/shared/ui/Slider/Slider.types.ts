import * as SliderPrimitive from '@radix-ui/react-slider';
import { VariantProps } from 'class-variance-authority';
import * as React from 'react';

import {
  sliderRootVariants,
  sliderTrackVariants,
  sliderRangeVariants,
  sliderThumbVariants,
  baseSliderTrackVariants,
  baseSliderThumbVariants,
  dataSliderContainerVariants,
  dataSliderMiddleLabelVariants,
  dataSliderTicksContainerVariants,
  dataSliderTickLineVariants,
  dataSliderTickTextVariants,
  dataSliderLabelsContainerVariants,
  dataSliderBottomLabelsVariants,
} from './SliderVariants';

export interface DataSliderProps extends VariantProps<typeof dataSliderContainerVariants> {
  value: number[];
  onValueChange: (val: number[]) => void;
  showTicks?: boolean;
  showLabels?: boolean;
  minLabel?: React.ReactNode; // 최소값 라벨
  maxLabel?: React.ReactNode; // 최대값 라벨
  showMiddleLabels?: boolean;
  size?: VariantProps<typeof baseSliderThumbVariants>['size'];
  className?: string;
}

export interface SliderProps
  extends Omit<React.ComponentProps<typeof SliderPrimitive.Root>, 'disabled' | 'orientation'> {
  range?: boolean;
  variant?: VariantProps<typeof sliderRootVariants>['variant'];
  size?: VariantProps<typeof sliderRootVariants>['size'];
  orientation?: VariantProps<typeof sliderRootVariants>['orientation'];
  disabled?: VariantProps<typeof sliderRootVariants>['disabled'];
}

export interface BaseSliderProps
  extends React.ComponentProps<typeof SliderPrimitive.Root>,
    VariantProps<typeof baseSliderTrackVariants> {
  thumbs: number[];
  getThumbValueText?: (value: number, index: number) => string;
}

export interface SliderTrackProps extends VariantProps<typeof sliderTrackVariants> {
  className?: string;
}

export interface SliderRangeProps extends VariantProps<typeof sliderRangeVariants> {
  className?: string;
}

export interface SliderThumbProps extends VariantProps<typeof sliderThumbVariants> {
  className?: string;
}

export interface DataSliderMiddleLabelProps
  extends VariantProps<typeof dataSliderMiddleLabelVariants> {
  children: React.ReactNode;
}

export interface DataSliderTicksContainerProps
  extends VariantProps<typeof dataSliderTicksContainerVariants> {
  children: React.ReactNode;
}

export interface DataSliderTickLineProps extends VariantProps<typeof dataSliderTickLineVariants> {
  isVisible?: boolean;
}

export interface DataSliderTickTextProps extends VariantProps<typeof dataSliderTickTextVariants> {
  children: React.ReactNode;
}

export interface DataSliderLabelsContainerProps
  extends VariantProps<typeof dataSliderLabelsContainerVariants> {
  children: React.ReactNode;
}

export interface DataSliderBottomLabelsProps
  extends VariantProps<typeof dataSliderBottomLabelsVariants> {
  children: React.ReactNode;
}
