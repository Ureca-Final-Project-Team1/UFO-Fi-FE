'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

import { LetterTabContent } from '@/features/signal/components/LetterTabContent';
import SignalTabContent from '@/features/signal/components/SignalTabContent';
import { Tabs, TabsList, TabsTrigger, TabsContent, TitleWithoutRouter } from '@/shared';
import { TutorialOverlay } from '@/shared/components/TutorialOverlay';

type TabType = 'orbit' | 'letters';

export default function SignalPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const initialTab = (searchParams.get('tab') as TabType) || 'orbit';
  const [activeTab, setActiveTab] = useState<TabType>(initialTab);
  const [showTutorial, setShowTutorial] = useState(false);
  const [step, setStep] = useState(0);
  const [isOrbitLoaded, setIsOrbitLoaded] = useState(false);

  useEffect(() => {
    const seen = localStorage.getItem('tutorial_signal');
    if (!seen && isOrbitLoaded) {
      setShowTutorial(true);
    }
  }, [isOrbitLoaded]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set('tab', activeTab);
    router.replace(`${pathname}?${params.toString()}`);
  }, [activeTab, pathname, router, searchParams]);

  const handleNext = () => {
    if (step === 0) {
      setStep(1);
      setActiveTab('letters');
    } else if (step === 1) {
      setStep(2);
    } else {
      handleClose();
    }
  };

  const handleClose = () => {
    localStorage.setItem('tutorial_signal', 'true');
    setShowTutorial(false);
  };

  const isTutorialReady = showTutorial && isOrbitLoaded;

  return (
    <main className="flex flex-col">
      <header>
        <TitleWithoutRouter title="전파 거리" />
      </header>

      <section aria-labelledby="signal-tabs">
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as TabType)}>
          <TabsList
            id="signal-tabs"
            className="p-1 mb-6 mx-4 w-auto"
            aria-label="전파 궤도와 편지함을 선택하는 탭"
          >
            <TabsTrigger value="orbit" variant="darkTab" size="full">
              전파 궤도
            </TabsTrigger>
            <TabsTrigger value="letters" variant="darkTab" size="full">
              편지함
            </TabsTrigger>
          </TabsList>

          <div className="flex-1">
            <TabsContent value="orbit">
              <SignalTabContent
                key={isTutorialReady ? `tutorial-${step}` : 'real'}
                tutorialStep={isTutorialReady ? step : -1}
                onLoaded={() => setIsOrbitLoaded(true)}
              />
            </TabsContent>
            <TabsContent value="letters">
              <LetterTabContent
                key={showTutorial && step >= 1 ? `tutorial-${step}` : 'real'}
                tutorialStep={showTutorial && step >= 1 ? step : -1}
              />
            </TabsContent>
          </div>
        </Tabs>
      </section>

      {showTutorial && (
        <TutorialOverlay
          step={step}
          descriptions={[
            '내 전파가 닿은 행성들을 연결한 궤도를 볼 수 있어요!',
            '현재 활성화된 행성의 개수만큼,',
            '각 행성에서 도착한 편지를 확인할 수 있어요!',
          ]}
          onNext={handleNext}
          onClose={handleClose}
          tutorialKey="signal"
        />
      )}
    </main>
  );
}
