'use client';

import React, { useState } from 'react';

import {
  Button,
  RadioGroup,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components';

const Page = () => {
  const handleNext = () => {
    alert('로그인');
  };
  const [telecom, setTelecom] = useState('');
  const [plan, setPlan] = useState('');

  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <div className="flex flex-[0.9] flex-col justify-start items-start text-center gap-5 w-full h-full">
        <p className="text-white body-20-bold">회원가입</p>

        <div className="flex flex-col items-start gap-3">
          <div className="text-white body-16-bold">통신사 정보</div>
          <Select value={telecom} onValueChange={setTelecom}>
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
          <Select value={plan} onValueChange={setPlan}>
            <SelectTrigger
              size="default"
              className="w-[180px] bg-white text-black caption-14-regular"
            >
              <SelectValue placeholder="요금제 선택" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="요금제">요금제</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <hr className="border-t border-white w-[90%] my-4 mx-auto" />

        <p className="text-white body-20-bold">다음 정보가 맞는지 확인해주세요.</p>

        <div className="flex flex-col items-start gap-3">
          <p className="text-white body-16-bold">판매할 수 있는 최대 데이터</p>
          <input
            type="number"
            className="bg-white text-black w-[300px] h-[50px] rounded-sm p-2 caption-14-regular"
            placeholder="GB 단위로 입력해주세요."
          />
        </div>

        <div className="flex flex-col items-start gap-3">
          <p className="text-white body-16-bold">네트워크 타입</p>
          <RadioGroup options={['5G', 'LTE']} className="text-white" />
        </div>
      </div>

      <Button
        onClick={handleNext}
        size="lg"
        className="body-16-medium w-full"
        style={{ backgroundColor: 'var(--color-primary-400)' }}
      >
        회원가입 완료
      </Button>
    </div>
  );
};

export default Page;
