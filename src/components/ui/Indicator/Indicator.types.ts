import { VariantProps } from 'class-variance-authority';

import { basicDotVariants } from './indicatorVariants';

export interface BasicDotIndicatorProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof basicDotVariants> {
  step: number; // 현재 단계 (1부터 시작)
  totalSteps: number;
  size?: 'sm' | 'md' | 'lg';
  orientation?: 'horizontal' | 'vertical';
  spacing?: 'tight' | 'normal' | 'wide';
  showHover?: boolean;
  onStepClick?: (step: number) => void;
}
