'use client';

import React, { useState } from 'react';
import { toast } from 'sonner';

import { fcmAPI } from '@/api';
import { FilterBox } from '@/features/exchange/components/FilterBox';
import { useFilteredItemCount } from '@/hooks/useFilteredItemCount';
import { useFilterState } from '@/hooks/useFilterState';
import { Button, Chip, DataRangeSlider, DataSlider, Icon, Title } from '@/shared';

import '@/styles/globals.css';

const FilterNotificationPage = () => {
  const { data, range, minData, maxData, minValue, maxValue, setData, setRange } = useFilterState();
  useFilteredItemCount();
  const [selectedCarriers, setSelectedCarriers] = useState<('SKT' | 'KT' | 'LGU')[]>(['SKT']);
  const [selectedReputations, setSelectedReputations] = useState<string[]>(['첫 출발']);
  const [isLoading, setIsLoading] = useState(false);

  // 통신사 선택 토글
  const toggleCarrier = (carrier: 'SKT' | 'KT' | 'LGU') => {
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
        toast('로그인이 필요합니다. 다시 로그인해주세요.');
        window.location.href = '/login';
        return;
      }

      // const filterData = {
      //   carriers: carriersToBitField(selectedCarriers),
      //   interestedMaxCapacity: data[0],
      //   interestedMinCapacity: 0,
      //   interestedMaxZet: range[1],
      //   interestedMinZet: range[0],
      //   interestedMaxPrice: maxValue,
      //   interestedMinPrice: minValue,
      //   reputation: selectedReputations.join(','),
      // };

      // 타입 안전한 API 호출
      await fcmAPI.setInterestedPostFilter({
        carriers: ['SKT', 'LGU'],
        interestedMaxCapacity: 5,
        interestedMinCapacity: 0,
        interestedMaxPrice: 1000,
        interestedMinPrice: 100,
      });

      toast('알림 조건이 저장되었습니다!');
    } catch (error) {
      if (error instanceof Error) {
        toast('로그인이 만료되었습니다. 다시 로그인해주세요.');
        window.location.href = '/login';
      } else {
        toast('알림 조건 저장에 실패했습니다. 다시 시도해주세요.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // 전체 초기화
  const handleReset = () => {
    setSelectedCarriers(['SKT']);
    setSelectedReputations(['첫 출발']);
    setData([minData]);
    setRange([minValue, maxValue]);
  };

  return (
    <div className="flex flex-col justify-start items-center w-full min-h-full">
      <Title title="알림 조건 설정" iconVariant="back" />
      <div className="overflow-y-auto flex flex-col gap-4 h-full mb-4 hide-scrollbar">
        {/* 통신사 선택 */}
        <FilterBox name="통신사" isMultipleSelection={true}>
          <div className="flex flex-wrap w-full items-center gap-2">
            <Icon name="RotateCw" />
            <div className="flex justify-start items-center gap-2">
              {(['SKT', 'LG', 'KT'] as const).map((displayName) => {
                const actualName = displayName === 'LG' ? 'LGU' : displayName;
                const isSelected = selectedCarriers.includes(actualName);

                return (
                  <Chip
                    key={displayName}
                    className={`w-[80px] flex justify-center cursor-pointer transition-colors ${
                      isSelected ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
                    }`}
                    onClick={() => {
                      toggleCarrier(actualName);
                    }}
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
              onValueChange={(newData) => {
                setData(newData);
              }}
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
            onValueChange={(newRange) => {
              setRange(newRange);
            }}
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
              {/* TODO: 추후 평판 ENUM 타입으로 변경 필요 */}
              {['첫 출발', '우주 새싹', '별빛 상인', '은하 베테랑', '우주 전설'].map(
                (reputation) => {
                  const isSelected = selectedReputations.includes(reputation);

                  return (
                    <Chip
                      key={reputation}
                      className={`cursor-pointer transition-colors ${
                        isSelected ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
                      }`}
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
      </div>
    </div>
  );
};

export default FilterNotificationPage;
