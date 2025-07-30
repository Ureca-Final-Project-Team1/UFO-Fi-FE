import { create } from 'zustand';

interface ScrollState {
  y: number;
  setY: (y: number) => void;
}

export const useScrollStore = create<ScrollState>((set) => ({
  y: 0,
  setY: (y) => set({ y }),
}));
