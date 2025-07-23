'use client';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

import { ICON_PATHS } from '@/constants/icons';
import { IMAGE_PATHS } from '@/constants/images';
import { Title, Icon, Button } from '@/shared';

export default function PurchasePage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const handleContinue = () => {
    // 첫 구매 여부 확인 후 다음 단계로 이동
    // TODO: API로 사용자 구매 이력 확인
    router.push(`/exchange/purchase/${id}/step1`);
  };

  return (
    <div className="flex flex-col items-center px-4 pb-6">
      <Title title="데이터 구매하기" iconVariant="back" />

      {/* 안내 텍스트 */}
      <div className="w-full text-white mt-6 mb-8">
        <p className="text-2xl font-semibold leading-relaxed">
          이 거래는 <br /> UFO-Fi가 중개합니다.
        </p>
      </div>

      {/* UFO-Fi 카드 */}
      <div className="relative flex justify-center mb-8">
        <div className="relative">
          <div className="w-80 bg-white rounded-lg p-4 shadow-lg">
            <div className="flex items-center gap-2 mb-2">
              <Image src={ICON_PATHS['UFO_LOGO']} width={30} height={30} alt="ufo" />
              <p className="text-black font-semibold">UFO-Fi</p>
            </div>
            <h3 className="text-black text-center text-lg font-medium">
              유포파이에게 데이터 중개 맡기세요!
            </h3>
          </div>
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-72 h-16 bg-gray-400 rounded-lg -z-10"></div>
        </div>
      </div>

      {/* 캐릭터 이미지 */}
      <Image
        src={IMAGE_PATHS['AL_COMPLETE']}
        width={150}
        height={150}
        alt="alien-complete"
        className="mb-6"
      />

      {/* 설명 목록 */}
      <div className="w-full text-white mb-8">
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
      <Button size="full-width" variant="primary" onClick={handleContinue} className="mt-auto">
        이해했어요
      </Button>
    </div>
  );
}
