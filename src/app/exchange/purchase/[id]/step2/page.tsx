'use client';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

import { IMAGE_PATHS } from '@/constants/images';
import { Title, Button } from '@/shared';

export default function Step2Page() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [isChecked, setIsChecked] = useState(false);

  // TODO: API로 상품 정보 가져오기
  const productData = {
    amount: '3GB',
    phoneNumber: '010-1234-1234', // TODO: 구매자 번호 가져오기
  };

  const handleNext = () => {
    if (isChecked) {
      router.push(`/exchange/purchase/${id}/step3`);
    }
  };

  const handleEditProfile = () => {
    router.push('/mypage');
  };

  return (
    <div className="flex flex-col items-center h-full px-4">
      <Title title="데이터 구매하기" iconVariant="back" />

      {/* 데이터 큐브 이미지 */}
      <div className="flex justify-center mt-12 mb-8">
        <Image src={IMAGE_PATHS['DATA_CUBE']} width={150} height={150} alt="data-cube" />
      </div>

      {/* 메인 텍스트 */}
      <div className="text-center text-white mb-6">
        <p className="text-xl leading-relaxed">
          UFO-Fi 데이터 중개소에서
          <br />총 <span className="font-bold text-cyan-300">{productData.amount}</span>를
          전송합니다.
        </p>
      </div>

      {/* 전화번호 */}
      <div className="text-center mb-4">
        <p className="text-3xl font-bold text-cyan-300">{productData.phoneNumber}</p>
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
            onChange={(e) => setIsChecked(e.target.checked)}
            className="w-5 h-5 accent-blue-500 appearance-auto"
          />
          <span className="text-white text-sm leading-relaxed">
            해당 번호로 데이터를 전송하는 것에 대해 동의함.
          </span>
        </label>
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
