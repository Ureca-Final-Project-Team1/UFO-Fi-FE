'use client';

import React from 'react';

import { cn } from '@/lib/utils';

export type SpeechBubbleTailDirection = 'left' | 'right' | 'top' | 'bottom';

export interface SpeechBubbleProps {
  children: React.ReactNode;
  tailDirection?: SpeechBubbleTailDirection;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'secondary';
}

/**
 * 말풍선 컴포넌트
 * 다양한 방향의 꼬리와 크기, 스타일 변형을 지원합니다.
 */
export const SpeechBubble: React.FC<SpeechBubbleProps> = (props) => {
  // 크기별 스타일
  const sizeClasses = {
    sm: 'p-3 text-xs max-w-[200px]',
    md: 'p-4 text-sm max-w-[280px]',
    lg: 'p-5 text-base max-w-[320px]',
  };

  // 변형별 스타일
  const variantClasses = {
    default: 'bg-white text-black border-gray-100',
    secondary: 'bg-gray-100 text-gray-900 border-gray-200',
  };

  // 꼬리 스타일 (variant에 따라 색상 변경)
  const getTailColors = () => {
    switch (props.variant) {
      case 'secondary':
        return { borderColor: '#e5e7eb', fillColor: '#f3f4f6' }; // gray-200, gray-100
      default:
        return { borderColor: '#f3f4f6', fillColor: '#ffffff' }; // gray-100, white
    }
  };

  const tailColors = getTailColors();

  // 꼬리 렌더링 함수
  const renderTail = () => {
    const tailSize = props.size === 'sm' ? 10 : props.size === 'lg' ? 14 : 12;

    switch (props.tailDirection) {
      case 'left':
        return (
          <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-full">
            {/* 외부 테두리 */}
            <div
              className="w-0 h-0"
              style={{
                borderTop: `${tailSize}px solid transparent`,
                borderBottom: `${tailSize}px solid transparent`,
                borderRight: `${tailSize + 4}px solid ${tailColors.borderColor}`,
              }}
            />
            {/* 내부 채우기 */}
            <div
              className="absolute top-0 left-[4px] w-0 h-0"
              style={{
                borderTop: `${tailSize}px solid transparent`,
                borderBottom: `${tailSize}px solid transparent`,
                borderRight: `${tailSize}px solid ${tailColors.fillColor}`,
              }}
            />
          </div>
        );

      case 'right':
        return (
          <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-full">
            {/* 외부 테두리 */}
            <div
              className="w-0 h-0"
              style={{
                borderTop: `${tailSize}px solid transparent`,
                borderBottom: `${tailSize}px solid transparent`,
                borderLeft: `${tailSize + 4}px solid ${tailColors.borderColor}`,
              }}
            />
            {/* 내부 채우기 */}
            <div
              className="absolute top-0 right-[4px] w-0 h-0"
              style={{
                borderTop: `${tailSize}px solid transparent`,
                borderBottom: `${tailSize}px solid transparent`,
                borderLeft: `${tailSize}px solid ${tailColors.fillColor}`,
              }}
            />
          </div>
        );

      case 'top':
        return (
          <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-full">
            {/* 외부 테두리 */}
            <div
              className="w-0 h-0"
              style={{
                borderLeft: `${tailSize}px solid transparent`,
                borderRight: `${tailSize}px solid transparent`,
                borderBottom: `${tailSize + 2}px solid ${tailColors.borderColor}`,
              }}
            />
            {/* 내부 채우기 */}
            <div
              className="absolute top-[2px] left-0 w-0 h-0"
              style={{
                borderLeft: `${tailSize}px solid transparent`,
                borderRight: `${tailSize}px solid transparent`,
                borderBottom: `${tailSize}px solid ${tailColors.fillColor}`,
              }}
            />
          </div>
        );

      case 'bottom':
        return (
          <div className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-full">
            {/* 외부 테두리 */}
            <div
              className="w-0 h-0"
              style={{
                borderLeft: `${tailSize}px solid transparent`,
                borderRight: `${tailSize}px solid transparent`,
                borderTop: `${tailSize + 2}px solid ${tailColors.borderColor}`,
              }}
            />
            {/* 내부 채우기 */}
            <div
              className="absolute bottom-[2px] left-0 w-0 h-0"
              style={{
                borderLeft: `${tailSize}px solid transparent`,
                borderRight: `${tailSize}px solid transparent`,
                borderTop: `${tailSize}px solid ${tailColors.fillColor}`,
              }}
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div
      className={cn(
        'relative rounded-2xl shadow-lg border-2 font-medium leading-relaxed',
        sizeClasses[props.size || 'md'],
        variantClasses[props.variant || 'default'],
        props.className,
      )}
    >
      <div className="whitespace-pre-line">{props.children}</div>
      {renderTail()}
    </div>
  );
};
