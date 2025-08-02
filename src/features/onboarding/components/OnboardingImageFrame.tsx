'use client';

import Image from 'next/image';
import React from 'react';

import { IMAGE_PATHS } from '@/constants';

interface OnboardingImageFrameProps {
  onboardingSrc: string; // 온보딩 콘텐츠 이미지
}

export const OnboardingImageFrame = ({ onboardingSrc }: OnboardingImageFrameProps) => {
  return (
    <div className="relative  aspect-[4/3]">
      <Image
        src={IMAGE_PATHS.WINDOW_BORDER}
        alt="창문 테두리"
        fill
        className="object-contain z-0"
        priority
      />

      {/* 창문 모양 마스크 적용된 콘텐츠 */}
      <div
        className="absolute inset-0 z-10 scale-[0.83]"
        style={{
          WebkitMaskImage: `url(${IMAGE_PATHS.WINDOW_MASK})`,
          WebkitMaskRepeat: 'no-repeat',
          WebkitMaskSize: '100% 100%',
          WebkitMaskPosition: 'center',
          maskImage: `url(${IMAGE_PATHS.WINDOW_MASK})`,
          maskRepeat: 'no-repeat',
          maskSize: '100% 100%',
          maskPosition: 'center',
          maskType: 'alpha',
        }}
      >
        <Image src={IMAGE_PATHS.WINDOW} alt="우주 배경" fill className="object-cover" />
        <Image
          src={onboardingSrc}
          alt="온보딩 콘텐츠"
          fill
          className="object-cover object-center"
        />
      </div>
    </div>
  );
};
