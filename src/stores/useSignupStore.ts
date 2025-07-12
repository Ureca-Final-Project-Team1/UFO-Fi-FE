import { create } from 'zustand';

type SignupData = {
  name: string;
  phoneNumber: string;
  carrier: string;
  planName: string;
};

type Store = SignupData & {
  setForm: (data: Partial<SignupData>) => void;
  reset: () => void;
};

export const useSignupStore = create<Store>((set) => ({
  name: '',
  phoneNumber: '',
  carrier: '',
  planName: '',
  setForm: (data) => set((prev) => ({ ...prev, ...data })),
  reset: () => set({ name: '', phoneNumber: '', carrier: '', planName: '' }),
}));
