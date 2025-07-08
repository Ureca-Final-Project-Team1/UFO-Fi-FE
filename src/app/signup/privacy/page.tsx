'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

import { Button, Icon } from '@/components';

const Page = () => {
  const router = useRouter();

  const handleNext = () => {
    router.push('/signup/verify');
  };

  return (
    <div className="flex flex-col justify-center items-center h-full w-full">
      <div className="flex flex-[0.9] flex-col justify-center items-center text-center gap-5 w-full h-full">
        <div className="flex flex-col gap-5 pb-5">
          <div className="body-20-bold">시작하기 전에</div>
          <div className="body-16-semibold">
            다음을 누르시면 UFO-Fi의
            <br />
            개인정보 처리방침에 동의한 것으로 간주합니다.
          </div>
        </div>

        <div className="caption-14-regular flex flex-col gap-10">
          <div className="flex flex-col items-center gap-3">
            <Icon name="ChartNoAxesColumn" alt="ChartNoAxesColumn" size="lg" color="yellow" />
            데이터 거래에 필요한 요금제 정보를 제공해요.
          </div>
          <div className="flex flex-col items-center gap-3">
            <Icon name="BellRing" alt="bell-ring" size="lg" color="yellow" />
            혜택과 거래 알림도 놓치지 않도록 알려드릴게요!
          </div>
        </div>
      </div>

      <Button
        onClick={handleNext}
        size="lg"
        className="body-16-medium w-full"
        style={{ backgroundColor: 'var(--color-primary-400)' }}
      >
        다음
      </Button>
    </div>
  );
};

export default Page;
