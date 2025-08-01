import React from 'react';

import { cn } from '@/lib/utils';

import type { BasicDotIndicatorProps } from './Indicator.types';
import { indicatorVariants, basicDotVariants } from './indicatorVariants';

/**
 * 기본 원형 점 Indicator 컴포넌트
 * 진행 단계(step)을 나타내기 위한 용도로 사용하는 원형 프로그래스 섹션입니다.
 */
export const Indicator: React.FC<BasicDotIndicatorProps> = (props) => {
  const getStepState = (stepIndex: number) => {
    if (stepIndex < props.step) return 'completed';
    if (stepIndex === props.step) return 'active';
    return 'pending';
  };

  return (
    <div
      className={cn(
        indicatorVariants({
          orientation: props.orientation || 'horizontal',
          spacing: props.spacing || 'normal',
        }),
        props.className,
      )}
      {...props}
    >
      {Array.from({ length: props.totalSteps }, (_, index) => {
        const stepNumber = index + 1;
        const state = getStepState(stepNumber);
        const isClickable = props.onStepClick && stepNumber <= props.step;

        return (
          <div
            key={stepNumber}
            className={cn(
              basicDotVariants({ size: props.size || 'md', state }),
              props.showHover !== false && 'hover:scale-110',
              isClickable && 'cursor-pointer',
            )}
            role={isClickable ? 'button' : undefined}
            tabIndex={isClickable ? 0 : undefined}
            aria-label={`Step ${stepNumber} of ${props.totalSteps}`}
            onClick={() => isClickable && props.onStepClick?.(stepNumber)}
            onKeyDown={(e) => {
              if (isClickable && (e.key === 'Enter' || e.key === ' ')) {
                e.preventDefault();
                props.onStepClick?.(stepNumber);
              }
            }}
          />
        );
      })}
    </div>
  );
};
