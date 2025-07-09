'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { Title } from '@/components/ui/Title';

export default function BlackholePage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center min-h-full relative w-full">
      {/* 상단 타이틀 */}
      <Title title="홈" iconVariant="back" onClick={() => router.back()} className="mb-0" />
      {/* 중앙 영역: flex-1로 세로 중앙 정렬 */}
      <div className="flex-1 flex flex-col items-center justify-center w-full">
        <p className="body-16-bold text-white-600 text-center mb-2">
          당신은 안드로메다로 들어갔습니다...<span className="ml-1">😢</span>
        </p>
        <Image src="/images/blackhole-real.png" alt="Blackhole" width={390} height={390} />
      </div>
    </div>
  );
}
