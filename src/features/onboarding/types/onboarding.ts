export const ONBOARDING_CONSTANTS = {
  // 로컬 스토리지 키
  STORAGE_KEY: 'ufo_fi_onboarding_completed',
} as const;

// 온보딩 완료 체크 함수
export const isOnboardingCompleted = (): boolean => {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(ONBOARDING_CONSTANTS.STORAGE_KEY) === 'true';
};

// 온보딩 완료 마크 함수
export const markOnboardingComplete = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(ONBOARDING_CONSTANTS.STORAGE_KEY, 'true');
    document.cookie = 'ufo_fi_onboarding_completed=true; path=/; max-age=31536000';
  }
};

export type OnboardingStep = {
  id: number;
  title: string;
  alienMessage: string;
  description: string;
  bulletPoints: string[];
  buttonText: string;
  image: string;
  isLastStep: boolean;
};
