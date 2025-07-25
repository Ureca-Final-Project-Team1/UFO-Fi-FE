import { create } from 'zustand';

interface ToastStore {
  message: string | null;
  setMessage: (msg: string) => void;
  clearMessage: () => void;
}

export const useToastStore = create<ToastStore>((set) => ({
  message: null,
  setMessage: (msg) => set({ message: msg }),
  clearMessage: () => set({ message: null }),
}));
