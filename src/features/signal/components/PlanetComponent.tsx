import Image from 'next/image';
import React from 'react';

interface PlanetComponentProps {
  planetSrc: string;
  satelliteSrc: string;
  planetSize: number;
  isArrived: boolean;
}

const PlanetComponent = React.forwardRef<HTMLDivElement, PlanetComponentProps>(
  ({ planetSrc, satelliteSrc, planetSize, isArrived }, ref) => {
    return (
      <div
        ref={ref}
        className="relative flex flex-col items-center z-10"
        style={{ minWidth: planetSize, height: planetSize }}
      >
        {/* 도착한 경우에만 위성 표시 */}
        {isArrived && (
          <Image
            src={satelliteSrc}
            alt="위성"
            width={30}
            height={30}
            className="absolute top-[-12px]"
          />
        )}

        {/* 행성 이미지 - 도착 여부에 따라 흑백/컬러 처리 */}
        <Image
          src={planetSrc}
          alt="행성"
          width={planetSize}
          height={planetSize}
          className={!isArrived ? 'grayscale' : ''}
        />
      </div>
    );
  },
);

PlanetComponent.displayName = 'PlanetComponent';
export default PlanetComponent;
