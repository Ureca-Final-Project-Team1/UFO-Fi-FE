'use client';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { exchangeAPI, myInfoAPI, purchaseHistory, type ExchangePost } from '@/api';
import { IMAGE_PATHS } from '@/constants/images';
import { InsufficientZetModal } from '@/features';
import { Button, Loading, Title, analytics } from '@/shared';

export default function Step1Page() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [showZetModal, setShowZetModal] = useState(false);

  const [productData, setProductData] = useState<ExchangePost | null>(null);
  const [userZet, setUserZet] = useState(0);
  const [, setIsFirstPurchase] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [postsResponse, userInfo, history] = await Promise.all([
          exchangeAPI.getPosts({ size: 50 }),
          myInfoAPI.get(),
          purchaseHistory(),
        ]);

        // ID로 해당 상품 찾기
        const product = postsResponse.posts.find((post) => post.postId === parseInt(id));

        if (!product) {
          throw new Error('상품을 찾을 수 없습니다.');
        }

        if (product.status !== 'SELLING') {
          throw new Error('판매 중인 상품이 아닙니다.');
        }

        // 첫 구매 여부 확인
        const isFirst = !history || history.length === 0;

        setProductData(product);
        setUserZet(userInfo?.zetAsset || 0);
        setIsFirstPurchase(isFirst);

        // 애널리틱스 이벤트
        analytics.event('purchase_step1_viewed', {
          post_id: id,
          product_price: product.totalPrice,
          user_zet_balance: userInfo?.zetAsset || 0,
          is_first_purchase: isFirst,
        });
      } catch (err) {
        console.error('데이터 조회 실패:', err);
        setError(err instanceof Error ? err.message : '데이터를 불러올 수 없습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleNext = () => {
    if (!productData) return;

    if (userZet < productData.totalPrice) {
      analytics.event('purchase_insufficient_balance', {
        post_id: id,
        required_zet: productData.totalPrice,
        user_zet: userZet,
        deficit: productData.totalPrice - userZet,
      });

      setShowZetModal(true);
      return;
    }

    analytics.event('purchase_step1_completed', {
      post_id: id,
      product_price: productData.totalPrice,
    });

    router.push(`/exchange/purchase/${id}/step2`);
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error || !productData) {
    return (
      <div className="flex flex-col items-center justify-center h-full px-4">
        <Title title="데이터 구매하기" iconVariant="back" />
        <p className="text-red-400 text-center mb-4">{error}</p>
        <Button variant="secondary" onClick={() => router.back()} className="px-6 py-2">
          돌아가기
        </Button>
      </div>
    );
  }

  const hasEnoughZet = userZet >= productData.totalPrice;

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
            {userZet}ZET
          </p>
          {!hasEnoughZet && (
            <p className="text-red-400 text-sm mt-2">{productData.totalPrice - userZet}ZET 부족</p>
          )}
        </div>

        {/* 결제 확인 문구 */}
        <div className="text-center text-white mb-8">
          <p className="text-xl font-bold">
            {hasEnoughZet ? '결제를 진행하시겠습니까?' : 'ZET 충전이 필요합니다'}
          </p>
        </div>

        {/* 주의사항 */}
        <div className="text-center text-gray-400 text-sm px-4">
          <p>
            ※ 결제 후 환불이 불가합니다.
            <br />
            중개소가 자동으로 판매자에게 ZET를 정산합니다.
          </p>
        </div>
      </div>

      <div className="my-6">
        {/* 다음 버튼 */}
        <Button
          size="full-width"
          type="button"
          variant="primary"
          onClick={handleNext}
          className="mt-auto"
          disabled={!hasEnoughZet}
        >
          {hasEnoughZet ? '다음' : 'ZET 충전하기'}
        </Button>
      </div>

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
  );
}
