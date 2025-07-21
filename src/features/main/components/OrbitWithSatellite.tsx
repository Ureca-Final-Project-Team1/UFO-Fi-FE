'use client';

import Image from 'next/image';
import React from 'react';

const ORBIT_BASE_SIZE = 600;
const SATELLITE_WIDTH = 30;
const SATELLITE_HEIGHT = 60;
const ORBIT_COUNT = 5;

const orbitConfigs = [
  { color: '#FFD230', speed: 'spin-reverse-slow', image: '/images/main/satellite1.svg' },
  { color: '#70C3BB', speed: 'spin-mid', image: '/images/main/satellite2.svg' },
  { color: '#67CBDC', speed: 'spin-slow', image: '/images/main/satellite3.svg' },
  { color: '#735AB1', speed: 'spin-reverse-mid', image: '/images/main/satellite4.svg' },
  { color: '#D24D9B', speed: 'spin-reverse-fast', image: '/images/main/satellite5.svg' },
];

export default function OrbitWithSatellite() {
  return (
    <div
      className="absolute"
      style={{
        top: '50%',
        left: '50%',
        width: ORBIT_BASE_SIZE,
        height: ORBIT_BASE_SIZE,
        transform: 'translate(-50%, -50%)',
      }}
    >
      {orbitConfigs.map(({ color, speed, image }, i) => {
        const orbitSize = ORBIT_BASE_SIZE - (ORBIT_COUNT - 1 - i) * 80;
        const offset = (ORBIT_BASE_SIZE - orbitSize) / 2;
        const satelliteTransform = `translate(-50%, -${orbitSize / 2 + SATELLITE_HEIGHT / 2}px)`;

        return (
          <div
            key={i}
            className={`absolute rounded-full border-2 border-dashed ${speed}`}
            style={{
              width: orbitSize,
              height: orbitSize,
              top: offset,
              left: offset,
              borderColor: `${color}50`,
            }}
          >
            <div
              className="absolute"
              style={{
                top: '50%',
                left: '50%',
                transform: satelliteTransform,
              }}
            >
              <Image
                src={image}
                alt={`Satellite ${i + 1}`}
                width={SATELLITE_WIDTH}
                height={SATELLITE_HEIGHT}
              />
            </div>
          </div>
        );
      })}

      {/* 중앙 행성 + 외계인 */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 relative w-[220px] h-[220px]">
        {/* 외계인 */}
        <Image
          src="/images/main/alien.svg"
          alt="Alien"
          width={100}
          height={100}
          className="absolute left-1/2 -translate-x-1/2"
          style={{
            top: '-15px',
            zIndex: 1,
          }}
        />

        {/* 행성 */}
        <Image
          src="/images/main/myplanet.svg"
          alt="MyPlanet"
          width={200}
          height={200}
          className="absolute bottom-0 left-1/2 -translate-x-1/2"
        />
      </div>

      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes spin-reverse {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }

        .spin-slow {
          animation: spin 20s linear infinite;
        }
        .spin-mid {
          animation: spin 15s linear infinite;
        }
        .spin-fast {
          animation: spin 10s linear infinite;
        }
        .spin-reverse-slow {
          animation: spin-reverse 18s linear infinite;
        }
        .spin-reverse-mid {
          animation: spin-reverse 14s linear infinite;
        }
        .spin-reverse-fast {
          animation: spin-reverse 10s linear infinite;
        }
      `}</style>
    </div>
  );
}
