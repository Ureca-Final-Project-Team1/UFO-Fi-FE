import { create } from 'zustand';

type UserInfoState = {
  phoneNumber: string;
  setPhoneNumber: (phoneNumber: string) => void;
  getPhoneNumber: () => string;
};

export const useUserInfoStore = create<UserInfoState>()((set, get) => ({
  phoneNumber: '',
  setPhoneNumber: (phoneNumber) => set({ phoneNumber }),
  getPhoneNumber: () => get().phoneNumber,
}));
