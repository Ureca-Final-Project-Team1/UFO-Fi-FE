'use client';

import Image from 'next/image';

import { IMAGE_PATHS } from '@/constants/images';
import { Title } from '@/shared/ui';

export default function BlackholePage() {
  return (
    <div className="flex flex-col items-center min-h-full relative w-full">
      <Title title="홈" iconVariant="back" className="mb-0" />
      <div className="flex-1 flex flex-col items-center justify-center w-full">
        <p className="body-16-bold text-white-600 text-center mb-2">
          당신은 안드로메다로 들어갔습니다...<span className="ml-1">😢</span>
        </p>
        <Image src={IMAGE_PATHS['BLACKHOLE_REAL']} alt="Blackhole" width="390" height="390" />
      </div>
    </div>
  );
}
