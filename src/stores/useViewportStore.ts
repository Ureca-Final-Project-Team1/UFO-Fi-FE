import { create } from 'zustand';

interface ViewportState {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  setViewport: (width: number) => void;
}

export const useViewportStore = create<ViewportState>((set) => ({
  isMobile: false,
  isTablet: false,
  isDesktop: true,
  setViewport: (width: number) => {
    set({
      isMobile: width < 640,
      isTablet: width >= 640 && width < 1024,
      isDesktop: width >= 1024,
    });
  },
}));
