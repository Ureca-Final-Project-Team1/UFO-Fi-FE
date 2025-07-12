'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { IMAGE_PATHS } from '@/constants/images';
import { Button } from '@/shared/ui/Button';

export default function NotFoundPage() {
  const router = useRouter();
  return (
    <div className="flex flex-col h-screen items-center justify-center px-6 text-center z-10">
      <Image
        src={IMAGE_PATHS.NOT_FOUND}
        alt="404 Not Found"
        width={180}
        height={180}
        className="mx-auto mb-6"
        priority
      />
      <div className="flex flex-col items-center gap-2 mb-8">
        <div className="flex items-center gap-2 text-lg font-bold text-yellow-400">
          <span>⚠️</span>
          <span className="text-cyan-400">잘못된 접근이에요.</span>
        </div>
        <div className="text-white text-base">없는 페이지입니다.</div>
      </div>
      <Button size="full-width" className="mt-4" onClick={() => router.replace('/')}>
        홈으로 돌아가기
      </Button>
    </div>
  );
}
