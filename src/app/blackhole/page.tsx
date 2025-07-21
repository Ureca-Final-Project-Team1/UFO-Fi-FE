'use client';

import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

import { IMAGE_PATHS } from '@/constants/images';
import { Title } from '@/shared/ui';

export default function BlackholePage() {
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode') || 'self';

  return (
    <div className="flex flex-col items-center min-h-full w-full">
      <Title title="홈" iconVariant="back" className="mb-0" />
      <div className="flex flex-col items-center w-full flex-1 justify-center">
        <p className="text-lg font-bold text-white text-center mb-2">
          {mode === 'self'
            ? '당신은 안드로메다로 들어갔습니다...'
            : '이 사용자는 안드로메다로 들어갔습니다...'}
          <span className="ml-1">😢</span>
        </p>
        <Image src={IMAGE_PATHS['BLACKHOLE_REAL']} alt="Blackhole" width={390} height={390} />
      </div>
    </div>
  );
}
