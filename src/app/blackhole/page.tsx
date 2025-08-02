'use client';

import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

import { IMAGE_PATHS } from '@/constants/images';
import { Title } from '@/shared';

function BlackholePageInner() {
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode') || 'self';

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <Title title="홈" iconVariant="back" />
      <div className="flex flex-col items-center justify-center flex-1 w-full text-center">
        <p className="text-lg font-bold text-white mb-8">
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
        <p className="text-sm font-bold text-gray-400 mb-2">신고 3회로 제재된 상태에요.</p>
      </div>
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
