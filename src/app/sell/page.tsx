'use client';

import Image from 'next/image';
import React from 'react';

import { IMAGE_PATHS } from '@/constants/images';
import { SellFormContent } from '@/features/sell/components/SellFormContent';
import { FolderBackground, Title } from '@/shared';

export default function SellPage() {
  return (
    <>
      <div className="w-full h-full flex flex-col items-center justify-center">
        {/* 제목 */}
        <div className="relative w-full h-full flex flex-col overflow-hidden">
          <Title title="데이터 판매 등록" />

          {/* 폴더 컨테이너 */}
          <div className="relative w-[390px] h-[840px] overflow-hidden">
            <div className="absolute top-[88px] left-[16px] z-10">
              <FolderBackground title="거래명세서">
                <SellFormContent />
              </FolderBackground>
            </div>

            {/* 외계인 */}
            <div className="absolute bottom-0 -left-10 z-20">
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
      </div>
    </>
  );
}
