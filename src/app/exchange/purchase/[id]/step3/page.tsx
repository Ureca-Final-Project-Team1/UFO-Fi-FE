'use client';

import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';

import { PurchaseErrorType } from '@/backend/types/exchange';
import type { PurchaseRequest } from '@/backend/types/exchange';
import { IMAGE_PATHS } from '@/constants/images';
import { PurchaseErrorRecovery } from '@/features/purchase/components/PurchaseErrorRecovery';
import { usePurchaseRetry } from '@/features/purchase/hooks/usePurchaseRetry';
import { Button, Loading, Title } from '@/shared';
import { analytics } from '@/shared/utils/analytics';
import queryClient, { queryKeys } from '@/shared/utils/queryClient';
import { usePurchaseFlowStore } from '@/stores/usePurchaseFlowStore';

function Step3Content() {
  const router = useRouter();
  const params = useParams();
  const { productData, userZetBalance, isFirstPurchase } = usePurchaseFlowStore();

  const [postId, setPostId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isNavigating, setIsNavigating] = useState(false);

  const { state, executePurchase, reset, needsRecovery } = usePurchaseRetry({
    maxRetries: 3,
    onSuccess: (result) => {
      analytics.event('purchase_success', {
        post_id: postId?.toString() || '',
        is_first_purchase: isFirstPurchase,
        final_zet_balance: result.content?.zetAsset || 0,
      });
    },
  });

  // useParams 안전하게 처리
  useEffect(() => {
    if (params?.id) {
      const id = parseInt(params.id as string, 10);
      if (!isNaN(id) && id > 0) {
        setPostId(id);
      } else {
        setError('잘못된 상품 ID입니다.');
      }
    } else {
      setError('상품 ID가 없습니다.');
    }
  }, [params]);

  // Store 데이터 확인
  useEffect(() => {
    if (!postId) return;

    if (productData && productData.postId === postId) {
      // Store에 데이터가 있음 - 바로 사용
      setIsLoading(false);

      analytics.event('purchase_step3_viewed', {
        post_id: postId.toString(),
        is_first_purchase: isFirstPurchase,
        product_price: productData.totalPrice,
        user_zet: userZetBalance,
      });
    } else if (!isNavigating) {
      // Store에 데이터가 없음 - 거래소로 리다이렉트
      setError('상품 정보가 없습니다. 거래소에서 다시 선택해주세요.');
      setIsLoading(false);
    }
  }, [postId, productData, isFirstPurchase, userZetBalance, isNavigating]);

  const handlePurchase = async () => {
    if (!productData || !postId) return;

    const purchaseRequest: PurchaseRequest = {
      postId: productData.postId,
      sellerId: productData.sellerId,
      totalZet: productData.totalPrice,
      sellMobileDataAmountGB: productData.sellMobileDataCapacityGb,
    };

    await executePurchase(purchaseRequest);
    queryClient.invalidateQueries({ queryKey: queryKeys.myInfo() });
  };

  const handleErrorRetry = () => {
    analytics.event('error_recovery_retry_clicked', {
      post_id: postId?.toString() || '',
    });
    reset();
    handlePurchase();
  };

  const handleConfirm = async () => {
    analytics.event('purchase_completed_confirmed', {
      post_id: postId?.toString() || '',
    });
    setIsNavigating(true);
    router.push('/exchange');
  };

  const handleGoBack = () => {
    router.push('/exchange');
  };

  if (isLoading) return <Loading />;

  if (error || !productData) {
    return (
      <>
        <Title title="데이터 구매하기" iconVariant="back" />
        <div className="flex flex-col items-center px-4">
          <p className="text-red-400 text-center mb-4" role="alert">
            {error}
          </p>
          <Button variant="secondary" onClick={handleGoBack}>
            거래소로 돌아가기
          </Button>
        </div>
      </>
    );
  }

  // 에러 복구가 필요한 경우
  if (needsRecovery) {
    const errorMessage =
      state.status === 'error_recovery' || state.status === 'failed'
        ? state.error
        : '구매 중 오류가 발생했습니다.';

    const errorType =
      state.status === 'error_recovery' || state.status === 'failed'
        ? state.errorType
        : PurchaseErrorType.NETWORK_ERROR;

    return (
      <PurchaseErrorRecovery
        error={errorMessage}
        errorType={errorType}
        postId={postId?.toString() || ''}
        onRetry={handleErrorRetry}
        canRetry={true}
      />
    );
  }

  if (state.status === 'success') {
    return (
      <>
        <Title title="데이터 구매하기" iconVariant="back" />

        <main className="flex flex-col items-center text-white text-center">
          <div className="mb-8">
            <Image
              src={IMAGE_PATHS['PURCHASE_COMPLETED']}
              width={200}
              height={200}
              alt="데이터 전송 완료를 나타내는 일러스트"
            />
          </div>

          <h1 className="text-2xl font-bold mb-6">전송 완료!</h1>
          <p className="text-lg leading-relaxed mb-6">
            총{' '}
            <span className="font-bold text-cyan-300">
              {productData.sellMobileDataCapacityGb}GB
            </span>
            가 해당 번호로
            <br />
            안전하게 전송되었습니다.
          </p>
          <p className="text-base mb-4">즐거운 데이터 여행 되세요 🚀</p>

          <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4 mb-6">
            <p className="text-green-300 text-sm">
              구매 완료! 남은 ZET: {state.data?.content?.zetAsset ?? userZetBalance}
            </p>
          </div>

          <footer className="pb-8">
            <Button size="full-width" variant="primary" onClick={handleConfirm}>
              확인
            </Button>
          </footer>
        </main>
      </>
    );
  }

  // 구매 확인 화면
  const hasEnoughZet = userZetBalance >= productData.totalPrice;
  const canPurchase = productData.status === 'SELLING' && hasEnoughZet;

  return (
    <>
      <Title title="데이터 구매하기" iconVariant="back" />

      <>
        <section
          className="flex flex-col items-center justify-center flex-1"
          aria-labelledby="purchase-section"
        >
          <div className="flex justify-center mb-8">
            <Image
              src={IMAGE_PATHS['DATA_CUBE']}
              width={150}
              height={150}
              alt="구매 진행을 나타내는 데이터 큐브 이미지"
              className={state.status === 'processing' ? 'animate-pulse' : ''}
            />
          </div>

          {state.status === 'processing' && (
            <div className="text-center text-white mb-6" aria-live="polite">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mx-auto mb-2" />
              <p className="text-lg font-semibold">구매를 진행하고 있습니다...</p>
              <p className="text-sm text-gray-300">잠시만 기다려주세요.</p>
            </div>
          )}

          {state.status === 'retrying' && (
            <div className="text-center text-white mb-6" aria-live="polite">
              <div className="animate-bounce text-4xl mb-4">🔄</div>
              <p className="text-lg font-bold text-yellow-300">재시도 중... ({state.attempt}/3)</p>
              <p className="text-sm text-gray-300">{state.nextRetryIn}초 후 다시 시도합니다</p>
              <div className="w-full bg-gray-700 rounded-full h-2 mt-4">
                <div
                  className="bg-yellow-500 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${((2 - state.nextRetryIn) / 2) * 100}%` }}
                />
              </div>
              <p className="text-xs text-gray-400 mt-2">⚡ 네트워크 오류시 자동으로 재시도됩니다</p>
            </div>
          )}

          <article
            className="w-full bg-gray-800 rounded-lg p-6 mb-8"
            aria-labelledby="purchase-info"
          >
            <h2 id="purchase-info" className="text-white text-lg font-bold mb-4 text-center">
              구매 정보 확인
            </h2>
            <dl className="text-white space-y-3">
              <div className="flex justify-between">
                <dt>상품명:</dt>
                <dd>{productData.title}</dd>
              </div>
              <div className="flex justify-between">
                <dt>데이터 용량:</dt>
                <dd className="text-cyan-300 font-bold">
                  {productData.sellMobileDataCapacityGb}GB
                </dd>
              </div>
              <div className="flex justify-between">
                <dt>통신사:</dt>
                <dd>{productData.carrier}</dd>
              </div>
              <div className="border-t border-gray-600 pt-3 mt-3">
                <div className="flex justify-between text-lg">
                  <dt>총 결제 금액:</dt>
                  <dd className="text-cyan-300 font-bold">{productData.totalPrice}ZET</dd>
                </div>
              </div>
              <div className="flex justify-between text-sm">
                <dt>내 ZET 잔액:</dt>
                <dd className={hasEnoughZet ? 'text-green-400' : 'text-red-400'}>
                  {userZetBalance}ZET
                </dd>
              </div>
            </dl>
          </article>

          {state.status === 'idle' && (
            <aside role="note" className="text-center text-gray-400 text-sm px-4 mb-6">
              <p>
                ※ 구매 후 취소가 불가능합니다.
                <br />⚡ 네트워크 오류 시 자동으로 3회 재시도됩니다.
              </p>
            </aside>
          )}
        </section>

        <footer className="py-4">
          <Button
            size="full-width"
            variant="primary"
            onClick={handlePurchase}
            disabled={!canPurchase || state.status !== 'idle'}
            aria-disabled={!canPurchase || state.status !== 'idle'}
            className={
              !canPurchase || state.status !== 'idle' ? 'opacity-50 cursor-not-allowed' : ''
            }
          >
            {(() => {
              if (state.status === 'processing') return '구매 진행 중...';
              if (state.status === 'retrying') return `재시도 중... (${state.attempt}/3)`;
              if (!hasEnoughZet) return 'ZET 잔액 부족';
              if (productData.status !== 'SELLING') return '판매 중지된 상품';
              return `${productData.totalPrice}ZET로 구매하기`;
            })()}
          </Button>
        </footer>
      </>
    </>
  );
}

export default function Step3Page() {
  return (
    <Suspense fallback={<Loading />}>
      <Step3Content />
    </Suspense>
  );
}
