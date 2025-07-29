import Image from 'next/image';
import React from 'react';

interface Props {
  planetSrc: string;
  satelliteSrc: string;
  message?: string;
  planetSize?: number;
}

const PlanetComponent = React.forwardRef<HTMLDivElement, Props>(
  ({ planetSrc, satelliteSrc, message, planetSize }, ref) => {
    return (
      <div
        ref={ref}
        className="relative flex flex-col items-center z-10"
        style={{ minWidth: planetSize, height: planetSize }}
      >
        <Image
          src={satelliteSrc}
          alt="위성"
          width={30}
          height={30}
          className="absolute top-[-12px]"
        />
        <Image src={planetSrc} alt="행성" width={planetSize} height={planetSize} />
        {message && <span className="absolute top-[-36px] text-sm text-white">{message}</span>}
      </div>
    );
  },
);

PlanetComponent.displayName = 'PlanetComponent';
export default PlanetComponent;
