'use client';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { ROUTE_CONFIG, routeUtils } from '@/constants/routes';

export function useOnboardingGuard() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // 개발 환경에서는 체크 안함
    if (process.env.NODE_ENV === 'development') return;

    // 온보딩 체크가 필요한 라우트인지 확인
    if (!routeUtils.shouldCheckOnboarding(pathname)) return;

    // 온보딩 완료 상태 체크
    const isCompleted = localStorage.getItem('ufo_fi_onboarding_completed') === 'true';

    if (!isCompleted) router.push(ROUTE_CONFIG.ONBOARDING_PATH);
  }, [pathname, router]);
}
