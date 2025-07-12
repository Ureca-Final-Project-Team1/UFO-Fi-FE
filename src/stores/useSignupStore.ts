import { create } from 'zustand';

type SignupData = {
  name: string;
  phone: string;
  carrier: string;
  planName: string;
};

type Store = SignupData & {
  setForm: (data: Partial<SignupData>) => void;
  reset: () => void;
};

export const useSignupStore = create<Store>((set) => ({
  name: '',
  phone: '',
  carrier: '',
  planName: '',
  setForm: (data) => set((prev) => ({ ...prev, ...data })),
  reset: () => set({ name: '', phone: '', carrier: '', planName: '' }),
}));
