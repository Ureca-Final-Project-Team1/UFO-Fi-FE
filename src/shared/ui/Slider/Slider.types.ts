import * as SliderPrimitive from '@radix-ui/react-slider';
import type { VariantProps } from 'class-variance-authority';
import type { ComponentProps } from 'react';

import {
  sliderVariants,
  sliderTrackVariants,
  sliderRangeVariants,
  sliderThumbVariants,
  dataSliderVariants,
  sliderMiddleLabelVariants,
  sliderTicksVariants,
  sliderTickVariants,
  sliderTickLineVariants,
  sliderTickLabelVariants,
  sliderBottomLabelVariants,
  sliderBottomLabelItemVariants,
} from './SliderVariants';

// 기본 Slider Props
export interface SliderProps
  extends Omit<ComponentProps<typeof SliderPrimitive.Root>, 'disabled' | 'orientation' | 'size'> {
  range?: boolean;
  orientation?: VariantProps<typeof sliderVariants>['orientation'];
  size?: VariantProps<typeof sliderVariants>['size'];
  disabled?: VariantProps<typeof sliderVariants>['disabled'];
  trackVariant?: VariantProps<typeof sliderTrackVariants>['variant'];
  trackSize?: VariantProps<typeof sliderTrackVariants>['size'];
  rangeVariant?: VariantProps<typeof sliderRangeVariants>['variant'];
  thumbSize?: VariantProps<typeof sliderThumbVariants>['size'];
  thumbVariant?: VariantProps<typeof sliderThumbVariants>['variant'];
  thumbRingColor?: VariantProps<typeof sliderThumbVariants>['ringColor'];
}

// Slider Track Props
export interface SliderTrackProps
  extends ComponentProps<typeof SliderPrimitive.Track>,
    VariantProps<typeof sliderTrackVariants> {
  className?: string;
}

// Slider Range Props
export interface SliderRangeProps
  extends ComponentProps<typeof SliderPrimitive.Range>,
    VariantProps<typeof sliderRangeVariants> {
  className?: string;
}

// Slider Thumb Props
export interface SliderThumbProps
  extends ComponentProps<typeof SliderPrimitive.Thumb>,
    VariantProps<typeof sliderThumbVariants> {
  className?: string;
}

// DataSlider Props
export interface DataSliderProps extends VariantProps<typeof dataSliderVariants> {
  value: number[];
  onValueChange: (val: number[]) => void;
  showTicks?: boolean;
  showLabels?: boolean;
  minLabel?: React.ReactNode;
  maxLabel?: React.ReactNode;
  showMiddleLabels?: boolean;
  max?: number;
  middleLabelSize?: VariantProps<typeof sliderMiddleLabelVariants>['size'];
  middleLabelColor?: VariantProps<typeof sliderMiddleLabelVariants>['color'];
  tickSize?: VariantProps<typeof sliderTickVariants>['size'];
  tickLabelSize?: VariantProps<typeof sliderTickLabelVariants>['size'];
  tickLabelColor?: VariantProps<typeof sliderTickLabelVariants>['color'];
  bottomLabelColor?: VariantProps<typeof sliderBottomLabelVariants>['color'];
  bottomLabelItemColor?: VariantProps<typeof sliderBottomLabelItemVariants>['color'];
  bottomLabelItemSize?: VariantProps<typeof sliderBottomLabelItemVariants>['size'];
}

// 중앙 라벨 Props
export interface SliderMiddleLabelProps extends VariantProps<typeof sliderMiddleLabelVariants> {
  children: React.ReactNode;
  className?: string;
}

// 눈금선 Props
export interface SliderTicksProps extends VariantProps<typeof sliderTicksVariants> {
  steps: number;
  className?: string;
}

// 눈금선 아이템 Props
export interface SliderTickProps extends VariantProps<typeof sliderTickVariants> {
  index: number;
  totalSteps: number;
  className?: string;
}

// 눈금선 라인 Props
export interface SliderTickLineProps extends VariantProps<typeof sliderTickLineVariants> {
  isFirstOrLast: boolean;
  className?: string;
}

// 눈금선 라벨 Props
export interface SliderTickLabelProps extends VariantProps<typeof sliderTickLabelVariants> {
  children: React.ReactNode;
  className?: string;
}

// 하단 라벨 Props
export interface SliderBottomLabelProps extends VariantProps<typeof sliderBottomLabelVariants> {
  minLabel?: React.ReactNode;
  maxLabel?: React.ReactNode;
  className?: string;
}

// 하단 라벨 아이템 Props
export interface SliderBottomLabelItemProps
  extends VariantProps<typeof sliderBottomLabelItemVariants> {
  children: React.ReactNode;
  className?: string;
}
