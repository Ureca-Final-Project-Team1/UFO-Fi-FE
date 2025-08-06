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
  const [vw, setVw] = useState(typeof window !== 'undefined' ? window.innerWidth : BASE_WIDTH);

  useEffect(() => {
    const resize = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      setVw(vw);
      // 1. 세로 기준 스케일
      const scaleH = (vh * heightPercent) / BASE_HEIGHT;
      // 2. 가로 기준 스케일 (8px 여유)
      const scaleW = (vw - 8) / BASE_WIDTH;
      // 3. 둘 중 더 작은 값 사용 (양쪽 모두 넘지 않도록)
      const scale = Math.min(scaleH, scaleW);
      setScale(scale);
    };

    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [heightPercent]);

  return (
    <div className="w-full h-full flex justify-center items-center" style={{ overflow: 'hidden' }}>
      {/* 외계인 - 스케일된 영역의 바닥에만 붙음 */}
      <div className="absolute bottom-0 left-0 z-20 pointer-events-none">
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
          width: Math.min(BASE_WIDTH, vw),
          height: 'auto',
          transform: `scale(${scale})`,
        }}
      >
        {children}
      </div>
    </div>
  );
};
