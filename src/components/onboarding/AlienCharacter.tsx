'use client';
import Image from 'next/image';
import React from 'react';

import { IMAGE_PATHS } from '@/constants/images';

export const AlienCharacter = ({ isPointing }: { isPointing?: boolean }) => {
  return (
    <div className="relative z-50 flex justify-center">
      <div className="relative w-32 h-auto">
        <Image
          src={IMAGE_PATHS['AL_ONBOARDING']}
          alt="UFO-Fi 외계인"
          width={160}
          height={160}
          className={`w-28 h-auto drop-shadow-2xl transition-transform duration-300 ${
            isPointing ? 'animate-pulse' : 'animate-bounce'
          }`}
          priority
        />
      </div>
    </div>
  );
};
