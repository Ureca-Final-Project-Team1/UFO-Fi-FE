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

  // 네비게이션이 숨겨지는 페이지인지 확인
  const isNavigationHidden =
    pathname.startsWith('/login') ||
    pathname.startsWith('/onboarding') ||
    pathname.startsWith('/signup') ||
    pathname.startsWith('/blackhole');

  const containerStyle = isPasswordPage
    ? { backgroundColor: 'var(--color-password-bg)' }
    : backgroundImageUrl
      ? {
          backgroundImage: `url(${backgroundImageUrl})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'top',
          backgroundSize: 'cover',
        }
      : {};

  return (
    <div
      className={`w-full h-full bg-cover bg-center bg-no-repeat flex flex-col items-center justify-between sm:px-10.5 px-4 text-white ${
        isNavigationHidden ? 'min-h-screen' : 'min-h-full'
      }`}
      style={containerStyle}
    >
      {children}
    </div>
  );
}
