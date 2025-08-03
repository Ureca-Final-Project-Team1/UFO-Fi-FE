import Image from 'next/image';
import React from 'react';

import { IMAGE_PATHS } from '@/constants';

export const OnboardingNextButton = ({
  isLast,
  onClick,
}: {
  isLast: boolean;
  onClick: () => void;
}) => (
  <div className="flex justify-center">
    <button
      onClick={onClick}
      className={`transition-all duration-300 transform hover:scale-110 active:scale-95 ${
        isLast ? '' : 'animate-pulse'
      }`}
      aria-label={isLast ? '시작하기' : '다음'}
    >
      <Image
        src={isLast ? IMAGE_PATHS['FIRE_BTN_ONBOARDING'] : IMAGE_PATHS['NEXT_BTN_ONBOARDING']}
        alt={isLast ? '시작하기' : '다음'}
        className="w-64 h-auto drop-shadow-lg"
        width={140}
        height={30}
        priority
      />
    </button>
  </div>
);
