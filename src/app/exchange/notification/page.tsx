'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'sonner';

import { fcmAPI } from '@/api';
import { Carrier, CARRIER_DISPLAY_NAMES } from '@/api/types/carrier';
import { FilterBox } from '@/features/exchange/components/FilterBox';
import { useFilteredItemCount } from '@/hooks/useFilteredItemCount';
import { useFilterState } from '@/hooks/useFilterState';
import { Button, Chip, DataRangeSlider, DataSlider, Icon, TitleWithRouter } from '@/shared';

import '@/styles/globals.css';

const FilterNotificationPage = () => {
  const { data, range, minData, maxData, minValue, maxValue, setData, setRange } = useFilterState();
  useFilteredItemCount();
  const router = useRouter();
  const [selectedCarriers, setSelectedCarriers] = useState<Carrier[]>([Carrier.SKT]);
  const [selectedReputations, setSelectedReputations] = useState<string[]>(['첫 출발']);
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

  // 평판 선택 토글
  const toggleReputation = (reputation: string) => {
    setSelectedReputations((prev) => {
      const newReputations = prev.includes(reputation)
        ? prev.filter((r) => r !== reputation)
        : [...prev, reputation];
      return newReputations;
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
    setSelectedReputations(['첫 출발']);
    setData([minData]);
    setRange([minValue, maxValue]);
    toast.info('전체 조건이 초기화되었습니다.');
  };

  return (
    <div className="flex flex-col justify-start items-center w-full min-h-full">
      <TitleWithRouter title="알림 조건 설정" iconVariant="back" />
      <div className="overflow-y-auto flex flex-col gap-4 h-full mb-4 hide-scrollbar">
        {/* 통신사 선택 */}
        <FilterBox name="통신사" isMultipleSelection={true}>
          <div className="flex flex-wrap w-full items-center gap-2">
            <Icon name="RotateCw" />
            <div className="flex justify-start items-center gap-2">
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
        <FilterBox className="pb-10" name="용량">
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
        <FilterBox name="단위가격">
          <DataRangeSlider
            value={range}
            onValueChange={setRange}
            min={minValue}
            max={maxValue}
            minLabel={`${minValue}ZET`}
            maxLabel={`${maxValue}ZET`}
          />
        </FilterBox>

        {/* 평판 선택 */}
        <FilterBox name="평판" isMultipleSelection={true}>
          <div className="flex w-full items-center gap-3">
            <Icon name="RotateCw" />
            <div className="flex flex-wrap justify-center items-center gap-2">
              {['첫 출발', '우주 새싹', '별빛 상인', '은하 베테랑', '우주 전설'].map(
                (reputation) => {
                  const isSelected = selectedReputations.includes(reputation);

                  return (
                    <Chip
                      key={reputation}
                      selected={isSelected}
                      className="cursor-pointer transition-colors"
                      onClick={() => toggleReputation(reputation)}
                    >
                      {reputation}
                    </Chip>
                  );
                },
              )}
            </div>
          </div>
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

        {/* TODO: 현재 선택된 조건을 표시하며, 배포 이후 이 부분은 지울 예정 */}
        <div className="bg-gray-50 p-3 rounded-lg text-sm text-black">
          <div className="font-semibold mb-2">현재 설정:</div>
          <div>
            통신사:{' '}
            {selectedCarriers.length > 0
              ? selectedCarriers.map((c) => CARRIER_DISPLAY_NAMES[c]).join(', ')
              : '선택 없음'}
          </div>
          <div>용량: {data[0]}GB</div>
          <div>
            가격: {range[0]} - {range[1]} ZET
          </div>
          <div className="mt-2 text-xs text-gray-500">※ 평판 필터는 현재 지원하지 않습니다</div>
        </div>
      </div>
    </div>
  );
};

export default FilterNotificationPage;
