import { create } from 'zustand';

import { Carrier } from '@/api/types/carrier';

type SignupData = {
  name: string;
  phoneNumber: string;
  carrier: Carrier | '';
  planName: string;
};

type Store = SignupData & {
  setForm: (data: Partial<SignupData>) => void;
  reset: () => void;
  isProfileComplete: () => boolean;
  isPlanComplete: () => boolean;
  isFormComplete: () => boolean;
};

export const useSignupStore = create<Store>((set, get) => ({
  // 초기값
  name: '',
  phoneNumber: '',
  carrier: '',
  planName: '',

  // 데이터 업데이트
  setForm: (data) => set((prev) => ({ ...prev, ...data })),

  // 전체 초기화
  reset: () =>
    set({
      name: '',
      phoneNumber: '',
      carrier: '',
      planName: '',
    }),

  // 프로필 완료 여부 확인
  isProfileComplete: () => {
    const state = get();
    return !!(state.name && state.phoneNumber);
  },

  // 요금제 선택 완료 여부 확인
  isPlanComplete: () => {
    const state = get();
    return !!(state.carrier && state.planName);
  },

  // 전체 폼 완료 여부 확인
  isFormComplete: () => {
    const state = get();
    return !!(state.name && state.phoneNumber && state.carrier && state.planName);
  },
}));
