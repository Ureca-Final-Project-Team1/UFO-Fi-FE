'use client';

import React, { useEffect, useRef, useState } from 'react';
import '@/styles/globals.css';

import { Tabs, TabsContent, TabsList, TabsTrigger, TradeCard } from '@/shared/ui';

import { Trade } from '@/shared/types/tradeCard';

const Page = () => {
  const [sellTrade, setSellTrade] = useState<Trade[]>([]);
  const [purchaseTrade, setPurchaseTrade] = useState<Trade[]>([]);
  const [activeTab, setActiveTab] = useState('tab1');

  const contentRef = useRef<HTMLDivElement>(null);

  const handleTabChange = (value: string) => {
    setActiveTab(value);

    requestAnimationFrame(() => {
      if (contentRef.current) {
        contentRef.current.scrollTop = 0;
      }
    });
  };

  // build 용
  useEffect(() => {
    setSellTrade([]);
    setPurchaseTrade([]);
  }, []);

  return (
    <div className="flex flex-col justify-start items-center w-screen min-h-[calc(100vh-112px)]">
      <Tabs
        defaultValue="tab1"
        value={activeTab}
        onValueChange={handleTabChange}
        className="w-full h-full"
      >
        <TabsList className="bg-transparent w-full h-16">
          <TabsTrigger
            className="flex body-20-bold items-center h-full"
            value="tab1"
            variant="darkTab"
            size="full"
          >
            판매 내역
          </TabsTrigger>
          <TabsTrigger
            className="flex body-20-bold items-center h-full"
            value="tab2"
            variant="darkTab"
            size="full"
          >
            구매 내역
          </TabsTrigger>
        </TabsList>
        <div ref={contentRef} className="px-8 max-h-[500px] overflow-y-auto">
          <TabsContent value="tab1" className="text-white">
            {sellTrade.length === 0 ? (
              <div>판매 내역이 없습니다.</div>
            ) : (
              sellTrade.map((item, idx) => (
                <TradeCard
                  key={idx}
                  carrier={item.carrier ?? ''}
                  message={item.message ?? ''}
                  dataAmount={item.dataAmount ?? 0}
                  price={item.price ?? 0}
                  {...(item.state ? { status: item.state } : {})}
                />
              ))
            )}
          </TabsContent>
          <TabsContent value="tab2" className="text-white">
            {purchaseTrade.length === 0 ? (
              <div>구매 내역이 없습니다.</div>
            ) : (
              purchaseTrade.map((item, idx) => (
                <TradeCard
                  key={idx}
                  carrier={item.carrier ?? ''}
                  message={item.message ?? ''}
                  dataAmount={item.dataAmount ?? 0}
                  price={item.price ?? 0}
                  {...(item.state ? { status: item.state } : {})}
                />
              ))
            )}
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default Page;
