'use client';

// import Image from 'next/image';
import React, { useState } from 'react';
import { toast } from 'sonner';

import { Icon, Title } from '@/components';
import { DataSlider } from '@/components';
import { Button } from '@/components/ui/Button';
import { ICON_PATHS } from '@/constants/icons';

export default function SellPage() {
  const [value, setValue] = useState([5]);
  const [titleInput, setTitleInput] = useState('');
  const [pricePerGB, setPricePerGB] = useState(1100); // GB당 가격
  const [isSubmitting, setIsSubmitting] = useState(false); // 로딩 상태

  const maxCapacity = 10; // 총 보유 용량
  const averagePrice = 1200; // 평균 거래가격
  const sellCapacity = Array.isArray(value) ? value[0] : value; // 선택된 용량
  const totalPrice = sellCapacity * pricePerGB; // 총 판매가격

  const handleSubmit = async () => {
    if (!titleInput.trim()) {
      toast.error('제목을 입력해주세요.');
      return;
    }

    if (sellCapacity <= 0) {
      toast.error('판매 용량을 선택해주세요.');
      return;
    }

    setIsSubmitting(true);

    // 목 처리: API 없이 성공 메시지만
    setTimeout(() => {
      toast.success('판매 등록이 완료되었습니다!');
      setTitleInput('');
      setValue([5]);
      setPricePerGB(1100);
      setIsSubmitting(false);
    }, 800);
  };

  const handlePriceChange = (e: { target: { value: unknown } }) => {
    const newPrice = Number(e.target.value);
    if (newPrice >= 0) {
      setPricePerGB(newPrice);
    }
  };

  return (
    <div className="flex flex-col min-h-full w-full flex justify-center">
      {/* 헤더 */}
      <Title title="데이터 판매 등록" />

      {/* 거래명세서 섹션 */}
      <div className="rounded-[20px] space-y-6">
        {/* 거래명세서 헤더 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Icon name="FilePenLine" color="white" />
            <h2 className="text-white font-bold text-lg">거래명세서</h2>
          </div>
        </div>

        {/* 통신사 정보 및 제목 입력 */}
        <div className="bg-blue-500/40 backdrop-blur-sm rounded-lg p-3 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon src={ICON_PATHS['LGUPLUS_LOGO']} />
              <input
                type="text"
                placeholder="글 제목을 입력해주세요."
                value={titleInput}
                onChange={(e) => setTitleInput(e.target.value)}
                className="bg-transparent text-white placeholder-white/70 outline-none flex-1"
                maxLength={100}
              />
            </div>
          </div>
          {titleInput && (
            <div className="text-white/60 text-xs text-right">{titleInput.length}/100</div>
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
            <span className="text-cyan-400 font-bold"> {averagePrice.toLocaleString()}원</span>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <div className="flex items-center justify-between">
              <span className="text-white">1GB 당</span>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  value={pricePerGB}
                  onChange={handlePriceChange}
                  className="bg-blue-600 text-white px-3 py-2 rounded text-center w-24 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  min="0"
                  step="100"
                />
                <span className="text-white">원</span>
              </div>
            </div>
          </div>

          {/* 가격 비교 표시 */}
          <div className="text-center text-sm">
            {pricePerGB > averagePrice ? (
              <span className="text-red-400">
                평균가보다 {(pricePerGB - averagePrice).toLocaleString()}원 높음
              </span>
            ) : pricePerGB < averagePrice ? (
              <span className="text-green-400">
                평균가보다 {(averagePrice - pricePerGB).toLocaleString()}원 낮음
              </span>
            ) : (
              <span className="text-cyan-400">평균가와 동일</span>
            )}
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
              <div className="text-yellow-400 text-3xl font-bold">
                {totalPrice.toLocaleString()}원
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
            disabled={!titleInput.trim() || sellCapacity <= 0 || isSubmitting}
          >
            {isSubmitting ? '등록 중...' : '등록하기'}
          </Button>
        </div>
      </div>
    </div>
  );
}
