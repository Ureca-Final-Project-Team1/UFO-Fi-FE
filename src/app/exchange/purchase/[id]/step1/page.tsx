'use client';

import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';

import { IMAGE_PATHS } from '@/constants/images';
import { InsufficientZetModal } from '@/features/payment/components/InsufficientZetModal';
import { Button, Loading, Title } from '@/shared';
import { usePurchaseFlowStore } from '@/stores/usePurchaseFlowStore';
import { analytics } from '@/utils/analytics';

function Step1Content() {
  const router = useRouter();
  const params = useParams();
  const { productData, userZetBalance, isFirstPurchase } = usePurchaseFlowStore();

  const [postId, setPostId] = useState<number | null>(null);
  const [showZetModal, setShowZetModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
      setIsLoading(false);

      analytics.event('purchase_step1_viewed', {
        post_id: postId.toString(),
        product_price: productData.totalPrice,
        user_zet_balance: userZetBalance,
        is_first_purchase: isFirstPurchase,
      });
    } else {
      setError('상품 정보가 없습니다. 거래소에서 다시 선택해주세요.');
      setIsLoading(false);
    }
  }, [postId, productData, userZetBalance, isFirstPurchase]);

  const handleNext = () => {
    if (!productData || !postId) return;

    if (userZetBalance < productData.totalPrice) {
      analytics.event('purchase_insufficient_balance', {
        post_id: postId.toString(),
        required_zet: productData.totalPrice,
        user_zet: userZetBalance,
        deficit: productData.totalPrice - userZetBalance,
      });

      setShowZetModal(true);
      return;
    }

    analytics.event('purchase_step1_completed', {
      post_id: postId.toString(),
      product_price: productData.totalPrice,
    });

    router.push(`/exchange/purchase/${postId}/step2`);
  };

  const handleGoBack = () => {
    router.push('/exchange');
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error || !productData) {
    return (
      <div className="flex flex-col items-center justify-center h-full px-4">
        <Title title="데이터 구매하기" iconVariant="back" />
        <p className="text-red-400 text-center mb-4">{error}</p>
        <Button variant="secondary" onClick={handleGoBack} className="px-6 py-2">
          거래소로 돌아가기
        </Button>
      </div>
    );
  }

  const hasEnoughZet = userZetBalance >= productData.totalPrice;

  return (
    <div>
      <Title title="데이터 구매하기" iconVariant="back" />

      <div>
        {/* 코인 이미지 */}
        <div className="flex justify-center mb-8">
          <Image src={IMAGE_PATHS['PURCHASE_COIN']} width={150} height={150} alt="zet-coin" />
        </div>

        {/* 상품 정보 */}
        <div className="text-center text-white mb-6">
          <p className="text-lg mb-2">{productData.title}</p>
          <p className="text-sm text-gray-300 mb-4">
            {productData.sellMobileDataCapacityGb}GB • {productData.carrier} •{' '}
            {productData.mobileDataType}
          </p>
        </div>

        {/* 가격 정보 */}
        <div className="text-3xl text-center text-white mb-6">
          <p className="mb-2">이 데이터의 가격은</p>
          <p className="mb-6">
            <span className="font-bold text-cyan-300">{productData.totalPrice}ZET</span>
            <span className="text-white"> 입니다.</span>
          </p>
        </div>

        {/* ZET 잔액 정보 */}
        <div className="text-center mb-4">
          <p className="text-sm text-gray-300 mb-2">내 ZET 잔액</p>
          <p className={`text-lg font-bold ${hasEnoughZet ? 'text-green-400' : 'text-red-400'}`}>
            {userZetBalance}ZET
          </p>
        </div>

        {/* 구매 버튼 */}
        <div className="mt-8">
          <Button onClick={handleNext} disabled={!hasEnoughZet} className="w-full">
            {hasEnoughZet ? '다음 단계' : 'ZET 부족'}
          </Button>
        </div>

        {/* ZET 부족 모달 */}
        <InsufficientZetModal
          isOpen={showZetModal}
          onClose={() => setShowZetModal(false)}
          onCancel={() => setShowZetModal(false)}
          onGoToCharge={() => {
            setShowZetModal(false);
            router.push('/charge');
          }}
        />
      </div>
    </div>
  );
}

export default function Step1Page() {
  return (
    <Suspense fallback={<Loading />}>
      <Step1Content />
    </Suspense>
  );
}
