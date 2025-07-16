'use client';

import { useEffect, useState } from 'react';

import { TradeHistoryCardProps } from '@/features/mypage/components';

export interface TradeHistory extends TradeHistoryCardProps {
  createdAt: Date;
}

export function useTradeHistory() {
  const [sellTrade, setSellTrade] = useState<TradeHistory[]>([]);
  const [purchaseTrade, setPurchaseTrade] = useState<TradeHistory[]>([]);

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

  return {
    sellTrade,
    purchaseTrade,
  };
}
