'use client';

import * as ProgressPrimitive from '@radix-ui/react-progress';
import * as React from 'react';

import { cn } from '@/lib/utils';
import { Icon } from '@/shared/ui/Icons';

import { ProgressProps } from './Progress.types';
import { progressVariants, progressIndicatorVariants } from './progressVariants';

export function Progress({
  usedStorage,
  totalStorage,
  className,
  showCurrentUsage = true,
  showMinMaxLabels = true,
  size = 'lg',
}: ProgressProps) {
  const percentage = Math.min((usedStorage / totalStorage) * 100, 100);

  return (
    <div className={cn('space-y-2', className)}>
      {/* 현재 사용 용량 표시 */}
      {showCurrentUsage && (
        <div className="flex items-center gap-2">
          {/* 신호 아이콘 */}
          <Icon name="Signal" size={20} className="text-status-positive" />

          {/* 사용량 텍스트 (chart-4 색상 적용) */}
          <span className="body-18-bold font-bold leading-none text-chart-4">{usedStorage}GB</span>
        </div>
      )}

      {/* 프로그레스 바 */}
      <ProgressPrimitive.Root
        data-slot="progress"
        className={cn(progressVariants({ size }), 'bg-gray-200')}
      >
        <ProgressPrimitive.Indicator
          data-slot="progress-indicator"
          className={cn(progressIndicatorVariants())}
          style={{ transform: `translateX(-${100 - (percentage || 0)}%)` }}
        />
      </ProgressPrimitive.Root>

      {/* 최소값과 최대값 표시 */}
      {showMinMaxLabels && (
        <div className="flex justify-between items-center text-[10px] text-gray-600">
          <span>0GB</span>
          <span>{totalStorage}GB</span>
        </div>
      )}
    </div>
  );
}
