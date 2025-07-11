'use client';

import React from 'react';

import { Title } from '@/shared';
import { Switch } from '@/shared/ui/Switch';
import '@/styles/globals.css';

const Page = () => {
  return (
    <div className="body-16-semibold w-full h-full flex flex-col items-center pt-4 gap-4 text-white">
      <Title title="알림 설정하기" className="body-20-bold" />

      <div className="grid grid-cols-[80px_1fr_auto] gap-y-4 w-full max-w-md items-center">
        <p className="col-span-2">거래 알림 전체</p>
        <Switch className="col-start-3" />

        <p className="text-gray-400">데이터</p>
        <p className="ml-[20%]">데이터 판매 알림</p>
        <Switch />

        <p className="col-start-2 ml-[20%]">관심 상품 알림</p>
        <Switch />

        <p className="text-gray-400">신고</p>
        <p className="ml-[20%]">신고 누적 정지 알림</p>
        <Switch />
      </div>
    </div>
  );
};

export default Page;
