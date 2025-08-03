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

const ANIMATION_DELAY_MS = 150;

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isStepVisible, setIsStepVisible] = useState(false);
  const router = useRouter();

  const step = ONBOARDING_STEPS[currentStep];

  useEffect(() => {
    setIsStepVisible(false);
    const timer = setTimeout(() => setIsStepVisible(true), ANIMATION_DELAY_MS);
    return () => clearTimeout(timer);
  }, [currentStep]);

  const handleNext = useCallback(() => {
    setCurrentStep((prev) => {
      if (prev < ONBOARDING_STEPS.length - 1) {
        return prev + 1;
      } else {
        router.push(ROUTE_CONFIG.DEFAULT_REDIRECT);
        return prev;
      }
    });
  }, [router]);

  const handleStepClick = (step: number) => {
    if (step <= currentStep) {
      setCurrentStep(step);
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center overflow-hidden">
      <div className="relative w-full h-full">
        <div className="flex flex-col items-center justify-center w-full h-full">
          <div
            className={`transition-all duration-500 ease-in-out w-full h-full flex flex-col justify-center ${
              isStepVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            {/* 이미지 영역 */}
            <div className="absolute inset-0 flex flex-col justify-center items-center space-y-4">
              <div className="relative mx-auto mb-2 w-full z-10">
                <OnboardingImageFrame onboardingSrc={step.image} />
              </div>

              <div className="relative w-full">
                <Image
                  src={IMAGE_PATHS.WINDOW_BOTTOM}
                  alt="창문 하단"
                  width={0}
                  height={0}
                  sizes="100%"
                  className="w-full h-auto"
                />
                <div className="w-full h-full absolute inset-0 -top-1/5 flex items-center justify-center z-20">
                  <AlienWithSpeech message={step.alienMessage} />
                </div>
              </div>
            </div>

            {/* 하단 버튼 */}
            <div className="absolute bottom-8 left-0 right-0 flex flex-col items-center space-y-4 z-30">
              <StepIndicator
                step={currentStep}
                total={ONBOARDING_STEPS.length}
                onClick={handleStepClick}
              />
              <NextButton isLast={step.isLastStep} onClick={handleNext} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
