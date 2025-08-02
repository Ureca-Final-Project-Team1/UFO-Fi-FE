import { ComponentProps } from 'react';

export type BasicDotIndicatorProps = ComponentProps<'div'> & {
  step?: number;
  totalSteps?: number;
  size?: 'sm' | 'md' | 'lg';
  orientation?: 'horizontal' | 'vertical';
  spacing?: 'tight' | 'normal' | 'wide';
  showHover?: boolean;
  onStepClick?: (step: number) => void;
};

export type BasicDotSize = 'sm' | 'md' | 'lg';
export type BasicDotState = 'pending' | 'active' | 'completed';
