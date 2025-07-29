'use client';

import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

import { IMAGE_PATHS } from '@/constants/images';
import { TitleWithRouter } from '@/features/common/components/TitleWithRouter';

function BlackholePageInner() {
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode') || 'self';

  return (
    <div className="flex flex-col min-h-screen w-full overflow-hidden">
      <TitleWithRouter title="홈" iconVariant="back" className="mb-0" />
      <div className="flex flex-col items-center justify-center flex-1 w-full px-4">
        <div className="flex flex-col items-center">
          <p className="text-lg font-bold text-white text-center mb-8">
            {mode === 'self'
              ? '당신은 안드로메다로 들어갔습니다...'
              : '이 사용자는 안드로메다로 들어갔습니다...'}
            <span className="ml-1">😢</span>
          </p>
          <div className="w-[390px] h-[390px] flex items-center justify-center">
            <Image
              src={IMAGE_PATHS['BLACKHOLE_REAL']}
              alt="Blackhole"
              width={390}
              height={390}
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>
      <style jsx global>{`
        body {
          overflow: hidden;
          overscroll-behavior: none;
        }
        html {
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}

export default function BlackholePage() {
  return (
    <Suspense>
      <BlackholePageInner />
    </Suspense>
  );
}
