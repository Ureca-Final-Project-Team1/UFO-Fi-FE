'use client';

import React from 'react';

import { ICON_PATHS } from '@/constants/icons';
import { useSellData } from '@/features/hooks/useSellData';
import { Icon, Input, Title } from '@/shared';
import { DataSlider } from '@/shared';
import { Button } from '@/shared';

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

  // 전체 폼 유효성 검증
  const isFormValid = isValidTitle && isValidPrice && isValidCapacity;

  return (
    <div className="flex flex-col min-h-full w-full flex justify-center">
      <Title title="데이터 판매 등록" />

      {/* 거래명세서 섹션 */}
      <div className="rounded-[20px] space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Icon name="FilePenLine" color="white" />
            <h2 className="text-white font-bold text-lg">거래명세서</h2>
          </div>
        </div>

        {/* 통신사 정보 및 제목 입력 */}
        <div className="rounded-lg p-3 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 w-full">
              <Icon src={ICON_PATHS['LGUPLUS_LOGO']} />
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="글 제목을 입력해주세요."
                  value={titleInput}
                  onChange={(e) => setTitleInput(e.target.value)}
                  className={`bg-transparent text-white placeholder-white/70 outline-none w-full ${
                    !isValidTitle && titleInput ? 'border-b border-red-400' : ''
                  }`}
                  maxLength={15} // 15자 제한
                />
                {!isValidTitle && titleInput && (
                  <p className="text-red-400 text-xs mt-1">제목은 1~15자 이내여야 합니다.</p>
                )}
              </div>
            </div>
          </div>
          {titleInput && (
            <div
              className={`text-xs text-right ${titleInput.length === 15 ? 'text-red-400' : 'text-white/60'}`}
            >
              {titleInput.length}/15
            </div>
          )}
        </div>

        {/* 판매 용량 설정 */}
        <div className="space-y-4 items-center">
          <h3 className="text-white font-bold text-lg">판매 용량 설정</h3>
          <DataSlider
            value={value}
            onValueChange={setValue}
            showTicks
            showLabels
            minLabel="0GB"
            maxLabel="10GB"
            max={maxCapacity}
          />
        </div>

        <div className="text-white/80 text-sm pt-4">남은 최대 판매 가능 용량 : {maxCapacity}GB</div>

        {/* 희망 판매 가격 */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-white font-bold text-lg">희망 판매 가격</h3>
          </div>

          <div className="text-white/80 text-sm">
            이번 주 평균 거래가격
            <span className="text-cyan-400 font-bold"> {averagePrice.toLocaleString()}ZET</span>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <div className="flex items-center justify-between">
              <span className="text-white">1GB 당</span>
              <div className="flex items-center space-x-2">
                <Input
                  type="number"
                  value={pricePerGB}
                  onChange={(e) => handlePriceChange(e)}
                  placeholder="금액을 입력하세요"
                  variant="blueFill"
                  className="w-full text-center"
                  min={1}
                  step={1}
                  error={!isValidPrice ? '총 판매 가격은 1ZET 이상이어야 합니다.' : undefined}
                />
                <span className="text-white">ZET</span>
              </div>
            </div>
          </div>
        </div>

        {/* 총 판매 금액 */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-white font-bold text-lg">총 판매 금액</h3>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <div className="text-center space-y-2">
              <div className="text-white text-2xl font-bold">{sellCapacity}GB</div>
              <div
                className={`text-3xl font-bold ${isValidPrice ? 'text-yellow-400' : 'text-red-400'}`}
              >
                {totalPrice.toLocaleString()}ZET
              </div>
            </div>
          </div>
        </div>

        {/* 등록하기 버튼 */}
        <div className="pt-4">
          <Button
            size="full-width"
            onClick={handleSubmit}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-4 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!isFormValid || isSubmitting}
          >
            {isSubmitting ? '등록 중...' : '등록하기'}
          </Button>
        </div>
      </div>
    </div>
  );
}
