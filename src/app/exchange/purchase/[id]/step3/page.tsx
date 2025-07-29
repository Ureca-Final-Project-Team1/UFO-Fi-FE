'use client';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

import { exchangeAPI, myInfoAPI, purchaseHistory } from '@/api';
import { PurchaseErrorType } from '@/api/types/exchange';
import type { ExchangePost, PurchaseRequest } from '@/api/types/exchange';
import { IMAGE_PATHS } from '@/constants/images';
import { PurchaseErrorRecovery } from '@/features/purchase/components/PurchaseErrorRecovery';
import { usePurchaseRetry } from '@/features/purchase/hooks/usePurchaseRetry';
import { Button, TitleWithRouter } from '@/shared';
import { analytics } from '@/utils/analytics';

export default function SimpleEnhancedStep3Page() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  // 기본 데이터 상태
  const [productData, setProductData] = useState<ExchangePost | null>(null);
  const [userZet, setUserZet] = useState(0);
  const [isFirstPurchase, setIsFirstPurchase] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 통합된 구매 + 에러복구 훅
  const { state, executePurchase, reset, needsRecovery } = usePurchaseRetry({
    maxRetries: 3,
    onSuccess: (result) => {
      analytics.event('purchase_success', {
        post_id: id,
        is_first_purchase: isFirstPurchase,
        final_zet_balance: result.content?.zetAsset,
      });
    },
  });

  // 초기 데이터 로딩
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [postsResponse, userInfo, history] = await Promise.all([
          exchangeAPI.getPosts({ size: 50 }),
          myInfoAPI.get(),
          purchaseHistory(),
        ]);

        const product = postsResponse.posts.find((post) => post.postId === parseInt(id));
        if (!product) {
          throw new Error('상품을 찾을 수 없습니다.');
        }

        setProductData(product);
        setUserZet(userInfo?.zetAsset || 0);
        setIsFirstPurchase(!history || history.length === 0);

        analytics.event('purchase_step3_viewed', {
          post_id: id,
          is_first_purchase: !history || history.length === 0,
          product_price: product.totalPrice,
          user_zet: userInfo?.zetAsset || 0,
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : '데이터를 불러올 수 없습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handlePurchase = async () => {
    if (!productData) return;

    const purchaseRequest: PurchaseRequest = {
      postId: productData.postId,
      sellerId: productData.sellerId,
      totalZet: productData.totalPrice,
      sellMobileDataAmountGB: productData.sellMobileDataCapacityGb,
    };

    await executePurchase(purchaseRequest);
  };

  const handleErrorRetry = () => {
    analytics.event('error_recovery_retry_clicked', {
      post_id: id,
    });

    reset(); // 상태 초기화
    handlePurchase(); // 다시 구매 시도
  };

  const handleConfirm = () => {
    analytics.event('purchase_completed_confirmed', { post_id: id });
    router.push('/exchange');
  };

  // 로딩 중
  if (isLoading) {
    return (
      <div className="flex flex-col min-h-full px-4">
        <TitleWithRouter title="데이터 구매하기" iconVariant="back" />
        <div className="flex items-center justify-center flex-1">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
        </div>
      </div>
    );
  }

  // 초기 에러
  if (error || !productData) {
    return (
      <div className="flex flex-col min-h-full items-center justify-center px-4">
        <TitleWithRouter title="데이터 구매하기" iconVariant="back" />
        <p className="text-red-400 text-center mb-4">{error}</p>
        <Button variant="secondary" onClick={() => router.back()}>
          돌아가기
        </Button>
      </div>
    );
  }

  // 구매 완료 화면
  if (state.status === 'success') {
    return (
      <div className="flex flex-col min-h-full">
        <TitleWithRouter title="데이터 구매하기" iconVariant="back" />

        <div className="flex flex-col items-center justify-center flex-1 text-white text-center">
          <div className="mb-8">
            <Image
              src={IMAGE_PATHS['PURCHASE_COMPLETED']}
              width={200}
              height={200}
              alt="purchase-completed"
            />
          </div>

          <h1 className="text-2xl font-bold mb-6">🎉 전송 완료!</h1>

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

          {/* 성공 시 다시 보유 제트를 안내 */}
          <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4 mb-6">
            <p className="text-green-300 text-sm">
              구매 완료! 남은 ZET: {state.data?.content?.zetAsset || userZet}
            </p>
          </div>
        </div>

        <div className="pb-8">
          <Button size="full-width" variant="primary" onClick={handleConfirm}>
            확인
          </Button>
        </div>
      </div>
    );
  }

  const hasEnoughZet = userZet >= productData.totalPrice;
  const canPurchase = productData.status === 'SELLING' && hasEnoughZet;

  return (
    <>
      <div className="flex flex-col min-h-full w-full px-4">
        <TitleWithRouter title="데이터 구매하기" iconVariant="back" />

        <div className="flex flex-col items-center justify-center flex-1">
          {/* 데이터 큐브 이미지 */}
          <div className="flex justify-center mb-8">
            <Image
              src={IMAGE_PATHS['DATA_CUBE']}
              width={150}
              height={150}
              alt="data-cube"
              className={state.status === 'processing' ? 'animate-pulse' : ''}
            />
          </div>

          {/* 구매 진행 상태 표시 */}
          {state.status === 'processing' && (
            <div className="text-center text-white mb-6">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mx-auto mb-2"></div>
              <p className="text-lg">구매를 진행하고 있습니다...</p>
              <p className="text-sm text-gray-300">잠시만 기다려주세요.</p>
            </div>
          )}

          {state.status === 'retrying' && (
            <div className="text-center text-white mb-6">
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

          {/* 구매 정보 카드 */}
          <div className="w-full bg-gray-800 rounded-lg p-6 mb-8">
            <h2 className="text-white text-lg font-bold mb-4 text-center">구매 정보 확인</h2>
            <div className="text-white space-y-3">
              <div className="flex justify-between">
                <span>상품명:</span>
                <span>{productData.title}</span>
              </div>
              <div className="flex justify-between">
                <span>데이터 용량:</span>
                <span className="text-cyan-300 font-bold">
                  {productData.sellMobileDataCapacityGb}GB
                </span>
              </div>
              <div className="flex justify-between">
                <span>통신사:</span>
                <span>{productData.carrier}</span>
              </div>
              <div className="border-t border-gray-600 pt-3 mt-3">
                <div className="flex justify-between text-lg">
                  <span>총 결제 금액:</span>
                  <span className="text-cyan-300 font-bold">{productData.totalPrice}ZET</span>
                </div>
              </div>
              <div className="flex justify-between text-sm">
                <span>내 ZET 잔액:</span>
                <span className={hasEnoughZet ? 'text-green-400' : 'text-red-400'}>
                  {userZet}ZET
                </span>
              </div>
            </div>
          </div>

          {/* 주의사항 */}
          {state.status === 'idle' && (
            <div className="text-center text-gray-400 text-sm px-4 mb-6">
              <p>
                ※ 구매 후 취소가 불가능합니다.
                <br />⚡ 네트워크 오류 시 자동으로 3회 재시도됩니다.
              </p>
            </div>
          )}
        </div>

        {/* 하단 고정 구매 버튼 */}
        <div className="pb-8">
          <Button
            size="full-width"
            variant="primary"
            onClick={handlePurchase}
            disabled={!canPurchase || state.status !== 'idle'}
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
        </div>
      </div>

      {/* 에러 복구 오버레이 */}
      {needsRecovery && state.status === 'error_recovery' && (
        <PurchaseErrorRecovery
          error={state.error}
          errorType={state.errorType}
          postId={id}
          onRetry={handleErrorRetry}
          canRetry={
            state.errorType !== PurchaseErrorType.PRODUCT_UNAVAILABLE &&
            state.errorType !== PurchaseErrorType.INSUFFICIENT_BALANCE &&
            state.errorType !== PurchaseErrorType.PRODUCT_NOT_FOUND
          }
        />
      )}
    </>
  );
}
