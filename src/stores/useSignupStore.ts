import { create } from 'zustand';

type SignupData = {
  name: string;
  phone: string;
  telecom: string;
  plan: string;
};

type Store = SignupData & {
  setForm: (data: Partial<SignupData>) => void;
  reset: () => void;
};

export const useSignupStore = create<Store>((set) => ({
  name: '',
  phone: '',
  telecom: '',
  plan: '',
  setForm: (data) => set((prev) => ({ ...prev, ...data })),
  reset: () => set({ name: '', phone: '', telecom: '', plan: '' }),
}));
