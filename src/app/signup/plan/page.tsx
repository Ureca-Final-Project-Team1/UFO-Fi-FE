'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import '@/styles/globals.css';
import {
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components';
import { useSignupStore } from '@/stores/useSignupStore';

const Page = () => {
  const { name, phone, telecom, plan, setForm } = useSignupStore();
  const router = useRouter();

  const handleSubmit = () => {
    if (!telecom || !plan) {
      alert('통신사와 요금제를 입력해주세요.');
      return;
    }
    console.log({ name, phone, telecom, plan });
    router.push('/');
  };

  const [maxData, setMaxData] = useState(0);
  const [networkType, setNetworkType] = useState('');

  // 더미 데이터
  useEffect(() => {
    setMaxData(10);
    setNetworkType('5G');
  }, []);

  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <div className="flex flex-[0.9] flex-col justify-start items-start text-center gap-5 sm:gap-8 w-full h-fit">
        <p className="text-white body-20-bold">회원가입</p>

        <div className="flex flex-col items-start gap-3 sm:gap-6 w-full h-fit">
          <div className="text-white body-16-bold">통신사 정보</div>
          <Select value={telecom} onValueChange={(value) => setForm({ telecom: value })}>
            <SelectTrigger
              size="default"
              className="w-[180px] bg-white text-black caption-14-regular"
            >
              <SelectValue placeholder="통신사 선택" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="skt">SKT</SelectItem>
              <SelectItem value="lg-uplus">LG U+</SelectItem>
              <SelectItem value="kt">KT</SelectItem>
            </SelectContent>
          </Select>

          <div className="text-white body-16-bold">요금제 정보</div>
          <Select value={plan} onValueChange={(value) => setForm({ plan: value })}>
            <SelectTrigger
              size="default"
              className="w-[180px] bg-white text-black cation-14-regular"
            >
              <SelectValue placeholder="요금제 선택" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="요금제">요금제</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {telecom !== '' && plan !== '' && (
          <div className="w-full flex flex-col gap-5 sm:gap-8">
            <hr className="border-t border-white w-full my-4 mx-auto" />
            <div className="flex flex-col gap-5 sm:gap-8">
              <p className="text-start w-full text-white body-20-bold">
                다음 정보가 맞는지 확인해주세요.
              </p>

              <div className="flex flex-col gap-3 sm:gap-6">
                <div className="flex items-start justify-between text-white body-16-bold">
                  <p className="text-white body-16-bold">판매할 수 있는 최대 데이터</p>
                  <p className="caption-14-regular">{maxData}GB</p>
                </div>
                <div className="flex items-start justify-between text-white body-16-bold">
                  <p>네트워크 타입</p>
                  <p className="caption-14-regular">{networkType}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <Button
        onClick={handleSubmit}
        size="full-width"
        className="body-16-medium h-10 sm:h-14 text-white"
        disabled={telecom == '' || plan == ''}
      >
        회원가입 완료
      </Button>
    </div>
  );
};

export default Page;
