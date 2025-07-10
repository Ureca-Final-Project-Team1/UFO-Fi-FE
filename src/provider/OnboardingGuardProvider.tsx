'use client';
import { useOnboardingGuard } from '@/hooks/useOnboardingGuard';

interface OnboardingGuardProviderProps {
  children: React.ReactNode;
}

export default function OnboardingGuardProvider({ children }: OnboardingGuardProviderProps) {
  useOnboardingGuard();
  return <>{children}</>;
}
