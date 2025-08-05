'use client';

import { useQuery } from '@tanstack/react-query';
import React from 'react';

import { userPlanAPI } from '@/backend';
import { ICON_PATHS } from '@/constants/icons';
import { useSellData } from '@/features/hooks/useSellData';
import { useMyInfo } from '@/features/mypage/hooks';
import { SellCapacitySlider } from '@/features/sell/components/SellCapacitySlider';
import { SellTotalPrice } from '@/features/sell/components/SellTotalPrice';
import { getSellErrorMessages } from '@/features/sell/utils/sellValidation';
import { Icon, Input, Button, PriceInput } from '@/shared';

export const SellFormContent = () => {
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

  return (
    <div className="flex flex-col w-full h-full justify-between">
      <div className="flex flex-col space-y-4">
        <div className="rounded-lg ">
          <div className="flex items-center space-x-2 w-full">
            <div className="w-9 h-9 px-0.5 bg-white/50 rounded-lg shadow-md flex justify-center items-center">
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

        <SellCapacitySlider
          value={value}
          setValue={setValue}
          maxCapacity={maxCapacity}
          errorMessage={getSellErrorMessages.price(isValidPrice, pricePerGB)}
          showTicks={false}
          showLabels={false}
        />

        <h3 className="mt-3 text-white font-bold text-lg">희망 판매 가격</h3>
        <div className="flex justify-center items-center gap-4 px-4 py-2">
          <span className="text-cyan-400 text-md font-semibold whitespace-nowrap">1GB 당</span>
          <div className="w-28 h-10 flex justify-center items-center px-1">
            <PriceInput
              value={String(pricePerGB)}
              onChange={handlePriceChange}
              placeholder="금액"
              variant="blueFill"
            />
          </div>
          <span className="text-cyan-400 text-smd font-semibold whitespace-nowrap">ZET</span>
        </div>

        <div className="flex justify-center">
          <SellTotalPrice
            sellCapacity={sellCapacity}
            totalPrice={totalPrice}
            isValidPrice={isValidPrice}
          />
        </div>
        <div className="flex justify-center w-full">
          <Button
            size={'sm'}
            onClick={handleSubmit}
            variant="exploration-button"
            disabled={!isFormValid || isSubmitting}
            className="h-15 ml-auto px-6 py-3"
          >
            {isSubmitting ? '등록 중...' : '등록하기'}
          </Button>
        </div>
      </div>
    </div>
  );
};
