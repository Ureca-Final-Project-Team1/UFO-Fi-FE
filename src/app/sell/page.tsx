'use client';

import React from 'react';

import { FixedScaleWrapper } from '@/features/sell/components/FixedScaleWrapper';
import { FolderBackground, Title } from '@/shared';

export default function SellPage() {
  return (
    <>
      <div className="w-full h-full flex flex-col min-h-0">
        {/* 제목 */}
        <div className="flex-shrink-0 flex items-center justify-center">
          <Title title="데이터 판매 등록" />
        </div>
        {/* 폴더와 외계인 컨테이너 - 제목을 뺀 나머지 영역 */}
        <div className="flex-1 min-h-0 w-full flex items-center justify-center overflow-hidden">
          <div className="relative w-full h-full flex items-center justify-center">
            <FixedScaleWrapper heightPercent={1}>
              <div className="relative flex flex-col items-center justify-center w-full h-full">
                <FolderBackground title="거래명세서" />
              </div>
            </FixedScaleWrapper>
          </div>
        </div>
      </div>
    </>
  );
}
