'use client';

import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import React from 'react';

import { userPlanAPI } from '@/backend';
import { ICON_PATHS } from '@/constants/icons';
import { IMAGE_PATHS } from '@/constants/images';
import { useSellData } from '@/features/hooks/useSellData';
import { useMyInfo } from '@/features/mypage/hooks';
import { SellCapacitySlider } from '@/features/sell/components/SellCapacitySlider';
import { SellTotalPrice } from '@/features/sell/components/SellTotalPrice';
import { getSellErrorMessages } from '@/features/sell/utils/sellValidation';
import { Icon, Input, Title, Button, PriceInput } from '@/shared';
import { useViewportStore } from '@/stores/useViewportStore';

export default function SellPage() {
  const { data: myInfo } = useMyInfo();
  const {
    value,
    setValue,
    titleInput,
    setTitleInput,
    pricePerGB,
    sellCapacity,
    totalPrice,
    handleSubmit,
    handlePriceChange,
    isValidTitle,
    isValidPrice,
    isValidCapacity,
    isSubmitting,
  } = useSellData();

  const { data: userPlan } = useQuery({
    queryKey: ['userPlan'],
    queryFn: () => userPlanAPI.get(),
  });

  const maxCapacity = myInfo?.sellableDataAmount || 0;
  const isFormValid = isValidTitle && isValidPrice && isValidCapacity;
  const isMobile = useViewportStore((state) => state.isMobile);

  return (
    <div className="relative w-full min-h-full flex flex-col">
      <Title title="데이터 판매 등록" />

      {/* 메인 컨텐츠 영역 */}
      <div className="flex-1 space-y-6 py-4">
        {/* 거래명세서 타이틀 */}
        <div className="flex items-center space-x-3">
          <Icon name="FilePenLine" color="white" />
          <h2 className="text-white font-bold text-lg">거래명세서</h2>
        </div>

        {/* 통신사 + 제목 입력 */}
        <div className="rounded-lg p-3 space-y-2">
          <div className="flex items-center space-x-2 w-full">
            <div className="w-9 h-9 px-0.5 bg-white/50 rounded-lg shadow-[0px_2px_4px_0px_rgba(0,0,0,0.25)] inline-flex justify-center items-center gap-1 flex-shrink-0">
              <Icon
                src={ICON_PATHS[userPlan?.carrier as keyof typeof ICON_PATHS] || ICON_PATHS['LGU']}
              />
            </div>

            <div className="flex-1 min-w-0">
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
        <div className="flex sm:flex-row justify-center items-center gap-2 sm:gap-3.5 px-4">
          <div className="text-center text-cyan-400 text-base sm:text-lg font-semibold leading-relaxed whitespace-nowrap">
            1GB 당
          </div>

          <div className="w-32 sm:w-28 h-12 sm:h-10 flex justify-center items-center px-2">
            <PriceInput
              value={String(pricePerGB)}
              onChange={(e) => handlePriceChange(e)}
              placeholder="금액"
              variant="blueFill"
            />
          </div>

          <div className="text-center text-cyan-400 text-base sm:text-lg font-semibold leading-relaxed whitespace-nowrap">
            ZET
          </div>
        </div>

        {/* 총 판매 금액 표시 */}
        <SellTotalPrice
          sellCapacity={sellCapacity}
          totalPrice={totalPrice}
          isValidPrice={isValidPrice}
        />

        {/* 등록 버튼과 캐릭터 */}
        <div className="pt-4 relative">
          <Button
            size={isMobile ? 'default' : 'lg'}
            onClick={handleSubmit}
            variant="exploration-button"
            disabled={!isFormValid || isSubmitting}
            className="w-full px-6 py-3 relative z-10"
          >
            {isSubmitting ? '등록 중...' : '등록하기'}
          </Button>

          <div
            className="absolute pointer-events-none"
            style={{
              left: isMobile ? '0px' : '30px',
              bottom: isMobile ? '-20px' : '-15px',
            }}
          >
            <Image
              src={IMAGE_PATHS.AL_SELL}
              alt="판매 우주인"
              width={isMobile ? 160 : 220}
              height={isMobile ? 160 : 220}
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}
