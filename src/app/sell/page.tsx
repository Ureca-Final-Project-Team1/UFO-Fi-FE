'use client';

import React, { useEffect, useState } from 'react';

import { FixedScaleWrapper } from '@/features/sell/components/FixedScaleWrapper';
import { cn } from '@/lib/utils';
import { FolderBackground, Title } from '@/shared';
import { TutorialOverlay } from '@/shared/components/TutorialOverlay';

export default function SellPage() {
  const [step, setStep] = useState(0);
  const [showTutorial, setShowTutorial] = useState(false);

  useEffect(() => {
    const seen = localStorage.getItem('tutorial_sell');
    if (!seen) setShowTutorial(true);
  }, []);

  const handleNext = () => {
    if (step < 1) {
      setStep((prev) => prev + 1);
    } else {
      handleClose();
    }
  };

  const handleClose = () => {
    localStorage.setItem('tutorial_sell', 'true');
    setShowTutorial(false);
  };

  return (
    <>
      <div className="w-full h-full flex flex-col min-h-0">
        {/* 제목 */}
        <div className="flex-shrink-0 flex items-center justify-center">
          <Title title="데이터 판매 등록" />
        </div>
        {/* 폴더와 외계인 컨테이너 - 제목을 뺀 나머지 영역 */}
        <div
          className={cn(
            'flex-1 min-h-0 w-full flex items-center justify-center overflow-hidden',
            showTutorial && step === 0 && 'z-50',
          )}
        >
          <div className="relative w-full h-full flex items-center justify-center">
            <FixedScaleWrapper heightPercent={1}>
              <div className="relative flex flex-col items-center justify-center w-full h-full z-50">
                <FolderBackground title="거래명세서" />
              </div>
            </FixedScaleWrapper>
          </div>
        </div>
      </div>

      {showTutorial && (
        <TutorialOverlay
          step={step}
          descriptions={[
            '판매 등록 페이지입니다.\n상세 정보를 작성해 주세요.',
            '이제 데이터를 팔 준비가 완료되었습니다!',
          ]}
          onNext={handleNext}
          onClose={handleClose}
        />
      )}
    </>
  );
}
