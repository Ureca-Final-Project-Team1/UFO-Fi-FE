import { SetStateAction } from 'react';
import { create } from 'zustand';

interface BulkState {
  capacityValue: number[];
  pricePerGB: string;
  importantValue: string;
  setCapacityValue: (value: SetStateAction<number[]>) => void;
  setPricePerGB: (value: string) => void;
  setImportantValue: (value: string) => void;
}

export const useBulkStore = create<BulkState>((set) => ({
  capacityValue: [50],
  pricePerGB: '',
  importantValue: '용량',

  setCapacityValue: (value: React.SetStateAction<number[]>) =>
    set((state) => ({
      capacityValue: typeof value === 'function' ? value(state.capacityValue) : value,
    })),
  setPricePerGB: (value) => set({ pricePerGB: value }),
  setImportantValue: (value) => set({ importantValue: value }),
}));
