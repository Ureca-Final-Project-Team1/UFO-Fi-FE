'use client';

import Image from 'next/image';
import React from 'react';

import { ICON_PATHS } from '@/constants/icons';
import { IMAGE_PATHS } from '@/constants/images';
import { BulkCapacitySlider } from '@/features/bulk/components/BulkCapacitySlider';
import { useBulkPurchase } from '@/features/bulk/hooks/useBulkPurchase';
import { Icon, Title, Button, PriceInput } from '@/shared';
import { useViewportStore } from '@/stores/useViewportStore';

export default function BulkPurchasePage() {
  const {
    capacityValue,
    setCapacityValue,
    pricePerGB,
    handlePriceChange,
    handleSubmit,
    isValidCapacity,
    isValidPrice,
    isSubmitting,
  } = useBulkPurchase();

  const isMobile = useViewportStore((state) => state.isMobile);
  const isFormValid = isValidCapacity && isValidPrice;

  const setNewCapacityValue = (value: React.SetStateAction<number[]>) => {
    setCapacityValue(value);
  };

  return (
    <div className="flex flex-col min-h-full w-full justify-center">
      <Title title="일괄구매" iconVariant="back" />
      <div className="relative rounded-[20px] space-y-6 pb-12">
        {/* 거래 제안서 헤더 */}
        <div className="flex items-center space-x-3">
          <Icon name="FilePenLine" color="white" />
          <h2 className="text-white font-bold text-lg">거래 제안서</h2>
        </div>

        {/* 외계 데이터 중개소 설명 */}
        <div className="space-y-3 flex flex-col justify-center items-center">
          <Icon src={ICON_PATHS.UFO_LOGO} alt="UFO Logo" size="xl" />
          <h3 className="text-center text-white font-bold text-xl">외계 데이터 중개소</h3>
          <div className="text-center">
            <p className="text-white text-base">제가 최저가 조합을 찾아드릴게요!</p>
            <p className="text-sm text-amber-300 mt-1">
              (지불 가능한 금액 내에서 조합이 생성됩니다!)
            </p>
          </div>
        </div>

        {/* 구매 데이터 용량 섹션 */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Icon name="Sticker" size={20} />
            <h3 className="text-white font-bold text-lg">구매 데이터 용량</h3>
          </div>

          {/* 용량 표시 및 슬라이더 */}
          <div className="text-center">
            <BulkCapacitySlider
              value={capacityValue}
              setValue={setNewCapacityValue}
              maxCapacity={100}
            />
          </div>
        </div>

        {/* GB당 최대 예산 섹션 */}
        <div className="space-y-4 relative">
          <h3 className="text-white font-bold text-lg">GB당 최대 예산</h3>

          {/* 가격 입력 부분 */}
          <div className="flex items-center gap-2">
            <Icon src={ICON_PATHS['COIN']} className="w-4 h-4" />
            <span className="text-cyan-400 caption-14-bold">1GB 당</span>
            <div className="w-28 h-10 flex justify-center items-center px-2">
              <PriceInput
                value={pricePerGB}
                onChange={handlePriceChange}
                placeholder="금액"
                variant="blueFill"
              />
            </div>

            <div className="text-yellow-400 caption-14-bold">ZET</div>
          </div>

          {/* 외계인 캐릭터 */}
          <div className="absolute bottom-[-90px] right-0">
            <Image
              src={IMAGE_PATHS.AL_BULK_PURCHASE}
              alt="일괄구매 외계인"
              width={isMobile ? 140 : 220}
              height={isMobile ? 140 : 220}
              priority
            />
          </div>
        </div>

        {/* 하단 버튼 */}
        <div className="w-full pt-8 flex justify-start">
          <Button
            size={isMobile ? 'default' : 'lg'}
            onClick={handleSubmit}
            variant="exploration-button"
            disabled={!isFormValid || isSubmitting}
            className="px-8 py-3 min-w-[200px]"
          >
            {isSubmitting ? '계산 중...' : '최적 조합 보기'}
          </Button>
        </div>
      </div>
    </div>
  );
}
