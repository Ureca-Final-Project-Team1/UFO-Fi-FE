'use client';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

import { exchangeAPI, purchaseHistory } from '@/api';
import type { ExchangePost } from '@/api/types/exchange';
import { IMAGE_PATHS } from '@/constants/images';
import { useUserRole } from '@/features/signup/hooks/useUserRole';
import { Button, TitleWithRouter } from '@/shared';
import { analytics } from '@/utils/analytics';

export default function Step2Page() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const { phoneNumber } = useUserRole();

  const [isChecked, setIsChecked] = useState(false);
  const [productData, setProductData] = useState<ExchangePost | null>(null);
  const [userPhoneNumber, setUserPhoneNumber] = useState('');
  const [, setIsFirstPurchase] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 상품 정보와 구매 내역 조회
        const [postsResponse, history] = await Promise.all([
          exchangeAPI.getPosts({ size: 50 }),
          purchaseHistory(),
        ]);

        const product = postsResponse.posts.find((post) => post.postId === parseInt(id));

        if (!product) {
          throw new Error('상품을 찾을 수 없습니다.');
        }

        // 첫 구매 여부 확인
        const isFirst = !history || history.length === 0;

        setProductData(product);
        setIsFirstPurchase(isFirst);

        // 사용자 전화번호 설정
        const userPhoneNumber = phoneNumber;
        setUserPhoneNumber(userPhoneNumber ?? '전화번호 없음');

        // 애널리틱스 이벤트
        analytics.event('purchase_step2_viewed', {
          post_id: id,
          data_amount: `${product.sellMobileDataCapacityGb}GB`,
          is_first_purchase: isFirst,
        });
      } catch (error) {
        console.error('데이터 조회 실패:', error);
        router.back();
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id, phoneNumber, router]);

  const handleNext = () => {
    if (isChecked && productData) {
      analytics.event('purchase_step2_completed', {
        post_id: id,
        phone_number_confirmed: true,
        data_amount: `${productData.sellMobileDataCapacityGb}GB`,
      });

      router.push(`/exchange/purchase/${id}/step3`);
    }
  };

  const handleEditProfile = () => {
    // 프로필 수정 페이지 추적
    analytics.track.buttonClick('edit_phone_number', 'purchase_flow');
    router.push('/mypage');
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center h-full px-4">
        <TitleWithRouter title="데이터 구매하기" iconVariant="back" />
        <div className="flex items-center justify-center flex-1">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
        </div>
      </div>
    );
  }

  if (!productData) {
    return (
      <div className="flex flex-col justify-center items-center w-full min-h-full px-4">
        <TitleWithRouter title="데이터 구매하기" iconVariant="back" />
        <div className="flex flex-col flex-1">
          <p className="text-red-400 text-center mb-4">상품 정보를 불러올 수 없습니다.</p>
          <Button variant="secondary" onClick={() => router.back()}>
            돌아가기
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center h-full px-4">
      <TitleWithRouter title="데이터 구매하기" iconVariant="back" />

      {/* 데이터 큐브 이미지 */}
      <div className="flex justify-center mt-12 mb-8">
        <Image src={IMAGE_PATHS['DATA_CUBE']} width={150} height={150} alt="data-cube" />
      </div>

      {/* 메인 텍스트 */}
      <div className="text-center text-white mb-6">
        <p className="text-xl leading-relaxed">
          UFO-Fi 데이터 중개소에서
          <br />총{' '}
          <span className="font-bold text-cyan-300">{productData.sellMobileDataCapacityGb}GB</span>
          를 전송합니다.
        </p>
      </div>

      {/* 전화번호 */}
      <div className="text-center mb-4">
        <p className="text-3xl font-bold text-cyan-300">{userPhoneNumber || '전화번호 없음'}</p>
      </div>

      {/* 안내 문구 */}
      <div className="text-center text-gray-300 text-sm mb-4">
        <p>
          번호가 다르면 마이페이지에서
          <br />
          수정 후 다시 시도해주세요.
        </p>
      </div>

      {/* 수정하러 가기 버튼 */}
      <div className="flex justify-center mb-8">
        <Button variant="following-button" onClick={handleEditProfile} className="px-6 py-2">
          수정하러 가기
        </Button>
      </div>

      {/* 체크박스 */}
      <div className="mb-8">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={(e) => {
              setIsChecked(e.target.checked);

              // 체크박스 상태 변경 추적
              analytics.event('purchase_agreement_toggled', {
                post_id: id,
                agreed: e.target.checked,
              });
            }}
            className="w-5 h-5 accent-blue-500 appearance-auto"
          />
          <span className="text-white text-sm leading-relaxed">
            해당 번호로 데이터를 전송하는 것에 대해 동의함.
          </span>
        </label>
      </div>

      {/* 상품 정보 요약 */}
      <div className="w-full bg-gray-800 rounded-lg p-4 mb-6">
        <div className="text-white text-sm space-y-2">
          <div className="flex justify-between">
            <span>상품명</span>
            <span>{productData.title}</span>
          </div>
          <div className="flex justify-between">
            <span>용량</span>
            <span>{productData.sellMobileDataCapacityGb}GB</span>
          </div>
          <div className="flex justify-between">
            <span>통신사</span>
            <span>{productData.carrier}</span>
          </div>
          <div className="flex justify-between">
            <span>가격</span>
            <span className="text-cyan-300 font-bold">{productData.totalPrice}ZET</span>
          </div>
        </div>
      </div>

      {/* 다음 버튼 */}
      <Button
        size="full-width"
        variant="primary"
        onClick={handleNext}
        disabled={!isChecked}
        className={`mt-auto mb-8 ${!isChecked ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        다음
      </Button>
    </div>
  );
}
