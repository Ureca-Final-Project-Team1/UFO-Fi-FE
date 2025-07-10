import React from 'react';

import { cn } from '@/lib/utils';

import { Progress } from './Progress';

interface StorageProgressProps {
  /** 사용된 용량 (GB) */
  usedStorage: number;
  /** 전체 용량 (GB) */
  totalStorage: number;
  /** 추가 CSS 클래스 */
  className?: string;
  /** 현재 사용 용량 표시 여부 */
  showCurrentUsage?: boolean;
  /** 최소/최대 용량 표시 여부 */
  showMinMaxLabels?: boolean;
  /** 프로그레스 바 크기 (그래프 세로폭) */
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function StorageProgress({
  usedStorage,
  totalStorage,
  className,
  showCurrentUsage = true,
  showMinMaxLabels = true,
  size = 'lg',
}: StorageProgressProps) {
  const percentage = Math.min((usedStorage / totalStorage) * 100, 100);

  return (
    <div className={cn('space-y-2', className)}>
      {/* 현재 사용 용량 표시 */}
      {showCurrentUsage && (
        <div className="flex justify-center">
          <span className="text-sm font-medium text-gray-700">{usedStorage}GB</span>
        </div>
      )}

      {/* 프로그레스 바 */}
      <Progress value={percentage} size={size} className="bg-gray-200" />

      {/* 최소값과 최대값 표시 */}
      {showMinMaxLabels && (
        <div className="flex justify-between items-center text-sm text-gray-600">
          <span>0GB</span>
          <span>{totalStorage}GB</span>
        </div>
      )}
    </div>
  );
}
