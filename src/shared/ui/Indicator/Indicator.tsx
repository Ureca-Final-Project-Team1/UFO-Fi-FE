import React, { ComponentProps } from 'react';

import { cn } from '@/lib/utils';

import { indicatorVariants, basicDotVariants } from './indicatorVariants';

// 스타일 맵 객체들
const stepStateMap = {
  completed: 'completed',
  active: 'active',
  pending: 'pending',
} as const;

const hoverStyleMap = {
  enabled: 'hover:scale-110',
  disabled: '',
} as const;

const cursorStyleMap = {
  clickable: 'cursor-pointer',
  nonClickable: '',
} as const;

const ariaLabelMap = {
  format: (stepNumber: number, totalSteps: number) => `Step ${stepNumber} of ${totalSteps}`,
} as const;

type BasicDotIndicatorProps = ComponentProps<'div'> & {
  step?: number;
  totalSteps?: number;
  size?: 'sm' | 'md' | 'lg';
  orientation?: 'horizontal' | 'vertical';
  spacing?: 'tight' | 'normal' | 'wide';
  showHover?: boolean;
  onStepClick?: (step: number) => void;
};

/**
 * 기본 원형 점 Indicator 컴포넌트
 * 진행 단계(step)을 나타내기 위한 용도로 사용하는 원형 프로그래스 섹션입니다.
 */
export const Indicator: React.FC<BasicDotIndicatorProps> = (props) => {
  const {
    step = 1,
    totalSteps = 3,
    size = 'md',
    orientation = 'horizontal',
    spacing = 'normal',
    showHover = true,
    onStepClick = () => {},
    className,
    ...rest
  } = props;

  const getStepState = (stepIndex: number) => {
    if (stepIndex < step) return stepStateMap.completed;
    if (stepIndex === step) return stepStateMap.active;
    return stepStateMap.pending;
  };

  return (
    <div className={cn(indicatorVariants({ orientation, spacing }), className)} {...rest}>
      {Array.from({ length: totalSteps }, (_, index) => {
        const stepNumber = index + 1;
        const state = getStepState(stepNumber);
        const isClickable = stepNumber <= step;

        return (
          <div
            key={stepNumber}
            className={cn(
              basicDotVariants({ size, state }),
              showHover ? hoverStyleMap.enabled : hoverStyleMap.disabled,
              isClickable ? cursorStyleMap.clickable : cursorStyleMap.nonClickable,
            )}
            role={isClickable ? 'button' : undefined}
            tabIndex={isClickable ? 0 : undefined}
            aria-label={ariaLabelMap.format(stepNumber, totalSteps)}
            onClick={() => isClickable && onStepClick(stepNumber)}
            onKeyDown={(e) => {
              if (isClickable && (e.key === 'Enter' || e.key === ' ')) {
                e.preventDefault();
                onStepClick(stepNumber);
              }
            }}
          />
        );
      })}
    </div>
  );
};
