'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { IMAGE_PATHS } from '@/constants/images';
import { Title, Button } from '@/shared';

export default function Step3Page() {
  const router = useRouter();

  // TODO: API로 상품 정보 가져오기
  const productData = {
    amount: '3GB',
  };

  const handleConfirm = () => {
    router.push('/exchange');
  };

  return (
    <div className="flex flex-col h-full px-4">
      <Title title="데이터 구매하기" iconVariant="back" />
      <div>
        {/* 캐릭터 이미지 */}
        <div className="flex justify-center mt-12 mb-8">
          <Image
            src={IMAGE_PATHS['PURCHASE_COMPLETED']}
            width={200}
            height={200}
            alt="purchase-completed"
          />
        </div>

        {/* 완료 제목 */}
        <div className="text-center text-white mb-6">
          <h1 className="text-2xl font-bold mb-6">전송 완료!</h1>
        </div>

        {/* 메인 메시지 */}
        <div className="text-center text-white mb-6">
          <p className="text-lg leading-relaxed">
            총 <span className="font-bold text-cyan-300">{productData.amount}</span>가 해당 번호로
            <br />
            안전하게 전송되었습니다.
          </p>
        </div>

        {/* 추가 메시지 */}
        <div className="text-center text-white">
          <p className="text-base">즐거운 데이터 여행 되세요 🚀</p>
        </div>
      </div>
      {/* 확인 버튼 */}
      <Button size="full-width" variant="primary" onClick={handleConfirm} className="mt-auto mb-8">
        확인
      </Button>
    </div>
  );
}
