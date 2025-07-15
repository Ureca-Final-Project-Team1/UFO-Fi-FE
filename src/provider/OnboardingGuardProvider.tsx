'use client';
import { useOnboardingGuard } from '@/features/onboarding/hooks/useOnboardingGuard';

interface OnboardingGuardProviderProps {
  children: React.ReactNode;
}

export function OnboardingGuardProvider({ children }: OnboardingGuardProviderProps) {
  useOnboardingGuard();
  return <>{children}</>;
}
