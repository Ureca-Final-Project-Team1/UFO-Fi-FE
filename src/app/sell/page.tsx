// src/app/sell/page.tsx
'use client';

import Image from 'next/image';
import React from 'react';

import { ICON_PATHS } from '@/constants/icons';
import { IMAGE_PATHS } from '@/constants/images';
import { useSellData } from '@/features/hooks/useSellData';
import { SellCapacitySlider } from '@/features/sell/components/SellCapacitySlider';
import { SellTotalPrice } from '@/features/sell/components/SellTotalPrice';
import { getSellErrorMessages } from '@/features/sell/utils/sellValidation';
import { Icon, Input, Title, Button, PriceInput } from '@/shared';
import { useViewportStore } from '@/stores/useViewportStore';

export default function SellPage() {
  const {
    value,
    setValue,
    titleInput,
    setTitleInput,
    pricePerGB,
    maxCapacity,
    sellCapacity,
    totalPrice,
    handleSubmit,
    handlePriceChange,
    isValidTitle,
    isValidPrice,
    isValidCapacity,
    isSubmitting,
  } = useSellData();

  const isFormValid = isValidTitle && isValidPrice && isValidCapacity;
  const isMobile = useViewportStore((state) => state.isMobile);

  return (
    <div className="relative w-full h-full flex flex-col">
      <Title title="데이터 판매 등록" />

      <div className="flex-1 space-y-6 py-4">
        {/* 거래명세서 타이틀 */}
        <div className="flex items-center space-x-3">
          <Icon name="FilePenLine" color="white" />
          <h2 className="text-white font-bold text-lg">거래명세서</h2>
        </div>

        {/* 통신사 + 제목 입력 */}
        <div className="rounded-lg p-3 space-y-2">
          <div className="flex items-center space-x-2 w-full">
            <div className="w-9 h-9 px-0.5 bg-white/50 rounded-lg shadow-[0px_2px_4px_0px_rgba(0,0,0,0.25)] inline-flex justify-center items-center gap-1">
              <Icon src={ICON_PATHS['LGU']} />
            </div>

            <div className="flex-1">
              <Input
                value={titleInput}
                onChange={(e) => setTitleInput(e.target.value)}
                placeholder="글 제목을 입력해주세요."
                variant="blueFill"
                maxLength={10}
                error={getSellErrorMessages.title(titleInput, isValidTitle)}
              />
            </div>
          </div>
          <div
            className={`text-xs text-right ${
              titleInput.length === 10 ? 'text-red-400' : 'text-white/60'
            }`}
          >
            {titleInput.length}/10
          </div>
        </div>

        {/* 판매 용량 설정 슬라이더 */}
        <SellCapacitySlider
          value={value}
          setValue={setValue}
          maxCapacity={maxCapacity}
          errorMessage={getSellErrorMessages.price(isValidPrice, pricePerGB)}
        />

        {/* 1GB당 가격 입력 */}
        <div className="flex justify-center items-center gap-3.5">
          <div className="text-center text-cyan-400 text-lg font-semibold leading-relaxed">
            1GB 당
          </div>

          <div className="w-28 h-10 flex justify-center items-center px-2">
            <PriceInput
              value={String(pricePerGB)}
              onChange={(e) => handlePriceChange(e)}
              placeholder="금액"
              variant="blueFill"
            />
          </div>

          <div className="text-center text-cyan-400 text-lg font-semibold leading-relaxed">ZET</div>
        </div>

        {/* 총 판매 금액 표시 */}
        <SellTotalPrice
          sellCapacity={sellCapacity}
          totalPrice={totalPrice}
          isValidPrice={isValidPrice}
        />

        {/* 등록 버튼 */}
        <div className="w-full pt-2 flex justify-end">
          <Button
            size={isMobile ? 'default' : 'lg'}
            onClick={handleSubmit}
            variant="exploration-button"
            disabled={!isFormValid || isSubmitting}
            className="px-6 py-3"
          >
            {isSubmitting ? '등록 중...' : '등록하기'}
          </Button>
        </div>
      </div>

      {/* 하단 캐릭터 - 절대 위치로 배치 */}
      <div className="absolute bottom-0 left-0 pointer-events-none">
        <Image src={IMAGE_PATHS.AL_SELL} alt="판매 우주인" width={200} height={200} priority />
      </div>
    </div>
  );
}
