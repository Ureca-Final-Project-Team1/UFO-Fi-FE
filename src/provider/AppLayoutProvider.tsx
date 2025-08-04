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

export function AppLayoutProvider({ children }: AppLayoutProviderProps) {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    // body/html 레벨의 스크롤만 방지, main 영역 스크롤은 허용
    const preventPageScroll = (e: Event) => {
      // main 요소나 그 하위 요소에서 발생한 스크롤은 허용
      const target = e.target as Element;
      const mainElement = target?.closest('main');

      // main 영역이 아닌 곳에서의 스크롤만 방지
      if (!mainElement && window.scrollY !== 0) {
        window.scrollTo(0, 0);
      }
    };

    // 초기 스크롤 위치 설정
    window.scrollTo(0, 0);

    // 스크롤 이벤트 감지
    window.addEventListener('scroll', preventPageScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', preventPageScroll);
    };
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
      };
    }
    return {};
  }, [isPasswordPage, isOnboardingPage, backgroundImageUrl]);

  if (isAdminRoute) {
    return (
      <AppLayoutContext.Provider value={contextValue}>
        <div className="h-screen w-full bg-gray-50">{children}</div>
      </AppLayoutContext.Provider>
    );
  }

  if (!isMounted) {
    return (
      <AppLayoutContext.Provider value={contextValue}>
        <div className="w-full h-full flex justify-center fixed inset-0 overflow-hidden">
          <div className="relative w-full h-full min-w-[375px] max-w-[620px] overflow-hidden">
            <main className="h-full flex flex-col px-6 text-white overflow-y-auto">{children}</main>
          </div>
        </div>
      </AppLayoutContext.Provider>
    );
  }

  return (
    <AppLayoutContext.Provider value={contextValue}>
      <div className="w-full h-screen flex justify-center overflow-hidden fixed inset-0">
        <div
          className={`relative flex flex-col w-full h-full min-w-[375px] max-w-[620px] ${
            backgroundImageUrl ? 'nav-container-bg' : ''
          }`}
          style={containerStyle}
        >
          {/* 상단 고정 */}
          {!isNavigationHidden && (
            <div className="shrink-0 z-50">
              <TopNav />
            </div>
          )}

          {/* 가운데 스크롤 영역 */}
          <main
            className={`
              flex-1 overflow-y-auto overflow-x-hidden hide-scrollbar relative z-10
              sm:px-10.5 px-6 text-white
              ${isHomePage ? 'flex flex-col justify-center items-center' : 'flex flex-col'}
            `}
            style={{
              WebkitOverflowScrolling: 'touch',
              overscrollBehavior: 'contain',
            }}
          >
            {children}
          </main>

          {/* 하단 고정 */}
          {!isNavigationHidden && (
            <div className="shrink-0 z-50">
              <BottomNav />
            </div>
          )}

          {/* Scroll to top 버튼 */}
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
