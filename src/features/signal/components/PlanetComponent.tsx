import Image from 'next/image';
import React, { ComponentProps } from 'react';

const SATELLITE_SIZE = 30;

interface PlanetComponentProps extends ComponentProps<'div'> {
  planetSrc: string;
  satelliteSrc: string;
  planetSize: number;
  isArrived: boolean;
}

const PlanetComponent = React.forwardRef<HTMLDivElement, PlanetComponentProps>(
  ({ planetSrc, satelliteSrc, planetSize, isArrived, className = '', ...rest }, ref) => {
    return (
      <div
        ref={ref}
        className={`relative flex flex-col items-center z-10 ${className}`}
        style={{
          minWidth: planetSize,
          height: planetSize,
        }}
        {...rest}
      >
        {isArrived && (
          <Image
            src={satelliteSrc}
            alt="위성"
            width={SATELLITE_SIZE}
            height={SATELLITE_SIZE}
            className="absolute top-[-12px]"
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

PlanetComponent.displayName = 'PlanetComponent';
export default PlanetComponent;
