'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect, useCallback } from 'react';

import { IMAGE_PATHS } from '@/constants';
import { ROUTE_CONFIG } from '@/constants/routes';
import {
  AlienWithSpeech,
  NextButton,
  OnboardingImageFrame,
  StepIndicator,
} from '@/features/onboarding/components';
import { ONBOARDING_STEPS } from '@/features/onboarding/utils/onboarding';

// 애니메이션 지연 시간
const ANIMATION_DELAY_MS = 150;

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isStepVisible, setIsStepVisible] = useState(false);
  const router = useRouter();

  const step = ONBOARDING_STEPS[currentStep];

  // step 변경 시 애니메이션 트리거
  useEffect(() => {
    setIsStepVisible(false);
    const timer = setTimeout(() => setIsStepVisible(true), ANIMATION_DELAY_MS);
    return () => clearTimeout(timer);
  }, [currentStep]);

  // 다음 버튼 핸들러
  const handleNext = useCallback(() => {
    const isLastStep = currentStep === ONBOARDING_STEPS.length - 1;

    if (isLastStep) {
      router.push(ROUTE_CONFIG.DEFAULT_REDIRECT);
      return;
    }

    setCurrentStep(currentStep + 1);
  }, [currentStep, router]);

  // 하단 인디케이터 클릭 핸들러
  const handleStepClick = (step: number) => {
    if (step <= currentStep) {
      setCurrentStep(step);
    }
  };

  return (
    <div className="relative w-full min-h-screen">
      {/* 애니메이션 컨텐츠 */}
      <div
        className={`transition-all duration-500 ease-in-out w-full min-h-screen flex flex-col justify-center ${
          isStepVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        {/* 이미지 영역 */}
        <div className="absolute inset-0 flex flex-col justify-start items-center pt-8 space-y-2 max-h-[60vh]">
          <div className="relative mx-auto w-full z-10 flex-shrink-0">
            <OnboardingImageFrame onboardingSrc={step.image} />
          </div>

          <div className="relative w-full flex-shrink-0">
            <Image
              src={IMAGE_PATHS.WINDOW_BOTTOM}
              alt="창문 하단"
              width={0}
              height={0}
              sizes="100%"
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>

      {/* AlienWithSpeech와 하단 버튼 영역 */}
      <div className="absolute left-0 right-0 bottom-16 flex flex-col items-center space-y-6 z-[40] pb-16 max-h-[40vh]">
        <AlienWithSpeech message={step.alienMessage} />
        <div className="flex flex-col items-center space-y-4 mb-5">
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
