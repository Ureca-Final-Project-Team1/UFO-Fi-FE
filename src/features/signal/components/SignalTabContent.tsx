'use client';

import { useEffect, useRef, useState } from 'react';

import { IMAGE_PATHS } from '@/constants';
import { useLetters } from '@/hooks/useLetters';

import PlanetComponent from './PlanetComponent';

interface SignalTabContentProps {
  maxHeight?: number;
}

export default function SignalTabContent({ maxHeight }: SignalTabContentProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState<number>(1);

  // 전역 상태에서 행성 도달 상태 가져오기
  const { planetStatus, completedPlanets, initializeLetters } = useLetters();

  // 컴포넌트 마운트 시 편지 상태 로드
  useEffect(() => {
    initializeLetters();
  }, [initializeLetters]);

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

  // 기본 레이아웃 설정
  const baseLayout = {
    containerHeight: 675,
    planets: [
      { top: 36, left: 36 },
      { top: 200, left: 170 },
      { top: 440, left: 390 },
      { top: 50, left: 500 },
      { top: 180, left: 740 },
    ],
  };

  const planetSizes = [145, 185, 145, 195, 120];

  // 점선 경로 생성
  const getCurvePath = (
    from: { x: number; y: number },
    to: { x: number; y: number },
    index: number,
  ) => {
    if (index === 2) {
      // 3번째 연결선은 베지어 곡선
      const cp1 = { x: from.x + 200, y: from.y - 150 };
      const cp2 = { x: to.x - 200, y: to.y + 150 };
      return `M ${from.x},${from.y} C ${cp1.x},${cp1.y} ${cp2.x},${cp2.y} ${to.x},${to.y}`;
    }

    // 나머지는 호(arc)
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const radius = (Math.sqrt(dx * dx + dy * dy) / 2) * 0.8;
    const sweepFlag = index === 1 ? 0 : 1;

    return `M ${from.x},${from.y} A ${radius},${radius} 0 0,${sweepFlag} ${to.x},${to.y}`;
  };

  // 연결선 색상 결정 (두 행성 모두 도달했을 때만 색상)
  const getConnectionColor = (fromIndex: number, toIndex: number) => {
    return planetStatus[fromIndex] && planetStatus[toIndex] ? '#7BD5FF' : '#666666';
  };

  const calculateScale = () => {
    const availableHeight = maxHeight || window.innerHeight * 0.8;
    const newScale = Math.min(1, availableHeight / baseLayout.containerHeight);
    setScale(newScale);
  };

  useEffect(() => {
    calculateScale();
    const handleResize = () => calculateScale();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [maxHeight]);

  const scaledHeight = baseLayout.containerHeight * scale;

  return (
    <div className="relative w-full overflow-hidden">
      <p className="text-white text-md pyeongchangpeace-title-2 mb-5">
        {completedPlanets}번째 은하까지 탐사 완료...
      </p>

      <div
        className="w-full overflow-x-auto scroll-smooth hide-scrollbar"
        style={{ height: `${scaledHeight}px` }}
      >
        <div
          ref={wrapperRef}
          className="relative"
          style={{
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
            width: `${860}px`,
            height: `${baseLayout.containerHeight}px`,
          }}
        >
          {/* SVG 점선 - 각 연결선별로 개별 색상 */}
          <svg
            className="absolute top-0 left-0 pointer-events-none"
            width="860"
            height={baseLayout.containerHeight}
          >
            {baseLayout.planets.map((from, i) => {
              const to = baseLayout.planets[i + 1];
              if (!to) return null;

              const fromPoint = {
                x: from.left + planetSizes[i] / 2,
                y: from.top + planetSizes[i] / 2,
              };
              const toPoint = {
                x: to.left + planetSizes[i + 1] / 2,
                y: to.top + planetSizes[i + 1] / 2,
              };

              return (
                <path
                  key={i}
                  d={getCurvePath(fromPoint, toPoint, i)}
                  fill="none"
                  stroke={getConnectionColor(i, i + 1)}
                  strokeWidth="2"
                  strokeDasharray="8 6"
                />
              );
            })}
          </svg>

          {/* 행성들 */}
          {baseLayout.planets.map((planet, index) => (
            <div
              key={index}
              className="absolute"
              style={{
                top: `${planet.top}px`,
                left: `${planet.left}px`,
              }}
            >
              <PlanetComponent
                planetSrc={PLANETS[index]}
                satelliteSrc={SATELLITES[index]}
                planetSize={planetSizes[index]}
                isArrived={planetStatus[index]} // 전역 상태에서 가져온 행성 도달 상태 전달
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
