'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import '@/styles/globals.css';

import { purchaseHistory } from '@/api/services/history/purchaseHistory';
import { sellHistory } from '@/api/services/history/sellHistory';
import { PurchaseHistoryResponse, SellHistoryResponse } from '@/api/types/history';
import { TradeHistoryCard, TradeHistoryCardProps } from '@/features/mypage/components';
import { useTradeHistory } from '@/hooks/useTradeHistory';
import { BadgeState } from '@/shared';
import { Button, Label, Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui';
import { groupByDate } from '@/utils/groupByDate';

type TradeCardItem = TradeHistoryCardProps & { createdAt: Date };

const STATUS_MAP: Record<string, BadgeState> = {
  SELLING: 'selling',
  SOLD_OUT: 'sold',
  TIME_OUT: 'timeout',
  REPORTED: 'reported',
};

const convertStatusToBadgeState = (status: string): BadgeState => {
  return STATUS_MAP[status] ?? 'selling';
};

const convertToCardProps = (
  items: SellHistoryResponse[] | PurchaseHistoryResponse[],
  isSell: boolean,
): TradeCardItem[] =>
  items.map((item) => ({
    createdAt: new Date(item.createdAt),
    carrier: item.carrier ?? '',
    message: item.title ?? '',
    price: item.totalZet ?? 0,
    dataAmount: item.totalZet ?? 0,
    state: isSell && 'status' in item ? convertStatusToBadgeState(item.status) : 'sold',
  }));

const MyTradeHistoryPage = () => {
  const searchParams = useSearchParams();
  const initialTab = (searchParams.get('tab') as 'sell' | 'purchase') ?? 'sell';
  const [activeTab, setActiveTab] = useState<'sell' | 'purchase'>(initialTab);
  const { sellTrade, purchaseTrade, setSellTrade, setPurchaseTrade } = useTradeHistory();

  const contentRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const [fetchedTabs, setFetchedTabs] = useState<{ sell: boolean; purchase: boolean }>({
    sell: false,
    purchase: false,
  });

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        if (activeTab === 'sell' && !fetchedTabs.sell) {
          const response = await sellHistory();
          setSellTrade(response ?? []);
          setFetchedTabs((prev) => ({ ...prev, sell: true }));
        }
        if (activeTab === 'purchase' && !fetchedTabs.purchase) {
          const response = await purchaseHistory();
          setPurchaseTrade(response ?? []);
          setFetchedTabs((prev) => ({ ...prev, purchase: true }));
        }
      } catch (error) {
        console.error('Failed to fetch history:', error);
      }
    };

    fetchHistory();
  }, [activeTab, fetchedTabs, setSellTrade, setPurchaseTrade]);

  const handleTabChange = (value: string) => {
    setActiveTab(value as 'sell' | 'purchase');
    requestAnimationFrame(() => {
      contentRef.current?.scrollTo(0, 0);
    });
  };

  const groupedSellTrade = groupByDate<TradeCardItem>(convertToCardProps(sellTrade, true));
  const groupedPurchaseTrade = groupByDate<TradeCardItem>(convertToCardProps(purchaseTrade, false));

  const EmptyTradeNotice = ({ label = '아직 거래한 내용이 없어요!' }: { label?: string }) => (
    <div className="flex flex-col items-center justify-center h-full gap-8">
      <Label className="text-gray-400">{label}</Label>
      <Button onClick={() => router.push('/exchange')} className="body-16-bold">
        거래하러 가기
      </Button>
    </div>
  );

  const renderGroupedHistory = (grouped: Record<string, TradeCardItem[]>) =>
    Object.entries(grouped)
      .sort(([a], [b]) => (a > b ? -1 : 1))
      .map(([date, items]) => (
        <div key={date} className="mb-6">
          <p className="text-white caption-14-bold ml-2 mb-2">{date}</p>
          <div className="flex flex-col gap-3">
            {items.map((item, idx) => (
              <TradeHistoryCard
                key={idx}
                carrier={item.carrier}
                message={item.message}
                dataAmount={item.dataAmount}
                price={item.price}
                state={item.state}
              />
            ))}
          </div>
        </div>
      ));

  return (
    <div className="flex flex-col justify-start items-center w-full h-[calc(100vh-112px)]">
      <Tabs
        defaultValue="sell"
        value={activeTab}
        onValueChange={handleTabChange}
        className="w-full h-full"
      >
        <TabsList className="bg-transparent w-full py-6 sm:py-8">
          <TabsTrigger
            className="flex body-20-bold items-center py-6 sm:py-8"
            value="sell"
            variant="darkTab"
            size="full"
          >
            판매 내역
          </TabsTrigger>
          <TabsTrigger
            className="flex body-20-bold items-center py-6 sm:py-8"
            value="purchase"
            variant="darkTab"
            size="full"
          >
            구매 내역
          </TabsTrigger>
        </TabsList>
        <div ref={contentRef} className="px-8 overflow-y-auto h-full pt-4 mb-4 hide-scrollbar">
          <TabsContent value="sell" className="text-white h-full">
            {sellTrade.length === 0 ? <EmptyTradeNotice /> : renderGroupedHistory(groupedSellTrade)}
          </TabsContent>
          <TabsContent value="purchase" className="text-white h-full">
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
