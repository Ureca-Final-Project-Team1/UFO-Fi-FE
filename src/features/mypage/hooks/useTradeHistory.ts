'use client';

import { useState } from 'react';

import { PurchaseHistoryResponse, SellHistoryResponse } from '@/backend/types/history';

export function useTradeHistory() {
  const [sellTrade, setSellTrade] = useState<SellHistoryResponse[]>([]);
  const [purchaseTrade, setPurchaseTrade] = useState<PurchaseHistoryResponse[]>([]);

  return {
    sellTrade,
    setSellTrade,
    purchaseTrade,
    setPurchaseTrade,
  };
}
