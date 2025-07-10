'use client';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect, useCallback } from 'react';

import { AlienWithSpeech } from '@/components/onboarding/AlienWithSpeech';
import { NextButton } from '@/components/onboarding/NextButton';
import { OnboardingImageFrame } from '@/components/onboarding/OnboardingImageFrame';
import { StepIndicator } from '@/components/onboarding/StepIndicator';
import { ONBOARDING_STEPS } from '@/lib/onboarding';

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

  const handleNext = useCallback(() => {
    if (currentStep < ONBOARDING_STEPS.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      localStorage.setItem('ufo_fi_onboarding_completed', 'true');
      router.push('/main');
    }
  }, [currentStep, router]);

  const handleStepClick = (step: number) => {
    if (step <= currentStep) setCurrentStep(step);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 py-6">
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
