'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import { IMAGE_PATHS } from '@/constants';
import { useLetters } from '@/hooks/useLetters';

interface Planet {
  id: number;
  src: string;
  active: boolean;
  color: string;
}

const getCSSVariable = (name: string): string => {
  if (typeof window === 'undefined') return '';
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
};

export default function PlanetProgressBar() {
  const [planets, setPlanets] = useState<Planet[]>([]);
  const { planetStatus, completedPlanets, initializeLetters } = useLetters();

  // 컴포넌트 마운트 시 편지 상태 로드
  useEffect(() => {
    initializeLetters();
  }, [initializeLetters]);

  useEffect(() => {
    const colors = [
      getCSSVariable('--color-planet1') || '#b39645',
      getCSSVariable('--color-planet2') || '#45b3b0',
      getCSSVariable('--color-planet3') || '#4564b3',
      getCSSVariable('--color-planet4') || '#8745b3',
      getCSSVariable('--color-planet5') || '#b3459b',
    ];

    setPlanets([
      { id: 1, src: IMAGE_PATHS.PLANET_1, active: planetStatus[0], color: colors[0] },
      { id: 2, src: IMAGE_PATHS.PLANET_2, active: planetStatus[1], color: colors[1] },
      { id: 3, src: IMAGE_PATHS.PLANET_3, active: planetStatus[2], color: colors[2] },
      { id: 4, src: IMAGE_PATHS.PLANET_4, active: planetStatus[3], color: colors[3] },
      { id: 5, src: IMAGE_PATHS.PLANET_5, active: planetStatus[4], color: colors[4] },
    ]);
  }, [planetStatus]);

  const completed = completedPlanets;

  // 디버깅용 로그
  console.log('PlanetProgressBar - planetStatus:', planetStatus, 'completed:', completed);

  return (
    <div className="flex flex-col items-center w-full gap-10 px-4">
      {/* 진행 텍스트 */}
      <p className="text-white text-sm pyeongchangpeace-title-2">
        {completed}번째 은하까지 탐사 완료...
      </p>

      {/* 행성 + 점선 궤도 */}
      <div className="relative flex items-center justify-center w-full">
        {/* 점선 궤도 */}
        <div className="absolute inset-x-4 top-1/2 rounded-full border border-dashed border-gray-400 -translate-y-1/2" />

        {/* 행성들 */}
        <div className="flex gap-3 relative z-10">
          {planets.map((p) => (
            <Planet key={p.id} {...p} />
          ))}
        </div>
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#222] text-white text-sm ml-3 relative z-10 flex-shrink-0">
          {completed}/{planets.length}
        </div>
      </div>
    </div>
  );
}

function Planet({ src, active, color }: Planet) {
  return (
    <div
      className="relative w-10 h-10 rounded-full flex items-center justify-center"
      style={{
        backgroundColor: active ? color : 'transparent',
        boxShadow: active
          ? `
            0 0 0 6px ${hexToRgba(color, 0.6)},
            0 0 0 12px ${hexToRgba(color, 0.4)},
            0 0 0 18px ${hexToRgba(color, 0.2)}
          `
          : 'none',
      }}
    >
      <Image src={src} alt="planet" width={42} height={42} />
    </div>
  );
}

function hexToRgba(hex: string, alpha: number) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
