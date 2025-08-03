'use client';

import { useEffect } from 'react';

import { IMAGE_PATHS } from '@/constants';
import { useLetters } from '@/hooks/useLetters';

import PlanetWithSatellite from './PlanetWithSatellite';

const PLANET_SIZE = 60;

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

  const { planetStatus, completedPlanets, initializeLetters } = useLetters();

  useEffect(() => {
    initializeLetters();
  }, [initializeLetters]);

  return (
    <section aria-label="탐사 진행 현황" className="flex flex-col items-center w-full gap-4 px-4">
      {/* 진행 텍스트 */}
      <p className="text-white text-md pyeongchangpeace-title-2 mb-5" aria-live="polite">
        {completedPlanets}번째 은하까지 탐사 완료...
      </p>

      {/* 선 + 행성 아이콘 */}
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
              planetSize={PLANET_SIZE}
              isArrived={planetStatus[index]}
            />
          ))}
        </div>

        {/* 진행 상태 카운터 */}
        <div className="flex items-center justify-center size-12 rounded-full bg-neutral-900 text-white text-sm ml-3 relative z-10 flex-shrink-0">
          {completedPlanets}/{PLANETS.length}
        </div>
      </div>
    </section>
  );
}
