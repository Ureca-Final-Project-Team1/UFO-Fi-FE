import Image from 'next/image';
import React from 'react';

import { ICON_SIZES } from '@/constants/icons';
import { cn } from '@/lib/utils';

import { ImageIconProps } from './Icons.types';

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
}) => {
  const sizeValue = typeof size === 'number' ? size : ICON_SIZES[size];

  return (
    <span
      className={cn('inline-flex items-center justify-center shrink-0 relative', className)}
      style={{ width: sizeValue, height: sizeValue }}
    >
      <Image
        src={src}
        alt={alt}
        width={sizeValue}
        height={sizeValue}
        priority={priority}
        className="object-contain"
      />
    </span>
  );
};
