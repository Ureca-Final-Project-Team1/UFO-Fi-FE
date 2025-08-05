'use client';

import { useEffect, useState } from 'react';

export const FixedScaleWrapper = ({ children }: { children: React.ReactNode }) => {
  const BASE_WIDTH = 390;
  const BASE_HEIGHT = 844;
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const resize = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const scaleW = vw / BASE_WIDTH;
      const scaleH = vh / BASE_HEIGHT;
      setScale(Math.min(scaleW, scaleH));
    };

    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  return (
    <div className="w-screen h-screen bg-black overflow-hidden flex justify-center items-center">
      <div
        style={{
          width: BASE_WIDTH,
          height: BASE_HEIGHT,
          transform: `scale(${scale})`,
          transformOrigin: 'top center',
        }}
      >
        {children}
      </div>
    </div>
  );
};
