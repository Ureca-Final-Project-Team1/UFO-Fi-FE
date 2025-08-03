'use client';

export const dynamic = 'force-dynamic';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

import { PurchaseHistoryResponse, SellHistoryResponse, sellHistory, purchaseHistory } from '@/api';
import { TradeHistoryCard, useTradeHistory, TradeHistoryCardProps } from '@/features';
import {
  BadgeState,
  Button,
  Label,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  groupByDate,
} from '@/shared';

type TradeCardItem = TradeHistoryCardProps & {
  createdAt: Date;
  purchaseHistoryId?: number;
  postId?: number;
};

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
    dataAmount: isSell
      ? (item as SellHistoryResponse).sellMobileDataAmountGB
      : (item as PurchaseHistoryResponse).totalGB,
    state: isSell && 'status' in item ? convertStatusToBadgeState(item.status) : 'sold',
    purchaseHistoryId: 'purchaseHistoryId' in item ? item.purchaseHistoryId : undefined,
    postId: item.postId,
  }));

const MyTradeHistoryPage = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const tab = searchParams.get('tab') || 'sell';

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
        if (tab === 'sell' && !fetchedTabs.sell) {
          const response = await sellHistory();
          setSellTrade(response ?? []);
          setFetchedTabs((prev) => ({ ...prev, sell: true }));
        }
        if (tab === 'purchase' && !fetchedTabs.purchase) {
          const response = await purchaseHistory();
          setPurchaseTrade(response ?? []);
          setFetchedTabs((prev) => ({ ...prev, purchase: true }));
        }
      } catch (error) {
        console.error('Failed to fetch history:', error);
        toast.error('내역 불러오기에 실패했습니다.');
      }
    };

    fetchHistory();
  }, [tab, fetchedTabs, setSellTrade, setPurchaseTrade]);

  const handleTabChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', value);
    router.replace(`${pathname}?${params.toString()}`);
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

  const handleCardClick = (item: TradeCardItem, isSell: boolean) => {
    if (!isSell) {
      // 구매 내역 클릭 시 상세 페이지로 이동
      router.push(`/mypage/trade/detail?id=${item.purchaseHistoryId}`);
    }
  };

  const renderGroupedHistory = (
    grouped: Record<string, TradeCardItem[]>,
    isSell: boolean = false,
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
                carrier={item.carrier}
                message={item.message}
                dataAmount={item.dataAmount}
                price={item.price}
                state={item.state}
                onClick={!isSell ? () => handleCardClick(item, isSell) : undefined}
              />
            ))}
          </div>
        </div>
      ));

  return (
    <div>
      <Tabs defaultValue="sell" value={tab} onValueChange={handleTabChange}>
        <TabsList className="my-4 w-auto px-10 gap-10">
          <TabsTrigger value="sell" variant="darkTab" size="full">
            판매 내역
          </TabsTrigger>
          <TabsTrigger value="purchase" variant="darkTab" size="full">
            구매 내역
          </TabsTrigger>
        </TabsList>
        <div ref={contentRef} className="overflow-y-auto h-full hide-scrollbar">
          <TabsContent value="sell" className="text-white h-full">
            {sellTrade.length === 0 ? (
              <EmptyTradeNotice />
            ) : (
              renderGroupedHistory(groupedSellTrade, true)
            )}
          </TabsContent>
          <TabsContent value="purchase" className="text-white h-full">
            {purchaseTrade.length === 0 ? (
              <EmptyTradeNotice />
            ) : (
              renderGroupedHistory(groupedPurchaseTrade, false)
            )}
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default MyTradeHistoryPage;
