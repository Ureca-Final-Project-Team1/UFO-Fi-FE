'use client';

import { usePathname } from 'next/navigation';
import React, { createContext, useContext, useMemo, useEffect, useState } from 'react';

import { IMAGE_PATHS } from '@/constants/images';
import { ScrollToTopButton } from '@/features/common/components/ScrollToTopButton';
import BottomNav from '@/shared/layout/BottomNav';
import TopNav from '@/shared/layout/TopNav';

interface AppLayoutContextValue {
  isAdminPage: boolean;
  hideNavigation: boolean;
  isPasswordPage: boolean;
}

const AppLayoutContext = createContext<AppLayoutContextValue | undefined>(undefined);

export const useAppLayout = () => {
  const context = useContext(AppLayoutContext);
  if (!context) {
    throw new Error('useAppLayout must be used within AppLayoutProvider');
  }
  return context;
};

interface AppLayoutProviderProps {
  children: React.ReactNode;
}

const NAV_HEIGHT = 56;
const BOTTOM_NAV_HEIGHT = 64;

export function AppLayoutProvider({ children }: AppLayoutProviderProps) {
  const pathname = usePathname();
  // Next.js 15.4 SSR hydration mismatch 완전 방지
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const isAdminRoute = pathname.startsWith('/admin');
  const isPasswordPage = pathname.includes('password');
  const isOnboardingPage = pathname.startsWith('/onboarding');
  const isNavigationHidden =
    pathname.startsWith('/login') ||
    isOnboardingPage ||
    pathname.startsWith('/blackhole') ||
    pathname.startsWith('/signup/privacy');

  const isHomePage = pathname === '/';

  // React Hook Rules 준수: 모든 hooks를 early return 전에 호출
  const contextValue: AppLayoutContextValue = useMemo(
    () => ({
      isAdminPage: isAdminRoute,
      hideNavigation: isNavigationHidden,
      isPasswordPage,
    }),
    [isAdminRoute, isNavigationHidden, isPasswordPage],
  );

  const backgroundImageUrl = useMemo(() => {
    if (
      pathname.startsWith('/login') ||
      pathname.startsWith('/signup') ||
      pathname.startsWith('/blackhole')
    ) {
      return IMAGE_PATHS.BG_LOGIN;
    }
    if (isOnboardingPage || isPasswordPage) {
      return '';
    }
    return IMAGE_PATHS.BG_BASIC;
  }, [pathname, isOnboardingPage, isPasswordPage]);

  const containerStyle = useMemo(() => {
    if (isPasswordPage) {
      return { backgroundColor: 'var(--color-password-bg)' };
    }
    if (isOnboardingPage) {
      return { backgroundColor: 'var(--color-onboarding-bg)' };
    }
    if (backgroundImageUrl) {
      return {
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        // backgroundAttachment: 'fixed'
      };
    }
    return {};
  }, [isPasswordPage, isOnboardingPage, backgroundImageUrl]);

  if (isAdminRoute) {
    return (
      <AppLayoutContext.Provider value={contextValue}>
        <div className="min-h-screen w-full bg-gray-50">{children}</div>
      </AppLayoutContext.Provider>
    );
  }

  // SSR hydration mismatch 방지
  if (!isMounted) {
    return (
      <AppLayoutContext.Provider value={contextValue}>
        <div className="min-h-screen w-full flex justify-center">
          <div className="relative w-full h-full min-w-[375px] max-w-[620px] overflow-hidden">
            <main className="min-h-screen flex flex-col px-6 text-white">{children}</main>
          </div>
        </div>
      </AppLayoutContext.Provider>
    );
  }

  // 클라이언트에서 레이아웃 적용
  return (
    <AppLayoutContext.Provider value={contextValue}>
      <div className="min-h-screen w-full flex justify-center">
        <div
          className={`relative w-full h-full min-w-[375px] max-w-[620px] overflow-hidden ${
            backgroundImageUrl ? 'nav-container-bg' : ''
          }`}
          style={containerStyle}
        >
          {!isNavigationHidden && <TopNav />}
          <main
            className={`overflow-y-auto overflow-x-hidden hide-scrollbar relative z-10 sm:px-10.5 px-6 text-white ${
              isHomePage ? 'flex flex-col justify-center items-center' : 'flex flex-col'
            }`}
            style={{
              minHeight: '100dvh',
              paddingTop: isNavigationHidden ? '0px' : `${NAV_HEIGHT}px`,
              paddingBottom: isNavigationHidden
                ? isOnboardingPage
                  ? '0px'
                  : '32px'
                : `${BOTTOM_NAV_HEIGHT}px`,
              height: isNavigationHidden
                ? '100dvh'
                : `calc(100dvh - ${NAV_HEIGHT + BOTTOM_NAV_HEIGHT}px)`,
              WebkitOverflowScrolling: 'touch',
              overscrollBehavior: 'contain',
            }}
          >
            {children}
          </main>
          {!isNavigationHidden && <BottomNav />}

          {!isNavigationHidden && (
            <div className="absolute bottom-24 right-4 z-50">
              <ScrollToTopButton />
            </div>
          )}
        </div>
      </div>
    </AppLayoutContext.Provider>
  );
}
