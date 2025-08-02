'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import '@/styles/globals.css';

import { Button, Icon } from '@/shared';

const Page = () => {
  const router = useRouter();

  const handleNext = () => {
    router.push('/signup/profile');
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center text-center gap-7 sm:gap-10 w-full h-full">
        <div className="flex flex-col gap-5 sm:gap-8 pb-5">
          <p className="body-20-bold">시작하기 전에</p>
          <p className="body-16-semibold">
            다음을 누르시면 UFO-Fi의
            <br />
            개인정보 처리방침에 동의한 것으로 간주합니다.
          </p>
        </div>

        <div className="flex flex-col gap-10 body-16-medium">
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
        size="full-width"
        className="body-16-medium h-10 sm:h-14 text-white"
      >
        다음
      </Button>
    </>
  );
};

export default Page;
