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
import { Icon, Input, Button, PriceInput, FolderBackground, Title } from '@/shared';
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
    <div className="relative w-full h-full flex flex-col overflow-hidden">
      <Title title="데이터 판매 등록" />

      <div className="w-full flex-1">
        <FolderBackground
          title="거래명세서"
          gradientFrom="#93C5FD"
          gradientTo="#A855F7"
          className="overflow-hidden"
        >
          <div className="relative w-full h-full flex flex-col">
            {/* 메인 컨텐츠 영역 */}
            <div className="flex-1 space-y-2 sm:space-y-3 md:space-y-4 lg:space-y-5 xl:space-y-6 py-1 sm:py-2 md:py-3 lg:py-4">
              {/* 통신사 + 제목 입력 */}
              <div className="rounded-lg p-1.5 sm:p-2 md:p-2.5 lg:p-3 space-y-0.5 sm:space-y-1 md:space-y-1.5 lg:space-y-2">
                <div className="flex items-center space-x-1.5 sm:space-x-2 w-full">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 px-0.5 bg-white/50 rounded-lg shadow-[0px_2px_4px_0px_rgba(0,0,0,0.25)] inline-flex justify-center items-center gap-1 flex-shrink-0">
                    <Icon
                      src={
                        ICON_PATHS[userPlan?.carrier as keyof typeof ICON_PATHS] ||
                        ICON_PATHS['LGU']
                      }
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
              <div className="flex sm:flex-row justify-center items-center gap-2 sm:gap-3 md:gap-4 lg:gap-5 xl:gap-6 px-2 sm:px-4 md:px-6 lg:px-8 py-2 sm:py-3 md:py-4">
                <div className="text-center text-cyan-400 text-xs sm:text-sm md:text-base lg:text-lg font-semibold leading-relaxed whitespace-nowrap">
                  1GB 당
                </div>

                <div className="w-24 sm:w-28 md:w-30 lg:w-32 xl:w-28 h-8 sm:h-9 md:h-10 lg:h-12 xl:h-10 flex justify-center items-center px-0.5 sm:px-1 md:px-1.5 lg:px-2">
                  <PriceInput
                    value={String(pricePerGB)}
                    onChange={(e) => handlePriceChange(e)}
                    placeholder="금액"
                    variant="blueFill"
                  />
                </div>

                <div className="text-center text-cyan-400 text-xs sm:text-sm md:text-base lg:text-lg font-semibold leading-relaxed whitespace-nowrap">
                  ZET
                </div>
              </div>

              {/* 총 판매 금액 표시 */}
              <div className="flex justify-end sm:justify-center">
                <SellTotalPrice
                  sellCapacity={sellCapacity}
                  totalPrice={totalPrice}
                  isValidPrice={isValidPrice}
                />
              </div>

              {/* 등록 버튼 */}
              <div className="pt-1 sm:pt-2 md:pt-2.5 lg:pt-3 xl:pt-4">
                <Button
                  size={isMobile ? 'default' : 'lg'}
                  onClick={handleSubmit}
                  variant="exploration-button"
                  disabled={!isFormValid || isSubmitting}
                  className="w-full px-6 py-3 relative z-10"
                >
                  {isSubmitting ? '등록 중...' : '등록하기'}
                </Button>
              </div>
            </div>
          </div>
        </FolderBackground>
      </div>

      {/* 외계인 캐릭터 - FolderBackground 밖에 배치 */}
      <div className="absolute bottom-0 -left-12">
        <Image
          src={IMAGE_PATHS.AL_SELL}
          alt="판매 우주인"
          width={200}
          height={200}
          className="w-50 h-auto sm:w-52 sm:h-auto md:w-56 md:h-auto lg:w-64 lg:h-auto xl:w-72 xl:h-auto"
          priority
        />
      </div>
    </div>
  );
}
