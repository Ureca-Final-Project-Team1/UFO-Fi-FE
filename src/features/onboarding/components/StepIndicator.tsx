import React from 'react';

import { Indicator } from '@/shared/ui/Indicator';

export const StepIndicator = ({
  step,
  total,
  onClick,
}: {
  step: number;
  total: number;
  onClick: (step: number) => void;
}) => (
  <div className="flex justify-center py-8">
    <Indicator
      step={step + 1}
      totalSteps={total}
      onStepClick={(s) => onClick(s - 1)}
      size="md"
      spacing="normal"
      showHover
    />
  </div>
);
