'use client';

import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { purchaseHistory } from '@/api/services/history/purchaseHistory';
import { ICON_PATHS } from '@/constants/icons';
import { IMAGE_PATHS } from '@/constants/images';
import { Title, Icon, Button, Loading } from '@/shared';
import { analytics } from '@/utils/analytics';

export default function PurchasePage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAndRedirect = async () => {
      try {
        // 구매 내역 조회하여 첫 구매 여부 확인
        const history = await purchaseHistory();
        const isFirstPurchase = !history || history.length === 0;

        if (!isFirstPurchase) {
          // 기존 구매자는 step1으로 바로 리다이렉트
          router.replace(`/exchange/purchase/${id}/step1`);
          return;
        }

        // 첫 구매자라면 애널리틱스 이벤트 전송
        analytics.track.featureUsed('first_purchase_flow', 'started');
        setIsLoading(false);
      } catch (error) {
        console.error('구매 내역 조회 실패:', error);
        // 에러 시에도 step1으로 리다이렉트
        router.replace(`/exchange/purchase/${id}/step1`);
      }
    };

    checkAndRedirect();
  }, [id, router]);

  const handleContinue = () => {
    // 구매 플로우 시작 이벤트
    analytics.event('purchase_flow_started', {
      post_id: id,
      is_first_purchase: true,
    });

    router.push(`/exchange/purchase/${id}/step1`);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col items-center min-h-full px-4">
      <Title title="데이터 구매하기" iconVariant="back" />

      {/* 안내 텍스트 */}
      <div className="w-full text-white mt-6 mb-8">
        <p className="text-2xl font-semibold leading-relaxed">
          이 거래는 <br /> UFO-Fi가 중개합니다.
        </p>
      </div>

      {/* UFO-Fi 카드 */}
      <div className="relative flex justify-center mb-2">
        <div className="relative">
          <div className="w-80 bg-white rounded-lg p-3 shadow-lg">
            <div className="flex items-center gap-2 mb-2">
              <Image src={ICON_PATHS['UFO_LOGO']} width={30} height={30} alt="ufo" />
              <p className="text-black font-semibold">UFO-Fi</p>
            </div>
            <h3 className="text-black text-center text-md font-medium">
              유포파이에게 데이터 중개 맡기세요!
            </h3>
          </div>
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-72 h-16 bg-gray-400 rounded-lg -z-10"></div>
        </div>
      </div>

      {/* 캐릭터 이미지 */}
      <Image src={IMAGE_PATHS['AL_COMPLETE']} width={150} height={150} alt="alien-complete" />

      {/* 설명 목록 */}
      <div className="w-full text-white">
        <div className="space-y-3 mb-6">
          <div className="flex items-start gap-3">
            <Icon name="FilePenLine" className="text-green-500 flex-shrink-0 mt-1" alt="check" />
            <p className="text-base leading-relaxed">
              ZET 결제 후, 플랫폼이 대신 데이터를 전송합니다.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <Icon name="FilePenLine" className="text-green-500 flex-shrink-0 mt-1" alt="check" />
            <p className="text-base leading-relaxed">
              통신사의 데이터 선물하기 기능을 활용한 안전한 전송입니다.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <Icon name="FilePenLine" className="text-green-500 flex-shrink-0 mt-1" alt="check" />
            <p className="text-base leading-relaxed">ZET는 자동으로 판매자에게 정산됩니다.</p>
          </div>
        </div>

        {/* 주의사항 */}
        <p className="text-sm text-gray-300 leading-relaxed">
          ※ UFO-Fi는 안전한 중개를 위해 거래 데이터를 자동 기록하며, 직접 송금·환불을 지원하지
          않습니다.
        </p>
      </div>

      {/* 확인 버튼 */}
      <Button size="full-width" variant="primary" onClick={handleContinue} className="mt-auto my-8">
        이해했어요
      </Button>
    </div>
  );
}
