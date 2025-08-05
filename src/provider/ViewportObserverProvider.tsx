'use client';

import { useViewportObserver } from '@/shared/hooks/useViewportObserver';

export function ViewportObserverProvider({ children }: { children: React.ReactNode }) {
  useViewportObserver(); // 전역 resize 감지
  return <>{children}</>;
}
