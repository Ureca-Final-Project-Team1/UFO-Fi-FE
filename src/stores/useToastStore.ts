import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type StatusProps = 'success' | 'info' | 'warning' | 'error' | 'message' | 'loading';

interface ToastStore {
  message: string | null;
  status?: StatusProps;
  hasShown: boolean;
  setToast: (msg: string, status?: StatusProps) => void;
  clearToast: () => void;
}

export const useToastStore = create<ToastStore>()(
  persist(
    (set) => ({
      message: null,
      status: 'success',
      hasShown: true,
      setToast: (msg, stat = 'message') => set({ message: msg, status: stat, hasShown: false }),
      clearToast: () => set({ message: null, status: 'success', hasShown: true }),
    }),
    {
      name: 'trade-tab',
    },
  ),
);
