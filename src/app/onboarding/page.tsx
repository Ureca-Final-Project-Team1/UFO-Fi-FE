'use client';

import { useRouter } from 'next/navigation';
import React, { useState, useEffect, useCallback } from 'react';

import { ROUTE_CONFIG } from '@/constants/routes';
import { AlienWithSpeech } from '@/features/onboarding/components';
import { NextButton } from '@/features/onboarding/components';
import { OnboardingImageFrame } from '@/features/onboarding/components';
import { StepIndicator } from '@/features/onboarding/components';
import { ONBOARDING_STEPS, onboardingUtils } from '@/features/onboarding/utils/onboarding';

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  const step = ONBOARDING_STEPS[currentStep];

  // 이미 온보딩이 완료된 경우 홈으로 리다이렉트
  useEffect(() => {
    if (onboardingUtils.isCompleted()) {
      router.push(ROUTE_CONFIG.DEFAULT_REDIRECT);
    }
  }, [router]);

  useEffect(() => {
    setIsVisible(false);
    const timer = setTimeout(() => setIsVisible(true), 150);
    return () => clearTimeout(timer);
  }, [currentStep]);

  // 다음 버튼 클릭 핸들러
  const handleNext = useCallback(() => {
    if (currentStep < ONBOARDING_STEPS.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      // 온보딩 완료 처리
      localStorage.setItem('ufo_fi_onboarding_completed', 'true');
      router.push(ROUTE_CONFIG.DEFAULT_REDIRECT);
    }
  }, [currentStep, router]);

  // 스텝 인디케이터 클릭 핸들러
  const handleStepClick = (step: number) => {
    if (step <= currentStep) {
      setCurrentStep(step);
    }
  };

  return (
    <div className="min-h-full flex flex-col justify-center items-center px-4 py-6">
      <div className="w-full max-w-[560px]">
        <div
          className={`transition-all duration-500 ease-in-out flex flex-col items-center ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <OnboardingImageFrame src={step.image} />
          <AlienWithSpeech message={step.alienMessage} />
          <StepIndicator
            step={currentStep}
            total={ONBOARDING_STEPS.length}
            onClick={handleStepClick}
          />
          <NextButton isLast={step.isLastStep} onClick={handleNext} />
        </div>
      </div>
    </div>
  );
}
