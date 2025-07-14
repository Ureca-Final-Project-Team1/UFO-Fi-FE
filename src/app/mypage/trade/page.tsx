'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import '@/styles/globals.css';

import { TradeHistoryCard, TradeHistoryCardProps } from '@/features/mypage/components';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui';
import { groupByDate } from '@/utils/groupByDate';

const Page = () => {
  const [sellTrade, setSellTrade] = useState<(TradeHistoryCardProps & { createdAt: Date })[]>([]);
  const [purchaseTrade, setPurchaseTrade] = useState<
    (TradeHistoryCardProps & { createdAt: Date })[]
  >([]);
  const [activeTab, setActiveTab] = useState('tab1');

  const contentRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    requestAnimationFrame(() => {
      if (contentRef.current) {
        contentRef.current.scrollTop = 0;
      }
    });
  };

  useEffect(() => {
    setSellTrade([
      {
        carrier: 'KT',
        message: '데이터 급처분합니다.',
        dataAmount: 1,
        price: 10,
        state: 'selling',
        createdAt: new Date('2025-07-01'),
      },
      {
        carrier: 'KT',
        message: '디그닥닥디그닥두둑둑',
        dataAmount: 1,
        price: 10,
        state: 'sold',
        createdAt: new Date('2025-07-01'),
      },
      {
        carrier: 'SKT',
        message: '5GB 판매합니다',
        dataAmount: 5,
        price: 30,
        state: 'reported',
        createdAt: new Date('2025-07-02'),
      },
    ]);

    setPurchaseTrade([
      {
        carrier: 'SKT',
        message: '5GB 구매 완료',
        dataAmount: 5,
        price: 30,
        state: 'sold',
        createdAt: new Date('2025-07-02'),
      },
      {
        carrier: 'KT',
        message: '기간만료',
        dataAmount: 2,
        price: 12,
        state: 'timeout',
        createdAt: new Date('2025-07-02'),
      },
      {
        carrier: 'LGU',
        message: '6GB 판매자와 거래 중',
        dataAmount: 6,
        price: 36,
        state: 'selling',
        createdAt: new Date('2025-07-03'),
      },
    ]);
  }, []);

  const groupedSellTrade = groupByDate(sellTrade);
  const groupedPurchaseTrade = groupByDate(purchaseTrade);

  const EmptyTradeNotice = ({ label = '아직 거래한 내용이 없어요!' }: { label?: string }) => (
    <div className="flex flex-col items-center justify-center py-20 gap-4">
      <span className="text-sm text-gray-400">{label}</span>
      <button
        onClick={() => router.push('/exchange')}
        className="px-4 py-2 rounded-md bg-white text-black text-sm font-semibold hover:bg-gray-200 transition"
      >
        거래하러 가기
      </button>
    </div>
  );

  const renderGroupedHistory = (
    grouped: Record<string, (TradeHistoryCardProps & { createdAt: Date })[]>,
  ) =>
    Object.entries(grouped)
      .sort(([a], [b]) => (a > b ? -1 : 1))
      .map(([date, items]) => (
        <div key={date} className="mb-6">
          <p className="text-sm text-gray-300 font-semibold mb-2">{date}</p>
          <div className="flex flex-col gap-3">
            {items.map((item, idx) => (
              <TradeHistoryCard
                key={idx}
                carrier={item.carrier ?? ''}
                message={item.message ?? ''}
                dataAmount={item.dataAmount ?? 0}
                price={item.price ?? 0}
                state={item.state ?? undefined}
              />
            ))}
          </div>
        </div>
      ));

  return (
    <div className="flex flex-col justify-start items-center w-full min-h-[calc(100vh-112px)]">
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
            {sellTrade.length === 0 ? <EmptyTradeNotice /> : renderGroupedHistory(groupedSellTrade)}
          </TabsContent>
          <TabsContent value="tab2" className="text-white">
            {purchaseTrade.length === 0 ? (
              <EmptyTradeNotice />
            ) : (
              renderGroupedHistory(groupedPurchaseTrade)
            )}
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default Page;
