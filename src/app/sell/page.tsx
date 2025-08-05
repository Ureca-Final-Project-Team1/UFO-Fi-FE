'use client';

import Image from 'next/image';
import React from 'react';

import { IMAGE_PATHS } from '@/constants/images';
import { FolderBackground, Title } from '@/shared';

export default function SellPage() {
  return (
    <>
      <div className="w-full h-full flex flex-col items-center justify-center bg-transparent">
        {/* 제목 */}
        <Title title="데이터 판매 등록" />

        {/* 폴더와 외계인 컨테이너 */}
        <div className="relative flex flex-col items-center justify-start mt-2 w-full h-full">
          <FolderBackground title="거래명세서" />
          {/* 외계인 */}
          <div className="absolute bottom-0 left-0 z-20">
            <Image
              src={IMAGE_PATHS.AL_SELL}
              alt="판매 우주인"
              width={200}
              height={200}
              className="w-48 h-auto"
              priority
            />
          </div>
        </div>
      </div>
    </>
  );
}
