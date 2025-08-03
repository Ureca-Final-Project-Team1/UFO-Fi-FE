'use client';

import Image from 'next/image';
import React, { useState, useMemo } from 'react';

import { ICON_SIZES } from '@/constants';
import { cn } from '@/lib/utils';

import { ImageIconProps } from './Icons.types';
import { LucideIcon } from './LucideIcon';

const isStaticFile = (src: string): boolean => {
  // Next.js 정적 파일 경로 패턴 확인
  return src.startsWith('/') && !src.startsWith('//');
};

/**
 * Next.js Image를 사용한 이미지 아이콘 컴포넌트
 * png 등의 확장자를 가진 이미지 파일을 아이콘으로 사용할 때 활용
 */
export const ImageIcon: React.FC<ImageIconProps> = ({
  src,
  alt,
  size = 'md',
  className,
  priority = false,
  fallbackIcon = 'ImageOff',
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const sizeValue = typeof size === 'number' ? size : ICON_SIZES[size];

  // src 유효성 검사 및 정적 파일 여부 확인
  const isValidSrc = src && typeof src === 'string' && src.trim().length > 0;
  const isStatic = useMemo(() => isValidSrc && isStaticFile(src), [src, isValidSrc]);

  // 정적 파일이 아닌 경우에만 로딩 상태 초기화
  React.useEffect(() => {
    if (isValidSrc && !isStatic) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [src, isValidSrc, isStatic]);

  const renderFallback = () => (
    <div
      className="flex items-center justify-center bg-gray-100 rounded text-gray-400"
      style={{ width: sizeValue, height: sizeValue }}
    >
      <LucideIcon
        name={hasError ? fallbackIcon : 'Loader2'}
        size={size}
        className={hasError ? '' : 'animate-spin'}
      />
    </div>
  );

  // src가 유효하지 않은 경우 즉시 에러 fallback
  if (!isValidSrc) {
    console.warn(`Invalid src prop provided to ImageIcon: "${src}"`);
    return (
      <span
        className={cn('inline-flex items-center justify-center shrink-0', className)}
        style={{ width: sizeValue, height: sizeValue }}
      >
        <LucideIcon name={fallbackIcon} size={size} className="text-gray-400" />
      </span>
    );
  }

  return (
    <span
      className={cn('inline-flex items-center justify-center shrink-0 relative', className)}
      style={{ width: sizeValue, height: sizeValue }}
    >
      {/* 정적 파일이 아니고 로딩 중이거나 에러가 있을 때만 fallback 표시 */}
      {!isStatic && (hasError || isLoading) && (
        <div className="absolute inset-0 z-10">{renderFallback()}</div>
      )}

      <Image
        src={src}
        alt={alt}
        width={sizeValue}
        height={sizeValue}
        priority={priority}
        className={cn(
          'object-contain transition-opacity duration-200',
          // 정적 파일은 즉시 표시, 외부 파일은 로딩 완료 후 표시
          !isStatic && (isLoading || hasError) ? 'opacity-0' : 'opacity-100',
        )}
        sizes={`${sizeValue}px`}
        onLoad={() => {
          if (!isStatic) {
            setIsLoading(false);
          }
          setHasError(false);
        }}
        onError={(e) => {
          console.error(`ImageIcon failed to load: ${src}`, e);
          setHasError(true);
          if (!isStatic) {
            setIsLoading(false);
          }
        }}
        // 외부 이미지는 최적화 비활성화
        unoptimized={src.startsWith('http') || src.startsWith('//')}
      />
    </span>
  );
};
