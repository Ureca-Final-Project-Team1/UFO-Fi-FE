'use client';

import { useRouter } from 'next/navigation';
import { useState, useCallback } from 'react';

import { purchaseAPI, exchangeAPI, myInfoAPI, type ExchangePost } from '@/api';
import { purchaseTracker, PurchaseStatus, PurchaseErrorType } from '@/features';

interface UsePurchaseFlowProps {
  postId: string;
  isFirstPurchase?: boolean;
}

interface PurchaseFlowState {
  status: PurchaseStatus;
  error: string | null;
  productData: ExchangePost | null;
  userZetBalance: number;
  isLoading: boolean;
}

export const usePurchaseFlow = ({ postId, isFirstPurchase = false }: UsePurchaseFlowProps) => {
  const router = useRouter();

  const [state, setState] = useState<PurchaseFlowState>({
    status: PurchaseStatus.PENDING,
    error: null,
    productData: null,
    userZetBalance: 0,
    isLoading: false,
  });

  // 상품 정보 및 사용자 잔액 조회
  const fetchInitialData = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const [postsResponse, userInfo] = await Promise.all([
        exchangeAPI.getPosts({ size: 50 }),
        myInfoAPI.get(),
      ]);

      const product = postsResponse.posts.find((post) => post.postId === parseInt(postId));

      if (!product) {
        throw new Error(PurchaseErrorType.PRODUCT_NOT_FOUND);
      }

      if (product.status !== 'SELLING') {
        throw new Error(PurchaseErrorType.PRODUCT_UNAVAILABLE);
      }

      const userBalance = userInfo?.zetAsset || 0;

      setState((prev) => ({
        ...prev,
        productData: product,
        userZetBalance: userBalance,
        isLoading: false,
      }));

      // 플로우 시작 추적
      purchaseTracker.trackFlowStart({
        postId,
        totalPrice: product.totalPrice,
        dataAmount: product.sellMobileDataCapacityGb,
        carrier: product.carrier,
        sellerId: product.sellerId,
        isFirstPurchase,
      });

      return { product, userBalance };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '데이터를 불러올 수 없습니다.';

      setState((prev) => ({
        ...prev,
        error: errorMessage,
        isLoading: false,
        status: PurchaseStatus.FAILED,
      }));

      purchaseTracker.trackFailure({ postId }, errorMessage, 0);
      throw error;
    }
  }, [postId, isFirstPurchase]);

  // 잔액 확인
  const checkBalance = useCallback(() => {
    if (!state.productData) return false;

    const hasEnoughBalance = state.userZetBalance >= state.productData.totalPrice;

    return hasEnoughBalance;
  }, [state.productData, state.userZetBalance]);

  // 구매 실행
  const executePurchase = useCallback(async () => {
    if (!state.productData) {
      throw new Error('상품 정보가 없습니다.');
    }

    setState((prev) => ({ ...prev, status: PurchaseStatus.PROCESSING }));

    try {
      const purchaseRequest = {
        postId: state.productData.postId,
        sellerId: state.productData.sellerId,
        totalZet: state.productData.totalPrice,
        sellMobileDataAmountGB: state.productData.sellMobileDataCapacityGb,
      };

      const response = await purchaseAPI.purchase(purchaseRequest);

      if (response.statusCode >= 200 && response.statusCode < 300) {
        setState((prev) => ({
          ...prev,
          status: PurchaseStatus.COMPLETED,
          userZetBalance: response.content.zetAsset || prev.userZetBalance,
        }));

        // 구매 성공 추적
        const transactionId = `purchase_${state.productData.postId}_${Date.now()}`;
        purchaseTracker.trackSuccess(
          {
            postId,
            totalPrice: state.productData.totalPrice,
            dataAmount: state.productData.sellMobileDataCapacityGb,
            carrier: state.productData.carrier,
            sellerId: state.productData.sellerId,
            isFirstPurchase,
          },
          transactionId,
        );

        return response;
      } else {
        throw new Error(response.message || '구매에 실패했습니다.');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '구매 중 오류가 발생했습니다.';

      setState((prev) => ({
        ...prev,
        status: PurchaseStatus.FAILED,
        error: errorMessage,
      }));

      purchaseTracker.trackFailure(
        {
          postId,
          totalPrice: state.productData.totalPrice,
        },
        errorMessage,
        3,
      );

      throw error;
    }
  }, [state.productData, postId, isFirstPurchase]);

  // 단계 완료 추적
  const trackStepCompletion = useCallback(
    (step: number) => {
      if (!state.productData) return;

      purchaseTracker.trackStep(step);
    },
    [state.productData],
  );

  // 중도 이탈 추적
  const trackAbandonment = useCallback(
    (step: number, reason?: string) => {
      if (!state.productData) return;

      purchaseTracker.trackAbandonment(
        {
          postId,
          totalPrice: state.productData.totalPrice,
        },
        step,
        reason,
      );
    },
    [state.productData, postId],
  );

  // 충전 페이지로 이동
  const redirectToCharge = useCallback(() => {
    if (!state.productData) return;

    purchaseTracker.trackInsufficientBalance(
      {
        postId,
        totalPrice: state.productData.totalPrice,
      },
      state.userZetBalance,
    );

    router.push('/charge');
  }, [state.productData, state.userZetBalance, postId, router]);

  return {
    // 상태
    ...state,
    hasEnoughBalance: checkBalance(),

    // 액션
    fetchInitialData,
    executePurchase,
    trackStepCompletion,
    trackAbandonment,
    redirectToCharge,

    // 유틸리티
    isProcessing: state.status === PurchaseStatus.PROCESSING,
    isCompleted: state.status === PurchaseStatus.COMPLETED,
    isFailed: state.status === PurchaseStatus.FAILED,
  };
};
