'use client';
import Image from 'next/image';
import React from 'react';

import { IMAGE_PATHS } from '@/constants/images';

export const AlienCharacter = () => {
  return (
    <div className="relative z-50 w-full h-full flex justify-center items-center">
      <Image
        src={IMAGE_PATHS['AL_ONBOARDING']}
        alt="UFO-Fi 외계인"
        width={500}
        height={500}
        className="w-full h-full max-w-full max-h-full object-contain drop-shadow-2xl transition-all duration-300 animate-bounce aspect-square"
        priority
      />
    </div>
  );
};
