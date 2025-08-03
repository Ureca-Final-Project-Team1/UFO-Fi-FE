'use client';

import { useEffect } from 'react';

import { IMAGE_PATHS } from '@/constants';
import { useLetters } from '@/hooks/useLetters';

import PlanetWithSatellite from './PlanetWithSatellite';

export default function SignalProgressBar() {
  const PLANETS = [
    IMAGE_PATHS.PLANET_1,
    IMAGE_PATHS.PLANET_2,
    IMAGE_PATHS.PLANET_3,
    IMAGE_PATHS.PLANET_4,
    IMAGE_PATHS.PLANET_5,
  ];

  const SATELLITES = [
    IMAGE_PATHS.SATELLITE_1,
    IMAGE_PATHS.SATELLITE_2,
    IMAGE_PATHS.SATELLITE_3,
    IMAGE_PATHS.SATELLITE_4,
    IMAGE_PATHS.SATELLITE_5,
  ];

  // 전역 상태에서 행성 도달 상태 가져오기
  const { planetStatus, completedPlanets, initializeLetters } = useLetters();

  // 컴포넌트 마운트 시 편지 상태 로드하기
  useEffect(() => {
    initializeLetters();
  }, [initializeLetters]);

  // 도달한 행성의 개수 계산
  const completed = completedPlanets;

  return (
    <div className="flex flex-col items-center w-full gap-4 px-4">
      {/* 진행 텍스트 */}
      <p className="text-white text-md pyeongchangpeace-title-2 mb-5">
        {completed}번째 은하까지 탐사 완료...
      </p>

      {/* 선 + 행성 */}
      <div className="relative flex items-center justify-center w-full">
        {/* 가운데 점선 선 */}
        <div className="absolute inset-x-4 top-1/2 rounded-full border border-dashed border-gray-400 -translate-y-1/2" />

        {/* 행성들 */}
        <div className="flex gap-3 relative z-10">
          {PLANETS.map((planet, index) => (
            <PlanetWithSatellite
              key={index}
              planetSrc={planet}
              satelliteSrc={SATELLITES[index]}
              planetSize={60}
              isArrived={planetStatus[index]}
            />
          ))}
        </div>
        <div className="flex items-center justify-center size-12 rounded-full bg-[#222] text-white text-sm ml-3 relative z-10 flex-shrink-0">
          {completed}/{PLANETS.length}
        </div>
      </div>
    </div>
  );
}
