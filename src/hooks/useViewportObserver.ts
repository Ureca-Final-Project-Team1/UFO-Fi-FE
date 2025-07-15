'use client';

import { useEffect } from 'react';

import { useViewportStore } from '@/stores/useViewportStore';

export const useViewportObserver = () => {
  const setViewport = useViewportStore((state) => state.setViewport);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const updateViewport = () => {
      setViewport(window.innerWidth);
    };

    updateViewport();
    window.addEventListener('resize', updateViewport);

    return () => window.removeEventListener('resize', updateViewport);
  }, [setViewport]);
};
