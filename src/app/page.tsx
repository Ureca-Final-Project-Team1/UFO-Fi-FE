import { SpeechBubble } from '@/features/main/components';
import OrbitWithSatellite from '@/features/main/components/OrbitWithSatellite';

export default function HomePage() {
  return (
    <div className="flex flex-row justify-center w-full">
      <div className="relative w-full h-screen bg-[url(/bg.png)] bg-cover">
        {/* 궤도 + 위성 (클라이언트 컴포넌트) */}
        <OrbitWithSatellite />

        {/* 말풍선 */}
        <SpeechBubble tailDirection="bottom">지구인님, 오늘 거래하실 건가요?</SpeechBubble>
      </div>
    </div>
  );
}
