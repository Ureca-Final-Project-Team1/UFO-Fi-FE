'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import '@/styles/globals.css';
import { Controller, useForm } from 'react-hook-form';

import axiosInstance from '@/api/axios';
import { signupPlanSchema, SignupPlanSchema } from '@/schemas/signupSchema';
import { Button, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared';
import { useSignupStore } from '@/stores/useSignupStore';

const Page = () => {
  const { name, phone, telecom, plan, setForm } = useSignupStore();
  const router = useRouter();
  const [plans, setPlans] = useState<string[]>([]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupPlanSchema>({
    resolver: zodResolver(signupPlanSchema),
    defaultValues: {
      telecom: '',
      plan: '',
    },
  });

  const handleClick = () => {
    fetchPlan();
  };

  const fetchPlan = async () => {
    try {
      const response = await axiosInstance.get('/plans', {
        params: { rawCarrier: telecom },
      });

      console.log('📦 실제 응답 데이터:', response.data);

      const backPlans = response.data?.content?.plans;
      if (Array.isArray(backPlans)) {
        setPlans(backPlans);
        console.log(plans);
      } else {
        console.error('📛 plans 배열이 없습니다:', response.data);
      }
    } catch (error) {
      console.error('요금제 조회 실패:', error);
    }
  };

  const onSubmit = (data: SignupPlanSchema) => {
    setForm(data);
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
          <label className="flex items-center gap-5 body-16-bold">
            통신사 정보
            {errors.telecom && (
              <p className="text-red-600 caption-10-medium">{errors.telecom.message}</p>
            )}
            <button onClick={handleClick}>체크</button>
          </label>
          <Controller
            name="telecom"
            control={control}
            render={({ field }) => (
              <Select
                value={field.value}
                onValueChange={(value) => {
                  field.onChange(value);
                  setForm({ telecom: value });
                }}
              >
                <SelectTrigger
                  size="default"
                  className="w-[180px] bg-white text-black caption-14-regular"
                >
                  <SelectValue placeholder="통신사 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="SKT">SKT</SelectItem>
                  <SelectItem value="LGU">LG U+</SelectItem>
                  <SelectItem value="KT">KT</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          <label className="flex items-center gap-5 body-16-bold">
            요금제 정보
            {errors.plan && <p className="text-red-600 caption-10-medium">{errors.plan.message}</p>}
          </label>
          <Controller
            name="plan"
            control={control}
            render={({ field }) => (
              <Select
                value={field.value}
                onValueChange={(value) => {
                  field.onChange(value);
                  setForm({ plan: value });
                }}
              >
                <SelectTrigger
                  size="default"
                  className="w-[180px] bg-white text-black cation-14-regular"
                >
                  <SelectValue placeholder="요금제 선택" />
                </SelectTrigger>
                <SelectContent>
                  {/* <SelectItem value="요금제">요금제</SelectItem> */}
                </SelectContent>
              </Select>
            )}
          />
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
        onClick={handleSubmit(onSubmit)}
        type="submit"
        size="full-width"
        className="body-16-medium h-10 sm:h-14 text-white"
      >
        회원가입
      </Button>
    </div>
  );
};

export default Page;
