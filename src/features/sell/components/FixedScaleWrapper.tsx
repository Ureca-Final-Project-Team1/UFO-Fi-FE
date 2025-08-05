'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

import { IMAGE_PATHS } from '@/constants';

interface FixedScaleWrapperProps {
  children: React.ReactNode;
  heightPercent?: number; // 0~1 사이 값, 예: 0.8
}

export const FixedScaleWrapper = ({ children, heightPercent = 1 }: FixedScaleWrapperProps) => {
  const BASE_WIDTH = 390;
  const BASE_HEIGHT = 844;
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const resize = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const scaleW = vw / BASE_WIDTH;
      // 세로 기준 100%를 항상 차지하도록 scale 계산
      const scaleH = (vh * heightPercent) / BASE_HEIGHT;
      setScale(Math.min(scaleW, scaleH));
    };

    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  return (
    <div className="w-full h-full flex justify-center items-center" style={{ overflow: 'hidden' }}>
      {/* 외계인 - 스케일된 영역의 바닥에만 붙음 */}
      <div className="absolute bottom-0 left-0 z-20">
        <Image
          src={IMAGE_PATHS.AL_SELL}
          alt="판매 우주인"
          width={200}
          height={200}
          className="w-[40%] h-auto z-30"
          priority
        />
      </div>
      <div
        style={{
          width: BASE_WIDTH,
          height: 'auto',
          transform: `scale(${scale})`,
        }}
      >
        {children}
      </div>
    </div>
  );
};
