'use client';

import { useState } from 'react';

import { purchaseHistoryResponse, sellHistoryResponse } from '@/api/history';

export function useTradeHistory() {
  const [sellTrade, setSellTrade] = useState<sellHistoryResponse[]>([]);
  const [purchaseTrade, setPurchaseTrade] = useState<purchaseHistoryResponse[]>([]);

  return {
    sellTrade,
    setSellTrade,
    purchaseTrade,
    setPurchaseTrade,
  };
}
