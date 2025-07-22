import { create } from 'zustand';

type TabType = 'sell' | 'purchase';

interface TradeTabStore {
  tab: TabType;
  setTab: (tap: TabType) => void;
}

export const useTradeTabStore = create<TradeTabStore>((set) => ({
  tab: 'sell',
  setTab: (tab) => set({ tab }),
}));
