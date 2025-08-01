'use client';

import { usePathname } from 'next/navigation';
import React, { createContext, useContext } from 'react';

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

  const isAdminRoute = pathname.startsWith('/admin');
  const isPasswordPage = pathname.includes('password');
  const isNavigationHidden =
    pathname.startsWith('/login') ||
    pathname.startsWith('/onboarding') ||
    pathname.startsWith('/blackhole') ||
    pathname.startsWith('/signup/privacy');

  // 홈페이지만 중앙 정렬, 나머지는 일반 플렉스 컬럼
  const isHomePage = pathname === '/';

  const contextValue: AppLayoutContextValue = {
    isAdminPage: isAdminRoute,
    hideNavigation: isNavigationHidden,
    isPasswordPage,
  };

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
          backgroundPosition: 'center', // 배경 이미지 중앙 정렬
        }
      : {};

  if (isAdminRoute) {
    return (
      <AppLayoutContext.Provider value={contextValue}>
        <div className="min-h-screen w-full bg-gray-50">{children}</div>
      </AppLayoutContext.Provider>
    );
  }

  return (
    <AppLayoutContext.Provider value={contextValue}>
      <div className="min-h-screen w-full flex justify-center">
        <div
          className={`
            relative w-full h-full min-w-[375px] max-w-[620px] overflow-hidden
            ${backgroundImageUrl ? 'nav-container-bg' : ''}
          `}
          style={containerStyle}
        >
          {!isNavigationHidden && <TopNav />}
          <main
            className={`
              overflow-y-auto overflow-x-hidden hide-scrollbar relative z-10 sm:px-10.5 px-6 text-white
              ${isHomePage ? 'flex flex-col justify-center items-center' : 'flex flex-col'}
            `}
            style={{
              minHeight: '100dvh',
              paddingTop: isNavigationHidden ? '0px' : `${NAV_HEIGHT}px`,
              paddingBottom: isNavigationHidden ? '32px' : `${BOTTOM_NAV_HEIGHT}px`,
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
