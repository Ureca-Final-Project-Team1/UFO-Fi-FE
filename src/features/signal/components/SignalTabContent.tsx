'use client';

import { useEffect, useRef, useState } from 'react';

import { IMAGE_PATHS } from '@/constants';
import { Loading } from '@/shared';
import { useLetters } from '@/shared/hooks/useLetters';

import PlanetComponent from './PlanetComponent';
import {
  CONTAINER_HEIGHT,
  CONTAINER_WIDTH,
  PLANET_POSITIONS,
  PLANET_SIZES,
} from '../constants/layoutConfig';

interface SignalTabContentProps {
  maxHeight?: number;
}

export default function SignalTabContent({ maxHeight }: SignalTabContentProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState<number>(1);
  const [canScrollLeft, setCanScrollLeft] = useState<boolean>(false);
  const [canScrollRight, setCanScrollRight] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { planetStatus, completedPlanets, initializeLetters } = useLetters();

  useEffect(() => {
    const loadData = async () => {
      try {
        await initializeLetters();
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
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

  const getCurvePath = (
    from: { x: number; y: number },
    to: { x: number; y: number },
    index: number,
  ) => {
    if (index === 2) {
      const cp1 = { x: from.x + 200, y: from.y - 150 };
      const cp2 = { x: to.x - 200, y: to.y + 150 };
      return `M ${from.x},${from.y} C ${cp1.x},${cp1.y} ${cp2.x},${cp2.y} ${to.x},${to.y}`;
    }

    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const radius = (Math.sqrt(dx * dx + dy * dy) / 2) * 0.8;
    const sweepFlag = index === 1 ? 0 : 1;

    return `M ${from.x},${from.y} A ${radius},${radius} 0 0,${sweepFlag} ${to.x},${to.y}`;
  };

  const getConnectionColor = (fromIndex: number, toIndex: number) => {
    return planetStatus[fromIndex] && planetStatus[toIndex] ? '#7BD5FF' : '#666666';
  };

  const calculateScale = () => {
    const availableHeight = maxHeight || window.innerHeight * 0.8;
    const newScale = Math.min(1, availableHeight / CONTAINER_HEIGHT);
    setScale(newScale);
  };

  useEffect(() => {
    calculateScale();
    window.addEventListener('resize', calculateScale);
    return () => window.removeEventListener('resize', calculateScale);
  }, [maxHeight]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const onWheel = (e: WheelEvent) => {
      if (e.deltaY !== 0) {
        e.preventDefault();
        container.scrollLeft += e.deltaY;
      }
    };

    container.addEventListener('wheel', onWheel, { passive: false });
    return () => container.removeEventListener('wheel', onWheel);
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const updateScrollButtons = () => {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    };

    updateScrollButtons();
    container.addEventListener('scroll', updateScrollButtons);
    return () => container.removeEventListener('scroll', updateScrollButtons);
  }, [scale]);

  const scrollLeft = () => {
    scrollContainerRef.current?.scrollTo({ left: 0, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollContainerRef.current?.scrollTo({
      left: scrollContainerRef.current.scrollWidth,
      behavior: 'smooth',
    });
  };

  return (
    <section aria-label="탐사 경로 시각화" className="relative w-full overflow-hidden">
      {/* 로딩 오버레이로 변경 */}
      {isLoading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center">
          <Loading variant="signal" message="탐사 기록을 불러오는 중..." className="p-8" />
        </div>
      )}

      <div className={isLoading ? 'opacity-0' : 'opacity-100'}>
        <p className="text-white text-md pyeongchangpeace-title-2 mb-5" aria-live="polite">
          {completedPlanets}번째 은하까지 탐사 완료...
        </p>

        {canScrollLeft && (
          <aside className="absolute z-10 top-1/2 -translate-y-1/2 left-0">
            <button onClick={scrollLeft} className="bg-black/50 text-white px-3 py-2 rounded-r">
              ◀
            </button>
          </aside>
        )}

        {canScrollRight && (
          <aside className="absolute z-10 top-1/2 -translate-y-1/2 right-0">
            <button onClick={scrollRight} className="bg-black/50 text-white px-3 py-2 rounded-l">
              ▶
            </button>
          </aside>
        )}

        <div
          ref={scrollContainerRef}
          className="w-full overflow-x-auto scroll-smooth hide-scrollbar"
          style={{ height: `${CONTAINER_HEIGHT * scale}px` }}
        >
          <div
            ref={contentRef}
            className="relative origin-top-left"
            style={{
              transform: `scale(${scale})`,
              width: `${CONTAINER_WIDTH}px`,
              height: `${CONTAINER_HEIGHT}px`,
            }}
          >
            <svg
              className="absolute top-0 left-0 pointer-events-none"
              width={CONTAINER_WIDTH}
              height={CONTAINER_HEIGHT}
            >
              {PLANET_POSITIONS.map((from, i) => {
                const to = PLANET_POSITIONS[i + 1];
                if (!to) return null;

                const fromPoint = {
                  x: from.left + PLANET_SIZES[i] / 2,
                  y: from.top + PLANET_SIZES[i] / 2,
                };
                const toPoint = {
                  x: to.left + PLANET_SIZES[i + 1] / 2,
                  y: to.top + PLANET_SIZES[i + 1] / 2,
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

            {PLANET_POSITIONS.map((planet, index) => (
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
                  planetSize={PLANET_SIZES[index]}
                  isArrived={planetStatus[index]}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
