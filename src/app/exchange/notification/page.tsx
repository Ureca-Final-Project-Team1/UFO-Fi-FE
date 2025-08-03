'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'sonner';

import { fcmAPI } from '@/backend';
import { Carrier, CARRIER_DISPLAY_NAMES } from '@/backend/types/carrier';
import { FilterBox } from '@/features/exchange/components/FilterBox';
import { useFilteredItemCount } from '@/hooks/useFilteredItemCount';
import { useFilterState } from '@/hooks/useFilterState';
import { Button, Chip, DataRangeSlider, DataSlider, Icon, Title } from '@/shared';

import '@/styles/globals.css';

const FilterNotificationPage = () => {
  const { data, range, minData, maxData, minValue, maxValue, setData, setRange } = useFilterState();
  useFilteredItemCount();
  const router = useRouter();
  const [selectedCarriers, setSelectedCarriers] = useState<Carrier[]>([Carrier.SKT]);
  const [isLoading, setIsLoading] = useState(false);

  // 통신사 선택 토글
  const toggleCarrier = (carrier: Carrier) => {
    setSelectedCarriers((prev) => {
      const newCarriers = prev.includes(carrier)
        ? prev.filter((c) => c !== carrier)
        : [...prev, carrier];
      return newCarriers;
    });
  };

  // TODO: 마이페이지 커스텀 훅 들어오면 변경 예정
  const checkAuthStatus = async (): Promise<boolean> => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/mypage`, {
        credentials: 'include',
        method: 'GET',
        headers: { Accept: 'application/json' },
      });
      return response.ok;
    } catch (error) {
      console.error('인증 상태 확인 실패:', error);
      return false;
    }
  };

  // 알림 필터 저장
  const handleSaveFilter = async () => {
    try {
      setIsLoading(true);

      // 로그인 상태 확인
      const isLoggedIn = await checkAuthStatus();
      if (!isLoggedIn) {
        toast.error('로그인이 필요합니다. 다시 로그인해주세요.');
        router.push('/login');
        return;
      }

      await fcmAPI.setInterestedPostFilter({
        carriers: selectedCarriers,
        interestedMaxCapacity: data[0],
        interestedMinCapacity: minData,
        interestedMaxPrice: range[1],
        interestedMinPrice: range[0],
      });

      toast.success('알림 조건이 저장되었습니다!');
    } catch (error) {
      console.error('알림 필터 저장 실패:', error);

      if (error instanceof Error && error.message.includes('401')) {
        toast.error('로그인이 만료되었습니다. 다시 로그인해주세요.');
        router.push('/login');
      } else {
        toast.error('알림 조건 저장에 실패했습니다. 다시 시도해주세요.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // 전체 초기화
  const handleReset = () => {
    setSelectedCarriers([Carrier.SKT]);
    setData([minData]);
    setRange([minValue, maxValue]);
    toast.info('전체 조건이 초기화되었습니다.');
  };

  return (
    <div>
      <Title title="알림 조건 설정" iconVariant="back" />
      <div className="overflow-y-auto flex flex-col gap-4 h-full mb-4 hide-scrollbar w-full px-4">
        {/* 통신사 선택 */}
        <FilterBox name="통신사" isMultipleSelection={true} className="w-full">
          <div className="flex flex-wrap w-full items-center gap-2">
            <Icon name="RotateCw" />
            <div className="flex justify-start items-center gap-2 flex-wrap">
              {Object.values(Carrier).map((carrier) => {
                const displayName = CARRIER_DISPLAY_NAMES[carrier];
                const isSelected = selectedCarriers.includes(carrier);

                return (
                  <Chip
                    key={carrier}
                    selected={isSelected}
                    className="w-[80px] flex justify-center cursor-pointer transition-colors"
                    onClick={() => toggleCarrier(carrier)}
                  >
                    {displayName}
                  </Chip>
                );
              })}
            </div>
          </div>
        </FilterBox>

        {/* 용량 선택 */}
        <FilterBox className="pb-10 w-full" name="용량">
          <div className="w-full h-fit mt-2">
            <DataSlider
              value={data}
              onValueChange={setData}
              showTicks={true}
              showLabels={true}
              minLabel={`${minData}GB`}
              maxLabel={`${maxData}GB`}
              max={maxData}
              showMiddleLabels={false}
            />
          </div>
        </FilterBox>

        {/* 단위가격 선택 */}
        <FilterBox name="단위가격" className="w-full">
          <DataRangeSlider
            value={range}
            onValueChange={setRange}
            min={minValue}
            max={maxValue}
            minLabel={`${minValue}ZET`}
            maxLabel={`${maxValue}ZET`}
          />
        </FilterBox>

        {/* 버튼 영역 */}
        <div className="flex justify-between w-full gap-3">
          <div className="relative w-[40%] rounded-md overflow-hidden z-0">
            <div className="absolute inset-0 bg-[var(--color-primary-400)] opacity-70 z-0" />
            <Button
              className="relative z-10 w-full text-white bg-transparent"
              icon="RotateCw"
              iconPosition="left"
              onClick={handleReset}
            >
              전체 초기화
            </Button>
          </div>

          <Button
            variant="exploration-button"
            className="w-[55%]"
            onClick={handleSaveFilter}
            disabled={isLoading || selectedCarriers.length === 0}
          >
            {isLoading ? '저장 중...' : '알림 조건 저장'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterNotificationPage;
