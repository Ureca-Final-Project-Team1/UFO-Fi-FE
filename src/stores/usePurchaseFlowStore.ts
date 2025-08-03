import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import type { ExchangePost } from '@/backend/types/exchange';

interface PurchaseFlowState {
  // 상품 데이터
  productData: ExchangePost | null;
  userZetBalance: number;
  isFirstPurchase: boolean;

  // 구매 진행 상태
  currentStep: number;
  purchaseStartTime: number;

  // 액션들
  setProductData: (product: ExchangePost) => void;
  setUserZetBalance: (balance: number) => void;
  setIsFirstPurchase: (isFirst: boolean) => void;
  setCurrentStep: (step: number) => void;

  // 헬퍼 메서드들
  isValidPurchaseFlow: () => boolean;
  canProceedToStep: (step: number) => boolean;

  // 리셋
  resetPurchaseFlow: () => void;
}

export const usePurchaseFlowStore = create<PurchaseFlowState>()(
  devtools(
    (set, get) => ({
      // 초기 상태
      productData: null,
      userZetBalance: 0,
      isFirstPurchase: false,
      currentStep: 1,
      purchaseStartTime: 0,

      // 액션들
      setProductData: (product) =>
        set(
          {
            productData: product,
            purchaseStartTime: Date.now(),
          },
          false,
          'setProductData',
        ),

      setUserZetBalance: (balance) =>
        set(
          {
            userZetBalance: balance,
          },
          false,
          'setUserZetBalance',
        ),

      setIsFirstPurchase: (isFirst) =>
        set(
          {
            isFirstPurchase: isFirst,
          },
          false,
          'setIsFirstPurchase',
        ),

      setCurrentStep: (step) =>
        set(
          {
            currentStep: step,
          },
          false,
          'setCurrentStep',
        ),

      // 헬퍼 메서드들
      isValidPurchaseFlow: () => {
        const state = get();
        return !!(state.productData && state.productData.postId > 0 && state.userZetBalance >= 0);
      },

      canProceedToStep: (step: number) => {
        const state = get();
        if (!state.isValidPurchaseFlow()) return false;

        switch (step) {
          case 2:
            return state.currentStep >= 1;
          case 3:
            return state.currentStep >= 2;
          default:
            return true;
        }
      },

      // 구매 완료 시 초기화
      resetPurchaseFlow: () =>
        set(
          {
            productData: null,
            userZetBalance: 0,
            isFirstPurchase: false,
            currentStep: 1,
            purchaseStartTime: 0,
          },
          false,
          'resetPurchaseFlow',
        ),
    }),
    {
      name: 'purchase-flow-store',
    },
  ),
);
