import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type TabState = {
  tab: 'sell' | 'purchase';
  setTab: (tab: 'sell' | 'purchase') => void;
};

export const useTradeTabStore = create<TabState>()(
  persist(
    (set) => ({
      tab: 'sell',
      setTab: (tab) => set({ tab }),
    }),
    {
      name: 'trade-tab',
    },
  ),
);
