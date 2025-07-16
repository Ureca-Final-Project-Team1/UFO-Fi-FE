'use client';

import React from 'react';

import { FilterBox } from '@/features/exchange/components/FilterBox';
import { useFilteredItemCount } from '@/hooks/useFilteredItemCount';
import { useFilterState } from '@/hooks/useFilterState';
import { Button, Chip, DataRangeSlider, DataSlider, Icon, Title } from '@/shared';
import '@/styles/globals.css';

const FilterNotificationPage = () => {
  const { data, range, minData, maxData, minValue, maxValue, setData, setRange } = useFilterState();
  const { count } = useFilteredItemCount();

  return (
    <div className="flex flex-col justify-start items-center w-full h-[calc(100vh-112px)]">
      <Title title="알림 조건 설정" iconVariant="back" />
      <div className="overflow-y-auto flex flex-col gap-4 h-full mb-4 hide-scrollbar">
        <FilterBox name="통신사" isMultipleSelection={true}>
          <div className="flex flex-wrap w-full items-center gap-2">
            <Icon name="RotateCw" />
            <div className="flex justify-start items-center gap-2">
              <Chip className="w-[80px] flex justify-center">SKT</Chip>
              <Chip className="w-[80px] flex justify-center">LG</Chip>
              <Chip className="w-[80px] flex justify-center">KT</Chip>
            </div>
          </div>
        </FilterBox>
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
        <FilterBox name="평판" isMultipleSelection={true}>
          <div className="flex w-full items-center gap-3">
            <Icon name="RotateCw" />
            <div className="flex flex-wrap justify-center items-center gap-2">
              <Chip>첫 출발</Chip>
              <Chip>우주 새싹</Chip>
              <Chip>별빛 상인</Chip>
              <Chip>은하 베테랑</Chip>
              <Chip>우주 전설</Chip>
            </div>
          </div>
        </FilterBox>
        <div className="flex justify-between w-full">
          <div className="relative w-[40%] rounded-md overflow-hidden z-0">
            <div className="absolute inset-0 bg-[var(--color-primary-400)] opacity-70 z-0" />
            <Button
              className="relative z-10 w-full text-white bg-transparent"
              icon="RotateCw"
              iconPosition="left"
            >
              전체 초기화
            </Button>
          </div>
          <Button variant="exploration-button" className="w-[55%]">
            {count}개 상품 보기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterNotificationPage;
