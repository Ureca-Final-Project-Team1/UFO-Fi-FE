'use client';

import Image from 'next/image';
// import { useRouter } from 'next/navigation';

import { IMAGE_PATHS } from '@/constants/images';
import { Button, Title } from '@/shared';
import { useViewportStore } from '@/stores/useViewportStore';

export default function AccounSuccessPage() {
  // const router = useRouter();
  const isMobile = useViewportStore((state) => state.isMobile);

  return (
    <div className="flex flex-col h-full w-full">
      <Title title="" iconVariant="close" />
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <div
          className={`flex flex-col items-center text-center ${isMobile ? 'space-y-4' : 'space-y-6'}`}
        >
          <Image
            src={IMAGE_PATHS['PAYMENT_CHECK']}
            alt="계좌 등록 확인"
            width={isMobile ? 48 : 56}
            height={isMobile ? 48 : 56}
          />
          <p className={`${isMobile ? 'body-20-bold' : 'heading-24-bold'} text-white-600`}>
            계좌 등록과
            <br />
            간편결제 비밀번호 등록이
            <br />
            완료되었어요!
          </p>
        </div>
      </div>
      <div className="flex-shrink-0 p-6 pb-8">
        <Button size="full-width" variant="primary">
          확인
        </Button>
      </div>
    </div>
  );
}
