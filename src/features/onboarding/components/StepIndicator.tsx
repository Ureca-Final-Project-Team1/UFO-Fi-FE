import React from 'react';

import { Indicator } from '@/shared';

interface StepIndicatorProps {
  step: number; // 0-based
  total: number;
  onClick: (step: number) => void;
  className?: string;
  showHover?: boolean;
  size?: 'sm' | 'md' | 'lg';
  spacing?: 'tight' | 'normal' | 'wide';
}

export const StepIndicator = ({
  step,
  total,
  onClick,
  className = '',
  showHover = true,
  size = 'md',
  spacing = 'normal',
}: StepIndicatorProps) => {
  return (
    <div className={`flex justify-center py-2 ${className}`}>
      <Indicator
        step={step + 1} // Indicator는 1-based
        totalSteps={total}
        onStepClick={(clicked) => onClick(clicked - 1)} // 내부 변환 유지
        size={size}
        spacing={spacing}
        showHover={showHover}
      />
    </div>
  );
};
