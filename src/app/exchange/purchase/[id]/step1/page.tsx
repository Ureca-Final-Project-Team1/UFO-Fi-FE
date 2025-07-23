'use client';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';

import { IMAGE_PATHS } from '@/constants/images';
import { Title, Button } from '@/shared';

export default function Step1Page() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  // TODO: API로 상품 정보 가져오기
  const productData = {
    price: 30, // ZET 가격
  };

  const handleNext = () => {
    router.push(`/exchange/purchase/${id}/step2`);
  };

  return (
    <div className="flex flex-col h-full px-4">
      <Title title="데이터 구매하기" iconVariant="back" />
      <div className="flex flex-col items-center justify-center flex-1">
        {/* 코인 이미지 */}
        <div className="flex justify-center mb-8">
          <Image src={IMAGE_PATHS['PURCHASE_COIN']} width={150} height={150} alt="zet-coin" />
        </div>

        {/* 가격 정보 */}
        <div className="text-3xl text-center text-white mb-8">
          <p className="mb-2">이 데이터의 가격은</p>
          <p className="mb-6">
            <span className="font-bold text-cyan-300">{productData.price}ZET</span>
            <span className="text-white"> 입니다.</span>
          </p>
        </div>

        {/* 결제 확인 문구 */}
        <div className="text-center text-white mb-8">
          <p className="text-xl font-bold">결제를 진행하시겠습니까?</p>
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

      {/* 다음 버튼 */}
      <Button size="full-width" variant="primary" onClick={handleNext} className="mt-auto mb-8">
        다음
      </Button>
    </div>
  );
}
