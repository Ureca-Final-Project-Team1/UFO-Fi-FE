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
    if (isOnboardingPage || isPasswordPage) return '';
    return IMAGE_PATHS.BG_BASIC;
  }, [pathname, isOnboardingPage, isPasswordPage]);

  const containerStyle = useMemo(() => {
    if (isPasswordPage) return { backgroundColor: 'var(--color-password-bg)' };
    if (isOnboardingPage) return { backgroundColor: 'var(--color-onboarding-bg)' };
    if (backgroundImageUrl)
      return {
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      };
    return {};
  }, [isPasswordPage, isOnboardingPage, backgroundImageUrl]);

  if (isAdminRoute) {
    return (
      <AppLayoutContext.Provider value={contextValue}>
        <div className="min-h-screen w-full bg-gray-50">{children}</div>
      </AppLayoutContext.Provider>
    );
  }

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

  return (
    <AppLayoutContext.Provider value={contextValue}>
      <div className="fixed inset-0 w-full h-full flex justify-center overflow-hidden bg-background">
        <div
          className="relative w-full h-full min-w-[375px] max-w-[620px] flex flex-col"
          style={containerStyle}
        >
          {!isNavigationHidden && <TopNav />}

          <main
            className="flex-1 overflow-y-auto overflow-x-hidden hide-scrollbar sm:px-10.5 px-6 text-white relative z-10"
            style={{
              WebkitOverflowScrolling: 'touch',
              overscrollBehavior: 'contain',
              paddingTop: isNavigationHidden ? '0px' : `${NAV_HEIGHT}px`,
              paddingBottom: isNavigationHidden
                ? isOnboardingPage
                  ? '0px'
                  : '32px'
                : `${BOTTOM_NAV_HEIGHT}px`,
            }}
          >
            {children}
          </main>

          {!isNavigationHidden && (
            <div
              className="fixed bottom-0 left-0 w-full z-40"
              style={{
                height: `${BOTTOM_NAV_HEIGHT}px`,
                overscrollBehavior: 'contain',
                touchAction: 'manipulation', // 터치 스크롤만 제어
              }}
            >
              <BottomNav />
            </div>
          )}

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
