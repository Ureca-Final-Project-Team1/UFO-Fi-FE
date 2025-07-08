'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

import { Button } from '@/components';

const Page = () => {
  const router = useRouter();
  const handleNext = () => {
    router.push('/signup/plan');
  };

  return (
    <div className="flex flex-col justify-center items-center h-full w-full">
      <div className="flex flex-[0.9] flex-col justify-start items-start text-center gap-5 w-full h-full">
        <p className="body-20-bold">회원가입</p>

        <div className="flex flex-col gap-3 w-full text-left">
          <label className="body-16-bold">이름</label>
          <input
            className="Label2_14_M bg-white h-[50px] pl-5 text-black placeholder-gray-400 rounded-sm p-2 w-full"
            placeholder="실명을 입력해주세요."
          />
        </div>
        <div className="flex flex-col gap-3 w-full text-left">
          <label className="body-16-bold">전화번호</label>
          <input
            className="Label2_14_M bg-white h-[50px] pl-5 text-black placeholder-gray-400 rounded-sm p-2 w-full"
            placeholder="010-XXXX-XXXX 형식으로 입력해주세요."
          />
        </div>
      </div>

      <Button
        onClick={handleNext}
        size="lg"
        className="body-16-medium w-full"
        style={{ backgroundColor: 'var(--color-primary-400)' }}
      >
        본인인증 완료
      </Button>
    </div>
  );
};

export default Page;
