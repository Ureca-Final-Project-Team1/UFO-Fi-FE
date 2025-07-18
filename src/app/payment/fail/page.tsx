'use client';

import Image from 'next/image';

import { IMAGE_PATHS } from '@/constants/images';
import { Button, Icon, Title } from '@/shared/ui';
import { useViewportStore } from '@/stores/useViewportStore';

export default function PaymentFailPage() {
  const isMobile = useViewportStore((state) => state.isMobile);

  return (
    <div className="flex flex-col h-full w-full">
      <Title title="" iconVariant="close" />
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <div
          className={`flex flex-col items-center text-center ${isMobile ? 'space-y-4' : 'space-y-6'}`}
        >
          <Image src={IMAGE_PATHS['AL_FAIL']} alt="결제 실패" width={228} height={193} />
          <div
            className={`flex items-center justify-center gap-2 ${isMobile ? 'body-20-bold' : 'heading-24-bold'} text-white-600`}
          >
            <Icon name="TriangleAlert" color="yellow-400" />
            <span>결제 실패</span>
          </div>
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
