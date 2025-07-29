import { useState, useCallback } from 'react';

import { purchaseAPI } from '@/api';
import { ApiError } from '@/api/client/axios';
import type { PurchaseRequest, PurchaseResponse } from '@/api/types/exchange';
import { PurchaseErrorType } from '@/api/types/exchange';
import { analytics } from '@/utils/analytics';

export type RetryState =
  | { status: 'idle' }
  | { status: 'processing' }
  | { status: 'retrying'; attempt: number; nextRetryIn: number }
  | { status: 'success'; data: PurchaseResponse }
  | { status: 'failed'; error: string; errorType: PurchaseErrorType; canRetry: boolean }
  | { status: 'error_recovery'; error: string; errorType: PurchaseErrorType };

interface UsePurchaseRetryOptions {
  maxRetries?: number;
  onSuccess?: (data: PurchaseResponse) => void;
}

interface AxiosApiError extends ApiError {
  response?: {
    status: number;
    data?: unknown;
  };
}

export const usePurchaseRetry = (options: UsePurchaseRetryOptions = {}) => {
  const { maxRetries = 3, onSuccess } = options;
  const [state, setState] = useState<RetryState>({ status: 'idle' }); // PurchaseState -> RetryState

  const classifyError = (error: unknown): { type: PurchaseErrorType; canRetry: boolean } => {
    let message = '';

    if (error instanceof Error) {
      message = error.message.toLowerCase();

      // HTTP 410 Gone 상태 확인
      const axiosError = error as AxiosApiError;
      if (axiosError.response?.status === 410) {
        return { type: PurchaseErrorType.PRODUCT_UNAVAILABLE, canRetry: false };
      }
    } else {
      message = String(error).toLowerCase();
    }

    if (
      message.includes('이미 판매된') ||
      message.includes('품절') ||
      message.includes('sold_out') ||
      message.includes('gone') ||
      message.includes('unavailable')
    ) {
      return { type: PurchaseErrorType.PRODUCT_UNAVAILABLE, canRetry: false };
    }

    if (message.includes('잔액') || message.includes('insufficient')) {
      return { type: PurchaseErrorType.INSUFFICIENT_BALANCE, canRetry: false };
    }

    if (message.includes('찾을 수 없습니다') || message.includes('not found')) {
      return { type: PurchaseErrorType.PRODUCT_NOT_FOUND, canRetry: false };
    }

    // 재시도 가능한 에러들
    if (
      message.includes('네트워크') ||
      message.includes('network') ||
      message.includes('timeout') ||
      message.includes('500') ||
      message.includes('502') ||
      message.includes('503')
    ) {
      return { type: PurchaseErrorType.NETWORK_ERROR, canRetry: true };
    }

    // 기본적으로 서버 에러로 분류하고 재시도 허용
    return { type: PurchaseErrorType.SERVER_ERROR, canRetry: true };
  };

  const executePurchase = useCallback(
    async (purchaseData: PurchaseRequest): Promise<PurchaseResponse> => {
      let lastError: unknown;

      for (let attempt = 1; attempt <= maxRetries + 1; attempt++) {
        try {
          if (attempt === 1) {
            setState({ status: 'processing' });
          } else {
            // 재시도 대기
            setState({
              status: 'retrying',
              attempt: attempt - 1,
              nextRetryIn: 2,
            });

            // 카운트다운
            for (let countdown = 2; countdown > 0; countdown--) {
              setState(
                (
                  prev: RetryState, // prev 타입 명시
                ) => (prev.status === 'retrying' ? { ...prev, nextRetryIn: countdown } : prev),
              );
              await new Promise((resolve) => setTimeout(resolve, 1000));
            }

            setState({ status: 'processing' });
          }

          const result = await purchaseAPI.purchase(purchaseData);

          // 성공 처리
          setState({ status: 'success', data: result });

          analytics.event('purchase_success', {
            post_id: purchaseData.postId,
            attempts_made: attempt,
          });

          onSuccess?.(result);
          return result;
        } catch (error) {
          lastError = error;
          const { type, canRetry } = classifyError(error);
          const errorMessage =
            error instanceof Error ? error.message : '구매 중 오류가 발생했습니다.';

          analytics.event('purchase_attempt_failed', {
            post_id: purchaseData.postId,
            attempt,
            error_type: type,
            can_retry: canRetry,
          });

          // 재시도 불가능한 에러는 즉시 복구 화면으로
          if (!canRetry) {
            setState({
              status: 'error_recovery',
              error: errorMessage,
              errorType: type,
            });

            analytics.event('purchase_error_recovery_needed', {
              post_id: purchaseData.postId,
              error_type: type,
              attempts_made: attempt,
            });

            throw new Error(errorMessage);
          }

          // 🔄 마지막 재시도 실패 시에도 복구 화면으로
          if (attempt > maxRetries) {
            setState({
              status: 'error_recovery',
              error: errorMessage,
              errorType: type,
            });

            analytics.event('purchase_final_failure', {
              post_id: purchaseData.postId,
              total_attempts: attempt,
              final_error_type: type,
            });

            throw new Error(errorMessage);
          }

          // 재시도 가능한 경우 계속 진행
          console.warn(`구매 시도 ${attempt} 실패, 재시도 예정:`, errorMessage);
        }
      }

      throw lastError;
    },
    [maxRetries, onSuccess],
  );

  const reset = useCallback(() => {
    setState({ status: 'idle' });
  }, []);

  const showErrorRecovery = useCallback((error: string, errorType: PurchaseErrorType) => {
    setState({
      status: 'error_recovery',
      error,
      errorType,
    });
  }, []);

  return {
    state,
    executePurchase,
    reset,
    showErrorRecovery,
    isLoading: ['processing', 'retrying'].includes(state.status),
    needsRecovery: state.status === 'error_recovery',
  };
};
