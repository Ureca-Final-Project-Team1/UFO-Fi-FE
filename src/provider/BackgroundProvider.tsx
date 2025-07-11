'use client';

import { usePathname } from 'next/navigation';
import React from 'react';

import { IMAGE_PATHS } from '@/constants/images';

interface BackgroundProviderProps {
  children: React.ReactNode;
}

export default function BackgroundProvider({ children }: BackgroundProviderProps) {
  const pathname = usePathname();

  const backgroundImageUrl = (() => {
    if (
      (pathname.startsWith('/login'),
      pathname.startsWith('/signup'),
      pathname.startsWith('/blackhole'))
    ) {
      return IMAGE_PATHS.BG_LOGIN;
    }
    if (pathname.startsWith('/onboarding')) {
      return IMAGE_PATHS.BG_ONBOARDING;
    }
    return IMAGE_PATHS.BG_BASIC;
  })();

  return (
    <div
      className="w-full min-h-screen bg-cover bg-no-repeat bg-top flex flex-col items-center justify-between sm:px-10.5 px-4 text-white"
      style={{ backgroundImage: `url(${backgroundImageUrl})` }}
    >
      {children}
    </div>
  );
}
