'use client';
import Image from 'next/image';

interface Planet {
  id: number;
  src: string;
  active: boolean;
  color: string;
}

export default function PlanetProgressBar() {
  const planets: Planet[] = [
    { id: 1, src: '/images/main/planet1.svg', active: true, color: '#B39645' },
    { id: 2, src: '/images/main/planet2.svg', active: true, color: '#45B3B0' },
    { id: 3, src: '/images/main/planet3.svg', active: true, color: '#4564B3' },
    { id: 4, src: '/images/main/planet4.svg', active: false, color: '#8745B3' },
    { id: 5, src: '/images/main/planet5.svg', active: false, color: '#B3459B' },
  ];

  const completed = planets.filter((p) => p.active).length;

  return (
    <div className="flex flex-col items-center w-full gap-2 px-4">
      {/* 진행 텍스트 */}
      <p className="text-white text-sm">{completed}번째 은하까지 탐사 완료...</p>

      {/* 행성 + 점선 궤도 */}
      <div className="relative flex items-center justify-center w-full">
        {/* 점선 궤도 */}
        <div className="absolute top-1/2 left-4 right-16 rounded-full border-1 border-dashed border-gray-400 -translate-y-1/2" />

        {/* 행성들 */}
        <div className="flex gap-3 relative z-10">
          {planets.map((p) => (
            <Planet key={p.id} {...p} />
          ))}
        </div>

        {/* 진행 숫자 원형 */}
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#222] text-white text-sm ml-3 relative z-10 flex-shrink-0">
          {completed}/{planets.length}
        </div>
      </div>
    </div>
  );
}

function Planet({ src, active, color }: Planet) {
  return (
    <div
      className="relative w-12 h-12 rounded-full flex items-center justify-center"
      style={{
        backgroundColor: active ? color : 'undefined',
        boxShadow: active
          ? `
            0 0 0 6px ${hexToRgba(color, 0.6)},
            0 0 0 12px ${hexToRgba(color, 0.4)},
            0 0 0 18px ${hexToRgba(color, 0.2)}
          `
          : 'none',
      }}
    >
      <Image src={src} alt="planet" width={50} height={50} />
    </div>
  );
}

function hexToRgba(hex: string, alpha: number) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
