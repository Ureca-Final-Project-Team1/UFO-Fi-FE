'use client';

import { useViewportObserver } from '@/features';

export function ViewportObserverProvider({ children }: { children: React.ReactNode }) {
  useViewportObserver(); // 전역 resize 감지
  return <>{children}</>;
}
