'use client';

import Image from 'next/image';
import React, { useState, useMemo, ComponentProps } from 'react';

import { ICON_SIZES } from '@/constants/icons';
import { cn } from '@/lib/utils';

import {
  fallbackVariants,
  fallbackIconVariants,
  spanVariants,
  imageVariants,
  errorMessages,
} from './ImageIconVariants';
import { LucideIcon } from './LucideIcon';

const isStaticFile = (src: string): boolean => {
  // Next.js 정적 파일 경로 패턴 확인
  return src.startsWith('/') && !src.startsWith('//');
};

type ImageIconProps = ComponentProps<'span'> & {
  src?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg' | number;
  priority?: boolean;
  fallbackIcon?: 'ImageOff' | 'Loader2';
};

/**
 * Next.js Image를 사용한 이미지 아이콘 컴포넌트
 * png 등의 확장자를 가진 이미지 파일을 아이콘으로 사용할 때 활용
 */
export const ImageIcon: React.FC<ImageIconProps> = (props) => {
  const {
    src = '',
    alt = '',
    size = 'md',
    className,
    priority = false,
    fallbackIcon = 'ImageOff',
    ...rest
  } = props;

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
    <div className={fallbackVariants()} style={{ width: sizeValue, height: sizeValue }}>
      <LucideIcon
        name={hasError ? fallbackIcon : 'Loader2'}
        size={size}
        className={hasError ? fallbackIconVariants() : fallbackIconVariants({ variant: 'loading' })}
      />
    </div>
  );

  // src가 유효하지 않은 경우 즉시 에러 fallback
  if (!isValidSrc) {
    console.warn(errorMessages.invalidSrc(src));
    return (
      <span
        className={cn(spanVariants(), className)}
        style={{ width: sizeValue, height: sizeValue }}
        {...rest}
      >
        <LucideIcon name={fallbackIcon} size={size} className={fallbackIconVariants()} />
      </span>
    );
  }

  return (
    <span
      className={cn(spanVariants({ variant: 'withRelative' }), className)}
      style={{ width: sizeValue, height: sizeValue }}
      {...rest}
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
          imageVariants(),
          // 정적 파일은 즉시 표시, 외부 파일은 로딩 완료 후 표시
          !isStatic && (isLoading || hasError)
            ? imageVariants({ variant: 'loading' })
            : imageVariants({ variant: 'loaded' }),
        )}
        sizes={`${sizeValue}px`}
        onLoad={() => {
          if (!isStatic) {
            setIsLoading(false);
          }
          setHasError(false);
        }}
        onError={(e) => {
          console.error(errorMessages.loadFailed(src), e);
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
