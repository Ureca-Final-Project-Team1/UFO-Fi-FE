'use client';
import Image from 'next/image';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

import { exchangeAPI, purchaseAPI } from '@/api';
import type { ExchangePost } from '@/api/types/exchange';
import { IMAGE_PATHS } from '@/constants/images';
import { Button, TitleWithRouter } from '@/shared';
import { analytics } from '@/utils/analytics';

export default function Step3Page() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const id = params.id as string;
  const isFirstPurchase = searchParams.get('first') === 'true';

  const [productData, setProductData] = useState<ExchangePost | null>(null);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [purchaseCompleted, setPurchaseCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const postsResponse = await exchangeAPI.getPosts({ size: 50 });
        const product = postsResponse.posts.find((post) => post.postId === parseInt(id));

        if (!product) {
          throw new Error('상품을 찾을 수 없습니다.');
        }

        setProductData(product);

        // Step3 도달 이벤트
        analytics.event('purchase_step3_viewed', {
          post_id: id,
          data_amount: `${product.sellMobileDataCapacityGb}GB`,
          total_price: product.totalPrice,
          is_first_purchase: isFirstPurchase,
        });
      } catch (err) {
        console.error('상품 정보 조회 실패:', err);
        setError('상품 정보를 불러올 수 없습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductData();
  }, [id, isFirstPurchase]);

  const handlePurchase = async () => {
    if (!productData || isPurchasing) return;

    setIsPurchasing(true);

    try {
      // 구매 API 호출
      const purchaseRequest = {
        postId: productData.postId,
        sellerId: productData.sellerId,
        totalZet: productData.totalPrice,
        sellMobileDataAmountGB: productData.sellMobileDataCapacityGb,
      };

      await purchaseAPI.purchase(purchaseRequest);

      // 구매 성공 이벤트
      analytics.track.purchase(
        `purchase_${productData.postId}_${Date.now()}`,
        productData.totalPrice,
        [
          {
            item_id: productData.postId.toString(),
            item_name: productData.title,
            category: 'mobile_data',
            quantity: 1,
            price: productData.totalPrice,
          },
        ],
      );

      // 첫 구매 이벤트
      if (isFirstPurchase) {
        analytics.event('first_purchase_completed', {
          post_id: id,
          data_amount: `${productData.sellMobileDataCapacityGb}GB`,
          total_price: productData.totalPrice,
          seller_id: productData.sellerId,
        });
      }

      setPurchaseCompleted(true);
    } catch (err) {
      // 구매 실패 이벤트
      analytics.track.errorOccurred(
        'purchase_failed',
        err instanceof Error ? err.message : '구매 실패',
      );

      const errorMessage = err instanceof Error ? err.message : '구매 중 오류가 발생했습니다.';
      setError(errorMessage);
      alert(errorMessage);
    } finally {
      setIsPurchasing(false);
    }
  };

  const handleConfirm = () => {
    // 구매 완료 확인 이벤트
    analytics.event('purchase_completed_confirmed', {
      post_id: id,
    });

    router.push('/exchange');
  };

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

  if (error || !productData) {
    return (
      <div className="flex flex-col min-h-full items-center justify-center">
        <TitleWithRouter title="데이터 구매하기" iconVariant="back" />
        <p className="text-red-400 text-center mb-4">{error}</p>
        <Button variant="secondary" onClick={() => router.back()}>
          돌아가기
        </Button>
      </div>
    );
  }

  // 구매 완료 화면
  if (purchaseCompleted) {
    return (
      <div className="flex flex-col min-h-full">
        <TitleWithRouter title="데이터 구매하기" iconVariant="back" />

        {/* 중앙 컨텐츠 */}
        <div className="flex flex-col items-center justify-center flex-1 text-white text-center">
          <div className="mb-8">
            <Image
              src={IMAGE_PATHS['PURCHASE_COMPLETED']}
              width={200}
              height={200}
              alt="purchase-completed"
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

          {/* 첫 구매 축하 메시지 */}
          {isFirstPurchase && (
            <div className="w-full bg-green-100 rounded-lg p-4 mb-6">
              <p className="text-green-800 text-center font-medium">
                🎉 첫 구매 완료를 축하합니다!
                <br />
                앞으로도 UFO-Fi와 함께 해주세요.
              </p>
            </div>
          )}

          <p className="text-base">즐거운 데이터 여행 되세요 🚀</p>
        </div>

        {/* 하단 고정 버튼 */}
        <div className="sticky bottom-0 bg-inherit py-8">
          <Button size="full-width" variant="primary" onClick={handleConfirm}>
            확인
          </Button>
        </div>
      </div>
    );
  }

  // 구매 진행 화면
  return (
    <div className="flex flex-col min-h-full w-full">
      <TitleWithRouter title="데이터 구매하기" iconVariant="back" />

      {/* 중앙 컨텐츠 */}
      <div className="flex flex-col items-center justify-center">
        {/* 데이터 큐브 이미지 */}
        <div className="flex justify-center mb-8">
          <Image
            src={IMAGE_PATHS['DATA_CUBE']}
            width={150}
            height={150}
            alt="data-cube"
            className={isPurchasing ? 'animate-pulse' : ''}
          />
        </div>

        {/* 구매 정보 */}
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
            <div className="flex justify-between">
              <span>네트워크:</span>
              <span>{productData.mobileDataType}</span>
            </div>
            <div className="border-t border-gray-600 pt-3 mt-3">
              <div className="flex justify-between text-lg">
                <span>총 결제 금액:</span>
                <span className="text-cyan-300 font-bold">{productData.totalPrice}ZET</span>
              </div>
            </div>
          </div>
        </div>

        {/* 구매 진행 메시지 */}
        {isPurchasing && (
          <div className="text-center text-white mb-6">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mx-auto mb-2"></div>
            <p className="text-lg">구매를 진행하고 있습니다...</p>
            <p className="text-sm text-gray-300">잠시만 기다려주세요.</p>
          </div>
        )}

        {/* 주의사항 */}
        {!isPurchasing && (
          <div className="text-center text-gray-400 text-sm px-4">
            <p>
              ※ 구매 후 취소가 불가능합니다.
              <br />
              데이터는 즉시 전송되며, ZET는 판매자에게 자동 정산됩니다.
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
          disabled={isPurchasing}
          className={isPurchasing ? 'opacity-50 cursor-not-allowed' : ''}
        >
          {isPurchasing ? '구매 진행 중...' : `${productData.totalPrice}ZET로 구매하기`}
        </Button>
      </div>
    </div>
  );
}
