'use client';

import { useState } from 'react';

import { IMAGE_PATHS } from '@/constants';

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

  // 임시로 행성 도달 상태 (나중에 props나 상태관리로 받아올 예정)
  const [planetStatus] = useState<boolean[]>([true, true, false, false, false]);

  // 도달한 행성의 개수 계산
  const isArrived = planetStatus.filter(Boolean).length;

  return (
    <div className="relative w-full h-full flex items-center justify-center flex-col px-2 sm:px-4">
      {/* 진행 텍스트 */}
      <p className="text-white text-xs sm:text-sm pyeongchangpeace-title-2 mb-2 sm:mb-4">
        {isArrived}번째 은하까지 탐사 완료...
      </p>

      {/* 선 + 행성 */}
      <div className="relative w-full flex justify-center items-center py-4 sm:py-6">
        {/* 가운데 점선 선 */}
        <div className="absolute inset-x-2 sm:inset-x-4 top-1/2 h-0 border-t border-dashed border-white -translate-y-1/2 z-0" />

        {/* 행성들 */}
        <div className="flex gap-1 sm:gap-3 md:gap-6 w-full justify-center items-end relative z-10">
          {PLANETS.map((planet, index) => (
            <PlanetWithSatellite
              key={index}
              planetSrc={planet}
              satelliteSrc={SATELLITES[index]}
              planetSize={60} // 기본 크기를 작게 조정
              isArrived={planetStatus[index]}
            />
          ))}
        </div>
        <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-[#222] text-white text-xs sm:text-sm ml-1 sm:ml-2 md:ml-3 relative z-10 flex-shrink-0">
          {isArrived}/{PLANETS.length}
        </div>
      </div>
    </div>
  );
}
