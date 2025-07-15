'use client';

import { useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react';
import '@/styles/globals.css';

import { TradeHistoryCard, TradeHistoryCardProps } from '@/features/mypage/components';
import { useTradeHistory } from '@/hooks/useTradeHistory';
import { Button, Label, Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui';
import { groupByDate } from '@/utils/groupByDate';

const MyTradeHistoryPage = () => {
  const [activeTab, setActiveTab] = useState('tab1');
  const { sellTrade, purchaseTrade } = useTradeHistory();

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

  const groupedSellTrade = groupByDate(sellTrade);
  const groupedPurchaseTrade = groupByDate(purchaseTrade);

  const EmptyTradeNotice = ({ label = '아직 거래한 내용이 없어요!' }: { label?: string }) => (
    <div className="flex flex-col items-center justify-center h-full gap-8">
      <Label className="text-gray-400">{label}</Label>
      <Button onClick={() => router.push('/exchange')} className="body-16-bold">
        거래하러 가기
      </Button>
    </div>
  );

  const renderGroupedHistory = (
    grouped: Record<string, (TradeHistoryCardProps & { createdAt: Date })[]>,
  ) =>
    Object.entries(grouped)
      .sort(([a], [b]) => (a > b ? -1 : 1))
      .map(([date, items]) => (
        <div key={date} className="mb-6">
          <p className="text-white caption-14-bold ml-2 mb-2">{date}</p>
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
    <div className="flex flex-col justify-start items-center w-full h-[calc(100vh-112px)]">
      <Tabs
        defaultValue="tab1"
        value={activeTab}
        onValueChange={handleTabChange}
        className="w-full h-full"
      >
        <TabsList className="bg-transparent w-full py-6 sm:py-8">
          <TabsTrigger
            className="flex body-20-bold items-center py-6 sm:py-8"
            value="tab1"
            variant="darkTab"
            size="full"
          >
            판매 내역
          </TabsTrigger>
          <TabsTrigger
            className="flex body-20-bold items-center py-6 sm:py-8"
            value="tab2"
            variant="darkTab"
            size="full"
          >
            구매 내역
          </TabsTrigger>
        </TabsList>
        <div ref={contentRef} className="px-8 overflow-y-auto h-full pt-4 mb-4 hide-scrollbar">
          <TabsContent value="tab1" className="text-white h-full">
            {sellTrade.length === 0 ? <EmptyTradeNotice /> : renderGroupedHistory(groupedSellTrade)}
          </TabsContent>
          <TabsContent value="tab2" className="text-white h-full">
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

export default MyTradeHistoryPage;
