'use client';

import { usePathname } from 'next/navigation';
import React from 'react';

import { IMAGE_PATHS } from '@/constants/images';
import { cn } from '@/lib/utils';

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

  const containerClass = cn(
    'w-full min-h-full flex flex-col items-center justify-between sm:px-10.5 px-4 text-white',
  );

  return (
    <div className={containerClass} style={containerStyle}>
      {children}
    </div>
  );
}
