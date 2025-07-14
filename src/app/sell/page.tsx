'use client';

import Image from 'next/image';
import React from 'react';

import { ICON_PATHS } from '@/constants/icons';
import { IMAGE_PATHS } from '@/constants/images';
import { useSellData } from '@/features/hooks/useSellData';
import { SellCapacitySlider } from '@/features/sell/components/SellCapacitySlider';
import { SellTotalPrice } from '@/features/sell/components/SellTotalPrice';
import { Icon, Input, Title, Button, PriceInput } from '@/shared';

export default function SellPage() {
  const {
    value,
    setValue,
    titleInput,
    setTitleInput,
    pricePerGB,
    maxCapacity,
    averagePrice,
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

  return (
    <div className="flex flex-col min-h-full w-full justify-center">
      <Title title="데이터 판매 등록" />
      <div className="relative rounded-[20px] space-y-6 pb-16">
        {/* 거래명세서 타이틀 */}
        <div className="flex items-center space-x-3">
          <Icon name="FilePenLine" color="white" />
          <h2 className="text-white font-bold text-lg">거래명세서</h2>
        </div>

        {/* 통신사 + 제목 입력 */}
        <div className="rounded-lg p-3 space-y-2">
          <div className="flex items-center space-x-2 w-full">
            <Icon src={ICON_PATHS['LGU']} />
            <div className="flex-1">
              <Input
                value={titleInput}
                onChange={(e) => setTitleInput(e.target.value)}
                placeholder="글 제목을 입력해주세요."
                variant="whiteBorder"
                maxLength={15}
                error={!isValidTitle && titleInput ? '제목은 1~15자 이내여야 합니다.' : undefined}
              />
            </div>
          </div>
          {titleInput && (
            <div
              className={`text-xs text-right ${
                titleInput.length === 15 ? 'text-red-400' : 'text-white/60'
              }`}
            >
              {titleInput.length}/15
            </div>
          )}
        </div>

        {/* 판매 용량 설정 슬라이더 */}
        <SellCapacitySlider value={value} setValue={setValue} maxCapacity={maxCapacity} />

        {/* 평균 가격 안내 */}
        <div className="flex items-center justify-between">
          <h3 className="text-white font-bold text-lg">희망 판매가격</h3>
          <div className="text-sm text-white/80">
            이번 주 평균 거래가격:
            <span className="text-cyan-400 font-bold ml-1">
              {averagePrice.toLocaleString()} ZET
            </span>
          </div>
        </div>

        {/* 1GB당 가격 입력 */}
        <div className="rounded-xl px-4 py-3 bg-white/10">
          <div className="flex items-center justify-between">
            <span className="text-white">1GB 당</span>
            <div className="flex items-center space-x-2">
              <PriceInput
                value={pricePerGB}
                onChange={(e) => handlePriceChange(e)}
                placeholder="금액을 입력하세요"
                variant="blueFill"
                className="w-24 text-center"
                error={!isValidPrice ? '총 판매 가격은 1ZET 이상이어야 합니다.' : undefined}
              />
              <span className="text-white">ZET</span>
            </div>
          </div>
        </div>

        {/* 총 판매 금액 표시 */}
        <SellTotalPrice
          sellCapacity={sellCapacity}
          totalPrice={totalPrice}
          isValidPrice={isValidPrice}
        />

        {/* 등록 버튼 */}
        <div className="w-full mx-auto pt-2 flex justify-end relative">
          <Button
            size="lg"
            onClick={handleSubmit}
            variant="exploration-button"
            disabled={!isFormValid || isSubmitting}
            className="px-6 py-3"
          >
            {isSubmitting ? '등록 중...' : '등록하기'}
          </Button>
        </div>
        {/* 하단 캐릭터 */}
        <Image
          src={IMAGE_PATHS.AL_SELL}
          alt="판매 우주인"
          width={200}
          height={200}
          className="absolute bottom-12 left-0"
          priority
        />
      </div>
    </div>
  );
}
