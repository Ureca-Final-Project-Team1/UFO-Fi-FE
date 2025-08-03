'use client';

import Image from 'next/image';
import React from 'react';

import { IMAGE_PATHS } from '@/constants';

interface OnboardingImageFrameProps {
  onboardingSrc: string;
}

// 마스크 스타일 상수화
const MASK_STYLE: React.CSSProperties = {
  WebkitMaskImage: `url(${IMAGE_PATHS.WINDOW_MASK})`,
  WebkitMaskRepeat: 'no-repeat',
  WebkitMaskSize: '100% 100%',
  WebkitMaskPosition: 'center',
  maskImage: `url(${IMAGE_PATHS.WINDOW_MASK})`,
  maskRepeat: 'no-repeat',
  maskSize: '100% 100%',
  maskPosition: 'center',
  maskType: 'alpha',
};

export const OnboardingImageFrame = ({ onboardingSrc }: OnboardingImageFrameProps) => {
  return (
    <div className="relative w-full h-auto">
      {/* 창문 테두리 이미지 */}
      <Image
        src={IMAGE_PATHS.WINDOW_BORDER}
        alt="창문 테두리"
        width={300}
        height={300}
        className="w-full h-auto z-0"
        priority
      />

      {/* 마스킹된 콘텐츠 영역 */}
      <div className="absolute inset-0 z-10 scale-[0.83]" style={MASK_STYLE}>
        {/* 우주 배경 */}
        <Image src={IMAGE_PATHS.WINDOW} alt="우주 배경" fill className="object-cover" />

        {/* 온보딩 콘텐츠 이미지 */}
        <Image
          src={onboardingSrc}
          alt="온보딩 이미지"
          fill
          className="object-cover object-center"
        />
      </div>
    </div>
  );
};
