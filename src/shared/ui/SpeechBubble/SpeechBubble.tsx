'use client';

import React, { ComponentProps } from 'react';

import { cn } from '@/lib/utils';

import {
  sizeVariants,
  variantVariants,
  tailColorVariants,
  tailSizeVariants,
} from './SpeechBubbleVariants';

export type SpeechBubbleTailDirection = 'left' | 'right' | 'top' | 'bottom';

export type SpeechBubbleProps = ComponentProps<'div'> & {
  children?: React.ReactNode;
  tailDirection?: SpeechBubbleTailDirection;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'secondary';
};

/**
 * 말풍선 컴포넌트
 * 다양한 방향의 꼬리와 크기, 스타일 변형을 지원합니다.
 */
export const SpeechBubble: React.FC<SpeechBubbleProps> = (props) => {
  const {
    children = '',
    tailDirection = 'left',
    className,
    size = 'md',
    variant = 'default',
    ...rest
  } = props;

  const tailColors = tailColorVariants[variant];
  const tailSize = tailSizeVariants[size];

  // 꼬리 렌더링 함수
  const renderTail = () => {
    switch (tailDirection) {
      case 'left':
        return (
          <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-full">
            {/* 외부 테두리 */}
            <div
              className="size-0"
              style={{
                borderTop: `${tailSize}px solid transparent`,
                borderBottom: `${tailSize}px solid transparent`,
                borderRight: `${tailSize + 4}px solid ${tailColors.borderColor}`,
              }}
            />
            {/* 내부 채우기 */}
            <div
              className="absolute top-0 left-[4px] size-0"
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
              className="size-0"
              style={{
                borderTop: `${tailSize}px solid transparent`,
                borderBottom: `${tailSize}px solid transparent`,
                borderLeft: `${tailSize + 4}px solid ${tailColors.borderColor}`,
              }}
            />
            {/* 내부 채우기 */}
            <div
              className="absolute top-0 right-[4px] size-0"
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
              className="size-0"
              style={{
                borderLeft: `${tailSize}px solid transparent`,
                borderRight: `${tailSize}px solid transparent`,
                borderBottom: `${tailSize + 2}px solid ${tailColors.borderColor}`,
              }}
            />
            {/* 내부 채우기 */}
            <div
              className="absolute top-[2px] left-0 size-0"
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
              className="size-0"
              style={{
                borderLeft: `${tailSize}px solid transparent`,
                borderRight: `${tailSize}px solid transparent`,
                borderTop: `${tailSize + 2}px solid ${tailColors.borderColor}`,
              }}
            />
            {/* 내부 채우기 */}
            <div
              className="absolute bottom-[2px] left-0 size-0"
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
      className={cn('relative', sizeVariants({ size }), variantVariants({ variant }), className)}
      {...rest}
    >
      <div className="whitespace-pre-line">{children}</div>
      {renderTail()}
    </div>
  );
};
