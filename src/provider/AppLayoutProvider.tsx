'use client';

import { usePathname } from 'next/navigation';
import React from 'react';

import { IMAGE_PATHS } from '@/constants/images';
import BottomNav from '@/shared/layout/BottomNav';
import TopNav from '@/shared/layout/TopNav';

interface AppLayoutProviderProps {
  children: React.ReactNode;
}

const NAV_HEIGHT = 56;
const BOTTOM_NAV_HEIGHT = 64;

export function AppLayoutProvider({ children }: AppLayoutProviderProps) {
  const pathname = usePathname();

  const isAdminRoute = pathname.startsWith('/admin');
  const isPasswordPage = pathname.includes('password');
  const isNavigationHidden =
    pathname.startsWith('/login') ||
    pathname.startsWith('/onboarding') ||
    pathname.startsWith('/signup/privacy');

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
          backgroundSize: 'cover',
        }
      : {};

  if (isAdminRoute) return <>{children}</>;

  return (
    <div className="min-h-screen w-full flex justify-center">
      <div
        className={`
          relative w-full min-w-[375px] max-w-[620px] overflow-hidden
          ${backgroundImageUrl ? 'nav-container-bg' : ''}
        `}
        style={containerStyle}
      >
        {!isNavigationHidden && <TopNav />}
        <main
          className="overflow-y-auto overflow-x-hidden hide-scrollbar relative z-10 sm:px-10.5 px-6 text-white"
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
