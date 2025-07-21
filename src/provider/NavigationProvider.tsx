'use client';

import { usePathname } from 'next/navigation';
import React from 'react';

import { IMAGE_PATHS } from '@/constants/images';
import BottomNav from '@/shared/layout/BottomNav';
import TopNav from '@/shared/layout/TopNav';

interface NavigationProviderProps {
  children: React.ReactNode;
}

const NAV_HEIGHT = 56; // TopNav 높이
const BOTTOM_NAV_HEIGHT = 64; // BottomNav 높이

export function NavigationProvider({ children }: NavigationProviderProps) {
  const pathname = usePathname();

  // admin 경로는 네비게이션/배경 등 일체 적용하지 않고 children만 반환
  if (pathname.startsWith('/admin')) {
    return <>{children}</>;
  }

  const isNavigationHidden =
    pathname.startsWith('/login') ||
    pathname.startsWith('/onboarding') ||
    pathname.startsWith('/signup/privacy');

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
      ? { backgroundImage: `url(${backgroundImageUrl})` }
      : {};

  return (
    <div className="min-h-screen w-full flex justify-center">
      <div
        className={`
          relative w-full min-w-[375px] max-w-[620px] overflow-hidden h-screen
          ${backgroundImageUrl ? 'nav-container-bg' : ''}
        `}
        style={containerStyle}
      >
        {!isNavigationHidden && <TopNav />}
        <main
          className="overflow-y-auto hide-scrollbar relative z-10"
          style={{
            height: `calc(100dvh - ${isNavigationHidden ? '0px' : `${NAV_HEIGHT + BOTTOM_NAV_HEIGHT}px`})`,
            marginTop: isNavigationHidden ? '0px' : `${NAV_HEIGHT}px`,
            WebkitOverflowScrolling: 'touch',
            overscrollBehavior: 'contain',
          }}
        >
          {children}
        </main>
        {!isNavigationHidden && <BottomNav />}
      </div>
    </div>
  );
}
