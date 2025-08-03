'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

import type { EcommerceItem, UserProperties } from '@/types/analytics';

import { analytics } from '../utils';

export function useAnalytics() {
  const pathname = usePathname();

  // 페이지 변경 시 자동 트래킹
  useEffect(() => {
    if (!pathname) return;
    analytics.pageview(pathname);
  }, [pathname]);

  return {
    // 기본 이벤트
    trackSignUp: (method?: string) => analytics.track.signUp(method),
    trackLogin: (method?: string, userId?: string) => analytics.track.login(method, userId),
    trackPurchase: (
      transactionId: string,
      value: number,
      items: EcommerceItem[],
      userId?: string,
    ) => analytics.track.purchase(transactionId, value, items, userId),
    trackButtonClick: (buttonName: string, location?: string) =>
      analytics.track.buttonClick(buttonName, location),
    trackSearch: (searchTerm: string) => analytics.track.search(searchTerm),

    // Clarity 특화 이벤트
    trackFormInteraction: (formName: string, action: 'start' | 'complete' | 'abandon') =>
      analytics.track.trackFormInteraction(formName, action),
    trackError: (errorType: string, errorMessage: string) =>
      analytics.track.errorOccurred(errorType, errorMessage),
    trackFeatureUsage: (featureName: string, context?: string) =>
      analytics.track.featureUsed(featureName, context),

    // 사용자 식별
    identifyUser: (userId: string, userProperties?: UserProperties) =>
      analytics.identifyUser(userId, userProperties),

    // 커스텀 이벤트
    track: (eventName: string, parameters?: Record<string, string | number | boolean | object>) =>
      analytics.event(eventName, parameters),
  };
}
