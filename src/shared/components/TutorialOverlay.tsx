'use client';

import React from 'react';

import type { TutorialStep } from '../types/tutorial';

interface TutorialOverlayProps {
  step: TutorialStep;
  descriptions: string[];
  onNext: () => void;
  onClose: () => void;
}

export const TutorialOverlay = ({ step, descriptions, onNext, onClose }: TutorialOverlayProps) => {
  const isLastStep = step === descriptions.length - 1;

  return (
    <div className="absolute w-full bottom-[180px] left-1/2 -translate-x-1/2 text-center z-50 flex flex-col items-center space-y-4 pointer-events-none">
      {/* 말풍선 */}
      <p className="pointer-events-auto text-white font-bold px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 max-w-[300px] text-center whitespace-pre-wrap break-keep">
        {descriptions[step]}
      </p>

      {/* 버튼 */}
      <button
        onClick={isLastStep ? onClose : onNext}
        className="pointer-events-auto bg-white text-black rounded-full px-6 py-2 shadow-md"
      >
        {isLastStep ? '시작하기' : '다음'}
      </button>
    </div>
  );
};
