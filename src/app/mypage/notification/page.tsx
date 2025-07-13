'use client';

import React, { useState } from 'react';

import { Title } from '@/shared';
import { Switch } from '@/shared/ui/Switch';
import '@/styles/globals.css';

const Page = () => {
  const [tradeAll, setTradeAll] = useState(false);
  const [tradeSell, setTradeSell] = useState(false);
  const [tradeInterest, setTradeInterest] = useState(false);

  const [reportAll, setReportAll] = useState(false);
  const [reportStop, setReportStop] = useState(false);

  const toggleTradeAll = (value: boolean) => {
    setTradeAll(value);
    setTradeSell(value);
    setTradeInterest(value);
  };

  const toggleReportAll = (value: boolean) => {
    setReportAll(value);
    setReportStop(value);
  };

  return (
    <div className="body-16-semibold w-full h-full flex flex-col items-center pt-4 gap-4 text-white">
      <Title title="알림 설정하기" className="body-20-bold" />

      <div className="w-full max-w-md flex flex-col gap-6">
        <div className="grid grid-cols-[80px_1fr_auto] gap-y-4 items-center">
          <p className="col-span-2">거래 알림</p>
          <Switch className="col-start-3" checked={tradeAll} onCheckedChange={toggleTradeAll} />

          <p className="text-gray-400">데이터</p>
          <p className="ml-[20%]">데이터 판매 알림</p>
          <Switch checked={tradeSell} onCheckedChange={setTradeSell} />

          <p className="col-start-2 ml-[20%]">관심 상품 알림</p>
          <Switch checked={tradeInterest} onCheckedChange={setTradeInterest} />
        </div>

        <div className="grid grid-cols-[80px_1fr_auto] gap-y-4 items-center">
          <p className="col-span-2">신고 알림</p>
          <Switch className="col-start-3" checked={reportAll} onCheckedChange={toggleReportAll} />

          <p className="text-gray-400">신고</p>
          <p className="ml-[20%]">신고 누적 정지 알림</p>
          <Switch checked={reportStop} onCheckedChange={setReportStop} />
        </div>
      </div>
    </div>
  );
};

export default Page;
