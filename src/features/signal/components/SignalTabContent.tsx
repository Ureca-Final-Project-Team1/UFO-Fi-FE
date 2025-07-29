'use client';

import { useEffect, useRef, useState } from 'react';

import { IMAGE_PATHS } from '@/constants';

import PlanetComponent from './PlanetComponent';

interface Point {
  x: number;
  y: number;
}

export default function SignalTabContent() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const planetRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [positions, setPositions] = useState<Point[]>([]);

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

  // 각 행성별 시작/끝 점 offset (위치 보정)
  const offsetMap: { from: Point; to: Point }[] = [
    { from: { x: 40, y: -50 }, to: { x: 40, y: -65 } }, // 1 → 2
    { from: { x: -50, y: 60 }, to: { x: -50, y: 120 } }, // 2 → 3
    { from: { x: 50, y: 35 }, to: { x: -70, y: 40 } }, // 3 → 4
    { from: { x: 50, y: -70 }, to: { x: 30, y: -40 } }, // 4 → 5
  ];

  const updatePositions = () => {
    if (!wrapperRef.current) return;
    const containerRect = wrapperRef.current.getBoundingClientRect();

    const newPositions = planetRefs.current
      .map((el) => {
        if (!el) return null;
        const rect = el.getBoundingClientRect();
        return {
          x: rect.left - containerRect.left + rect.width / 2,
          y: rect.top - containerRect.top + rect.height / 2,
        };
      })
      .filter(Boolean) as Point[];

    setPositions(newPositions);
  };

  useEffect(() => {
    updatePositions();
    window.addEventListener('resize', updatePositions);
    return () => window.removeEventListener('resize', updatePositions);
  }, []);

  const getCurvePath = (from: Point, to: Point, index: number) => {
    const offset = offsetMap[index] || { from: { x: 0, y: 0 }, to: { x: 0, y: 0 } };

    const adjustedFrom = {
      x: from.x + offset.from.x,
      y: from.y + offset.from.y,
    };
    const adjustedTo = {
      x: to.x + offset.to.x,
      y: to.y + offset.to.y,
    };

    // 3 → 4 구간만 S자 커브 (C)
    if (index === 2) {
      const cp1 = { x: adjustedFrom.x + 150, y: adjustedFrom.y - 100 };
      const cp2 = { x: adjustedTo.x - 150, y: adjustedTo.y + 100 };
      return {
        path: `M ${adjustedFrom.x},${adjustedFrom.y} C ${cp1.x},${cp1.y} ${cp2.x},${cp2.y} ${adjustedTo.x},${adjustedTo.y}`,
        adjustedFrom,
        adjustedTo,
        cp1,
        cp2,
      };
    }

    // 그 외 구간은 Arc(반원)
    const dx = adjustedTo.x - adjustedFrom.x;
    const dy = adjustedTo.y - adjustedFrom.y;
    const radius = Math.sqrt(dx * dx + dy * dy) / 2;

    const sweepFlag = index === 1 ? 0 : 1; // 2→3만 아래로 휘게

    return {
      path: `M ${adjustedFrom.x},${adjustedFrom.y} A ${radius},${radius} 0 0,${sweepFlag} ${adjustedTo.x},${adjustedTo.y}`,
      adjustedFrom,
      adjustedTo,
      cp1: { x: 0, y: 0 },
      cp2: { x: 0, y: 0 },
    };
  };

  const setPlanetRef = (index: number) => (el: HTMLDivElement | null) => {
    planetRefs.current[index] = el;
  };
  const planetSizes = [180, 230, 180, 240, 150];

  return (
    <div className="relative w-full overflow-hidden">
      <div ref={scrollRef} className="w-full h-[800px] overflow-x-auto scroll-smooth">
        <div ref={wrapperRef} className="relative flex w-[1400px] h-full">
          {/*  SVG 점선 */}
          <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
            {positions.map((from, i) => {
              const to = positions[i + 1];
              if (!to) return null;

              const { path } = getCurvePath(from, to, i);

              return (
                <g key={i}>
                  <path
                    d={path}
                    fill="none"
                    stroke="#7BD5FF"
                    strokeWidth="2"
                    strokeDasharray="8 6"
                  />
                  {/* <circle cx={adjustedFrom.x} cy={adjustedFrom.y} r={5} fill="red" /> */}
                  {/* <circle cx={adjustedTo.x} cy={adjustedTo.y} r={5} fill="yellow" /> */}
                </g>
              );
            })}
          </svg>

          {/* 행성 렌더링 */}
          <div className="absolute top-[40px] left-[40px]">
            <PlanetComponent
              ref={setPlanetRef(0)}
              planetSrc={PLANETS[0]}
              satelliteSrc={SATELLITES[0]}
              planetSize={planetSizes[0]}
            />
          </div>
          <div className="absolute top-[250px] left-[210px]">
            <PlanetComponent
              ref={setPlanetRef(1)}
              planetSrc={PLANETS[1]}
              satelliteSrc={SATELLITES[1]}
              planetSize={planetSizes[1]}
            />
          </div>
          <div className="absolute top-[550px] left-[490px]">
            <PlanetComponent
              ref={setPlanetRef(2)}
              planetSrc={PLANETS[2]}
              satelliteSrc={SATELLITES[2]}
              planetSize={planetSizes[2]}
            />
          </div>
          <div className="absolute top-[60px] left-[620px]">
            <PlanetComponent
              ref={setPlanetRef(3)}
              planetSrc={PLANETS[3]}
              satelliteSrc={SATELLITES[3]}
              planetSize={planetSizes[3]}
            />
          </div>
          <div className="absolute top-[220px] left-[920px]">
            <PlanetComponent
              ref={setPlanetRef(4)}
              planetSrc={PLANETS[4]}
              satelliteSrc={SATELLITES[4]}
              planetSize={planetSizes[4]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
