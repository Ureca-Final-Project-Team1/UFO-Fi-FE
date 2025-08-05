import Image from 'next/image';
import React from 'react';

import { getUserInfoResponse } from '@/backend';
import { IMAGE_PATHS } from '@/constants/images';
import queryClient from '@/shared/utils/queryClient';

interface NextButtonProps {
  isLast: boolean;
  onClick: () => void;
  className?: string;
}

export const NextButton = ({ isLast, onClick, className = '' }: NextButtonProps) => {
  const imageSrc = isLast ? IMAGE_PATHS.FIRE_BTN_ONBOARDING : IMAGE_PATHS.NEXT_BTN_ONBOARDING;
  const altText = isLast ? '시작하기' : '다음';
  const buttonAnimation = isLast ? '' : 'animate-pulse';

  if (isLast) {
    queryClient.setQueryData(['userInfo'], (prev: getUserInfoResponse | undefined) => {
      if (!prev) return prev;
      return {
        ...prev,
        content: {
          ...prev.content,
          role: 'ROLE_USER',
        },
      };
    });
  }

  return (
    <div className="flex justify-center">
      <button
        onClick={onClick}
        className={`transition-all duration-300 transform hover:scale-110 active:scale-95 ${buttonAnimation} ${className}`}
        aria-label={altText}
      >
        <Image
          src={imageSrc}
          alt={altText}
          width={140}
          height={30}
          className="w-64 h-auto drop-shadow-lg"
          priority
        />
      </button>
    </div>
  );
};
