'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { IMAGE_PATHS } from '@/constants/images';
import { Button } from '@/shared/ui/Button';

export default function NotFound() {
  const router = useRouter();
  return (
    <div className="flex flex-col h-full w-full text-center">
      <div className="flex-1 flex flex-col items-center justify-center px-4">
        <Image
          src={IMAGE_PATHS.NOT_FOUND}
          alt="404 Not Found"
          width={228}
          height={193}
          className="mx-auto mb-6"
          priority
        />
        <div className="flex flex-col items-center gap-2 mb-8">
          <div className="flex items-center gap-2 text-lg font-bold text-yellow-400">
            <Image src={IMAGE_PATHS.WARNING} alt="경고" width={24} height={24} />
            <span className="text-cyan-400 heading-24-bold">잘못된 접근이에요.</span>
          </div>
          <div className="text-white text-base body-16-medium">없는 페이지입니다.</div>
        </div>
      </div>
      <div className="w-full px-4 mb-14">
        <Button size="full-width" variant="primary" onClick={() => router.replace('/')}>
          홈으로 돌아가기
        </Button>
      </div>
    </div>
  );
}
