import Image from 'next/image';
import React, { ComponentProps } from 'react';

const SATELLITE_SIZE = 30;
const SATELLITE_OFFSET_TOP = -35;

interface PlanetWithSatelliteProps extends ComponentProps<'div'> {
  planetSrc: string;
  satelliteSrc: string;
  planetSize: number;
  isArrived: boolean;
}

const PlanetWithSatellite = React.forwardRef<HTMLDivElement, PlanetWithSatelliteProps>(
  ({ planetSrc, satelliteSrc, planetSize, isArrived, className = '', ...rest }, ref) => {
    return (
      <div
        ref={ref}
        className={`relative flex flex-col items-center z-10 ${className}`}
        style={{ minWidth: planetSize, height: planetSize }}
        {...rest}
      >
        {/* 도착한 경우에만 위성 표시 */}
        {isArrived && (
          <Image
            src={satelliteSrc}
            alt="위성"
            width={SATELLITE_SIZE}
            height={SATELLITE_SIZE}
            className="absolute"
            style={{ top: `${SATELLITE_OFFSET_TOP}px` }}
          />
        )}

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

PlanetWithSatellite.displayName = 'PlanetWithSatellite';
export default PlanetWithSatellite;
