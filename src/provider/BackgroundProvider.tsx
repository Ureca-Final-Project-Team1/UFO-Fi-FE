'use client';

import { usePathname } from 'next/navigation';
import React from 'react';

import { IMAGE_PATHS } from '@/constants/images';

interface BackgroundProviderProps {
  children: React.ReactNode;
}

export function BackgroundProvider({ children }: BackgroundProviderProps) {
  const pathname = usePathname();

  const isPasswordPage = pathname.includes('password');

  const backgroundImageUrl = (() => {
    if (
      pathname.startsWith('/login') ||
      pathname.startsWith('/signup') ||
      pathname.startsWith('/blackhole')
    ) {
      return IMAGE_PATHS.BG_LOGIN;
    }

    if (pathname.startsWith('/onboarding')) {
      return IMAGE_PATHS.BG_ONBOARDING;
    }

    if (isPasswordPage) {
      return '';
    }

    return IMAGE_PATHS.BG_BASIC;
  })();

  const containerClass = [
    'w-full min-h-full flex flex-col items-center justify-between sm:px-10.5 px-4 text-white',
    isPasswordPage ? '' : 'bg-cover bg-no-repeat bg-top',
  ].join(' ');

  const containerStyle = isPasswordPage
    ? { backgroundColor: 'var(--color-password-bg)' }
    : backgroundImageUrl
      ? { backgroundImage: `url(${backgroundImageUrl})` }
      : {};

  return (
    <div className={containerClass} style={containerStyle}>
      {children}
    </div>
  );
}
