'use client';

import { useEffect, useState } from 'react';

import OrbitWithSatellite from '@/features/main/components/OrbitWithSatellite';
import PlanetProgressBar from '@/features/main/components/PlanetProgressBar';
import { TutorialOverlay } from '@/shared/components/TutorialOverlay';

import type { TutorialStep } from '../shared/types/tutorial';
export default function HomePage() {
  const [step, setStep] = useState<TutorialStep>(0);
  const [showTutorial, setShowTutorial] = useState(false);

  useEffect(() => {
    const seen = localStorage.getItem('tutorial_main');
    if (!seen) setShowTutorial(true);
  }, []);

  const handleNext = () => {
    if (step < 1) {
      setStep((prev: TutorialStep) => prev + 1);
    } else {
      handleClose();
    }
  };
  const handleClose = () => {
    localStorage.setItem('tutorial_main', 'true');
    setShowTutorial(false);
  };

  return (
    <div className="w-full h-full flex flex-col relative">
      {/* 중앙 외계인 궤도 */}
      <div
        className={`flex-1 flex items-center justify-center ${
          showTutorial && step === 0 ? 'z-50 relative' : 'z-0'
        }`}
      >
        <OrbitWithSatellite />
      </div>

      {/* 하단 행성 진행도 */}
      <div
        className={`fixed bottom-32 left-1/2 -translate-x-1/2 ${
          showTutorial && step === 1 ? 'z-50' : 'z-30'
        }`}
      >
        <PlanetProgressBar />
      </div>
      {showTutorial && (
        <TutorialOverlay
          step={step}
          descriptions={[
            '외계인과 함께 전파 거래를 시작해볼까요?',
            '내가 보낸 데이터가\n누굴 거쳐 어디까지 갔는지 보여줘요!',
          ]}
          onNext={handleNext}
          onClose={handleClose}
          tutorialKey="main"
        />
      )}
    </div>
  );
}
