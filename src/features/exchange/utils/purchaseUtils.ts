import { PurchaseStatus, PurchaseErrorType } from '@/api/types/exchange'; // ✅ enum import
import type { EcommerceItem } from '@/types/analytics';
import { analytics } from '@/utils/analytics';

export interface PurchaseTrackingData {
  postId: string;
  totalPrice: number;
  dataAmount: number;
  carrier: string;
  sellerId: number;
  isFirstPurchase?: boolean;
}

export const purchaseTracker = {
  // 구매 플로우 시작
  trackFlowStart: (data: Partial<PurchaseTrackingData>) => {
    analytics.event('purchase_flow_started', {
      is_first_purchase: data.isFirstPurchase || false,
      flow_entry_point: 'product_detail',
    });
  },

  // 단계별 진행 추적
  trackStep: (step: number) => {
    analytics.event('purchase_step_completed', {
      step_number: step,
      step_name: getStepName(step),
    });
  },

  // 구매 성공
  trackSuccess: (data: PurchaseTrackingData, transactionId: string) => {
    const items: EcommerceItem[] = [
      {
        item_id: data.postId,
        item_name: `${data.dataAmount}GB ${data.carrier} 데이터`,
        category: 'mobile_data',
        quantity: 1,
        price: data.totalPrice,
      },
    ];

    analytics.track.purchase(transactionId, data.totalPrice, items);

    // 일반 구매 완료 이벤트
    analytics.event('purchase_completed', {
      post_id: data.postId,
      transaction_id: transactionId,
      total_price: data.totalPrice,
      data_amount: data.dataAmount,
      carrier: data.carrier,
      seller_id: data.sellerId,
    });
  },

  // 구매 실패
  trackFailure: (data: Partial<PurchaseTrackingData>, error: string, step?: number) => {
    analytics.track.errorOccurred('purchase_failed', error);
    analytics.event('purchase_failed', {
      error_message: error,
      failure_step: step || 'unknown',
    });
  },

  // 잔액 부족
  trackInsufficientBalance: (data: Partial<PurchaseTrackingData>, userBalance: number) => {
    analytics.event('purchase_insufficient_balance', {
      user_balance: userBalance,
      deficit: (data.totalPrice || 0) - userBalance,
    });
  },

  trackAbandonment: (data: Partial<PurchaseTrackingData>, step: number, reason?: string) => {
    analytics.event('purchase_abandoned', {
      abandoned_at_step: step,
      abandonment_reason: reason || 'user_exit',
    });
  },
};

function getStepName(step: number): string {
  const stepNames = {
    1: 'price_confirmation',
    2: 'phone_verification',
    3: 'final_purchase',
  };
  return stepNames[step as keyof typeof stepNames] || 'unknown';
}

// ✅ 메시지 생성 함수 (enum 기반)
export const getPurchaseStatusMessage = (status: PurchaseStatus, error?: string): string => {
  switch (status) {
    case PurchaseStatus.PENDING:
      return '구매를 준비하고 있습니다...';
    case PurchaseStatus.PROCESSING:
      return '결제를 진행하고 있습니다...';
    case PurchaseStatus.COMPLETED:
      return '구매가 완료되었습니다!';
    case PurchaseStatus.FAILED:
      return error || '구매 중 오류가 발생했습니다.';
    case PurchaseStatus.CANCELLED:
      return '구매가 취소되었습니다.';
    default:
      return '알 수 없는 상태입니다.';
  }
};
export { PurchaseErrorType, PurchaseStatus };
