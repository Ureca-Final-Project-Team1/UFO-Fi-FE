'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import '@/styles/globals.css';

import { Button, Icon } from '@/shared';

const PrivacyPage = () => {
  const router = useRouter();

  const handleNext = () => {
    router.push('/signup/profile');
  };

  return (
    <>
      <section
        aria-labelledby="privacy-intro-title"
        className="flex flex-col justify-center items-center text-center gap-7 sm:gap-10 w-full h-full"
      >
        <div className="flex flex-col gap-5 sm:gap-8 pb-5">
          <h2 id="privacy-intro-title" className="body-20-bold">
            시작하기 전에
          </h2>
          <p className="body-16-semibold">
            다음을 누르시면 <strong>UFO-Fi</strong>의
            <br />
            개인정보 처리방침에 동의한 것으로 간주합니다.
          </p>
        </div>

        <div className="flex flex-col gap-10 body-16-medium">
          <div className="flex flex-col items-center gap-3" role="note" aria-label="요금제 안내">
            <Icon name="ChartNoAxesColumn" alt="요금제 관련 아이콘" size="lg" color="yellow" />
            데이터 거래에 필요한 요금제 정보를 제공해요.
          </div>
          <div className="flex flex-col items-center gap-3" role="note" aria-label="알림 안내">
            <Icon name="BellRing" alt="알림 아이콘" size="lg" color="yellow" />
            혜택과 거래 알림도 놓치지 않도록 알려드릴게요!
          </div>
        </div>

        <nav className="w-full mt-10">
          <Button
            onClick={handleNext}
            size="full-width"
            className="body-16-medium h-10 sm:h-14 text-white"
            aria-label="회원가입 프로필 입력 화면으로 이동"
          >
            다음
          </Button>
        </nav>
      </section>
    </>
  );
};

export default PrivacyPage;
