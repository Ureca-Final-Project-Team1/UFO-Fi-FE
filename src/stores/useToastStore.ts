import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ToastStore {
  message: string | null;
  setMessage: (msg: string) => void;
  clearMessage: () => void;
}

export const useToastStore = create<ToastStore>()(
  persist(
    (set) => ({
      message: null,
      setMessage: (msg) => set({ message: msg }),
      clearMessage: () => set({ message: null }),
    }),
    {
      name: 'trade-tab',
    },
  ),
);
