'use client';

import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';

import { IMAGE_PATHS } from '@/constants/images';
import { useUserRole } from '@/features/signup/hooks/useUserRole';
import { Button, Loading, Title } from '@/shared';
import { usePurchaseFlowStore } from '@/stores/usePurchaseFlowStore';
import { analytics } from '@/utils/analytics';

function Step2Content() {
  const router = useRouter();
  const params = useParams();
  const { phoneNumber } = useUserRole();
  const { productData, isFirstPurchase } = usePurchaseFlowStore();

  const [postId, setPostId] = useState<number | null>(null);
  const [isChecked, setIsChecked] = useState(false);
  const [userPhoneNumber, setUserPhoneNumber] = useState('');
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

  // Store 데이터 확인 및 초기화
  useEffect(() => {
    if (!postId) return;

    if (productData && productData.postId === postId) {
      // Store에 데이터가 있다면 사용
      setUserPhoneNumber(phoneNumber ?? '전화번호 없음');
      setIsLoading(false);

      // 애널리틱스 이벤트
      analytics.event('purchase_step2_viewed', {
        post_id: postId!.toString(),
        data_amount: `${productData.sellMobileDataCapacityGb}GB`,
        is_first_purchase: isFirstPurchase,
      });
    } else {
      // 거래소로 리다이렉트
      setError('상품 정보가 없습니다. 거래소에서 다시 선택해주세요.');
      setIsLoading(false);
    }
  }, [postId, productData, isFirstPurchase, phoneNumber]);

  const handleNext = () => {
    if (!isChecked || !productData || !postId) return;

    analytics.event('purchase_step2_completed', {
      post_id: postId.toString(),
      phone_number_confirmed: true,
      data_amount: `${productData.sellMobileDataCapacityGb}GB`,
    });

    router.push(`/exchange/purchase/${postId}/step3`);
  };

  const handleEditProfile = () => {
    // 프로필 수정 페이지 추적
    analytics.track.buttonClick('edit_phone_number', 'purchase_flow');
    router.push('/mypage');
  };

  const handleGoBack = () => {
    router.push('/exchange');
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error || !productData) {
    return (
      <>
        <Title title="데이터 구매하기" iconVariant="back" />
        <div className="flex flex-col">
          <p className="text-red-400 text-center mb-4">
            {error || '상품 정보를 불러올 수 없습니다.'}
          </p>
          <Button type="button" variant="secondary" onClick={handleGoBack}>
            거래소로 돌아가기
          </Button>
        </div>
      </>
    );
  }

  return (
    <>
      <Title title="데이터 구매하기" iconVariant="back" />

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
          개인정보가 다르면 마이페이지에서
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
                post_id: postId?.toString() || '',
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

      <div className="py-4 flex-shrink-0">
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
    </>
  );
}

export default function Step2Page() {
  return (
    <Suspense fallback={<Loading />}>
      <Step2Content />
    </Suspense>
  );
}
