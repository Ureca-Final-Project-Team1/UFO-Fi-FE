'use client';

import Image from 'next/image';

import { IMAGE_PATHS } from '@/constants/images';
import { SpeechBubble } from '@/features/main/components';
import { Button } from '@/shared/ui/Button';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-full">
      <div className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="relative flex flex-col items-center">
          <SpeechBubble>지구인님, 오늘 거래하실 건가요?</SpeechBubble>
          <div
            className="absolute left-1/2 top-full -translate-x-1/2 mt-[-2px] z-10"
            style={{ pointerEvents: 'none' }}
          >
            <div className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[16px] border-t-white" />
          </div>
          <style jsx>{`
            .relative :global(.absolute.left-full) {
              display: none !important;
            }
          `}</style>
        </div>
        <Image
          src={IMAGE_PATHS.MAIN}
          alt="404 Not Found"
          width={320}
          height={360}
          className="mx-auto mb-1"
          priority
        />
        <div className="mt-2 w-full max-w-[320px] flex flex-row gap-4 justify-center">
          <Button
            variant="next-button"
            size="default"
            className="w-full rounded-xl shadow-md px-6 py-3 flex flex-col items-center"
          >
            <span className="text-xs mb-1">탐색 시작</span>
          </Button>
          <Button
            variant="project-button"
            size="default"
            className="w-full rounded-xl shadow-md px-6 py-3 flex flex-col items-center"
          >
            <span className="text-xs mb-1">탐색 조건</span>
          </Button>
        </div>

        <div className="mt-2 w-full max-w-[320px] flex justify-center">
          <div
            className="rounded-xl shadow-md px-6 py-3 flex flex-row items-end justify-between w-full"
            style={{ backgroundColor: 'var(--color-primary-100)' }}
          >
            <div className="flex flex-col items-center flex-1">
              <span className="text-xs text-gray-500 mb-1">오늘 LTE 평균값</span>
              <span className="text-2xl font-extrabold text-black leading-tight">1,200원</span>
            </div>
            <div className="w-px h-8 bg-gray-200 mx-2" />
            <div className="flex flex-col items-center flex-1">
              <span className="text-xs text-gray-500 mb-1">오늘 5G 평균값</span>
              <span className="text-2xl font-extrabold text-black leading-tight">1,200원</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
