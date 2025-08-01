import React from 'react';

import { cn } from '@/lib/utils';

import type { BasicDotIndicatorProps } from './Indicator.types';
import { indicatorVariants, basicDotVariants } from './indicatorVariants';

/**
 * 기본 원형 점 Indicator 컴포넌트
 * 진행 단계(step)을 나타내기 위한 용도로 사용하는 원형 프로그래스 섹션입니다.
 */
export const Indicator: React.FC<BasicDotIndicatorProps> = (props) => {
  // props에서 필요한 값들을 추출하고 기본값 설정
  const {
    step,
    totalSteps,
    size = 'md',
    orientation = 'horizontal',
    spacing = 'normal',
    showHover = true,
    onStepClick,
    className,
    ...rest
  } = props;

  const getStepState = (stepIndex: number) => {
    if (stepIndex < step) return 'completed';
    if (stepIndex === step) return 'active';
    return 'pending';
  };

  return (
    <div className={cn(indicatorVariants({ orientation, spacing }), className)} {...rest}>
      {Array.from({ length: totalSteps }, (_, index) => {
        const stepNumber = index + 1;
        const state = getStepState(stepNumber);
        const isClickable = onStepClick && stepNumber <= step;

        return (
          <div
            key={stepNumber}
            className={cn(
              basicDotVariants({ size, state }),
              showHover && 'hover:scale-110',
              isClickable && 'cursor-pointer',
            )}
            role={isClickable ? 'button' : undefined}
            tabIndex={isClickable ? 0 : undefined}
            aria-label={`Step ${stepNumber} of ${totalSteps}`}
            onClick={() => isClickable && onStepClick?.(stepNumber)}
            onKeyDown={(e) => {
              if (isClickable && (e.key === 'Enter' || e.key === ' ')) {
                e.preventDefault();
                onStepClick?.(stepNumber);
              }
            }}
          />
        );
      })}
    </div>
  );
};
