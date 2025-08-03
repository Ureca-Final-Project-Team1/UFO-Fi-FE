'use client';

import { useState } from 'react';

import { PurchaseHistoryResponse, SellHistoryResponse } from '@/api';

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
