import Image from 'next/image';
import React from 'react';

export const OnboardingImageFrame = ({ src }: { src: string }) => (
  <div className="w-full max-w-md mx-auto aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl relative">
    <Image
      src={src}
      alt="온보딩 이미지"
      fill
      className="object-cover rounded-3xl"
      sizes="(max-width: 768px) 100vw, 400px"
      priority
    />
    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent" />
  </div>
);
