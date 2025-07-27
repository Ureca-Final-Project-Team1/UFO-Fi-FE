import { SpeechBubble } from '@/features/main/components';
import OrbitWithSatellite from '@/features/main/components/OrbitWithSatellite';
import PlanetProgressBar from '@/features/main/components/PlanetProgressBar';

export default function HomePage() {
  return (
    <div className="flex flex-row justify-center w-full min-h-full">
      <div className="relative w-full h-screen bg-[url(/bg.png)] bg-cover">
        {/* 말풍선 */}
        <SpeechBubble tailDirection="bottom">지구인님, 오늘 거래하실 건가요?</SpeechBubble>
        {/* 궤도 + 위성 (클라이언트 컴포넌트) */}
        <OrbitWithSatellite />

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
          <PlanetProgressBar />
        </div>
      </div>
    </div>
  );
}
