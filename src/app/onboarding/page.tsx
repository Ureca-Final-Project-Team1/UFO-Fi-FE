'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect, useCallback } from 'react';

import { IMAGE_PATHS } from '@/constants';
import { ROUTE_CONFIG } from '@/constants/routes';
import { AlienWithSpeech } from '@/features/onboarding/components';
import { NextButton } from '@/features/onboarding/components';
import { OnboardingImageFrame } from '@/features/onboarding/components';
import { StepIndicator } from '@/features/onboarding/components';
import { ONBOARDING_STEPS } from '@/features/onboarding/utils/onboarding';

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  const step = ONBOARDING_STEPS[currentStep];

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
    <>
      <div className="flex flex-col items-center justify-center min-h-screen w-full">
        <div
          className={`transition-all duration-500 ease-in-out w-full ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="relative mx-auto mb-6 w-full">
            <OnboardingImageFrame onboardingSrc={step.image} />
          </div>
          <div className="relative w-full mt-4 sm:mt-6 md:mt-8 lg:mt-10">
            <Image
              src={IMAGE_PATHS.WINDOW_BOTTOM}
              alt="창문 하단"
              width={0}
              height={0}
              sizes="100vw"
              className="w-full h-auto"
            />
          </div>

          <AlienWithSpeech message={step.alienMessage} />
          <StepIndicator
            step={currentStep}
            total={ONBOARDING_STEPS.length}
            onClick={handleStepClick}
          />
          <NextButton isLast={step.isLastStep} onClick={handleNext} />
        </div>
      </div>
    </>
  );
}
