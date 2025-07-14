'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import '@/styles/globals.css';
import { Controller, useForm } from 'react-hook-form';

import { getPlanByTelecom } from '@/api/signup/getPlansByTelecom';
import { signupWithPlan } from '@/api/signup/signupWithPlan';
import { signupPlanSchema, SignupPlanSchema } from '@/schemas/signupSchema';
import { Plan } from '@/shared/types/plan';
import {
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Title,
} from '@/shared/ui';
import { useSignupStore } from '@/stores/useSignupStore';

const Page = () => {
  const prevTelecom = useRef('');
  const { name, phoneNumber, carrier, planName, setForm } = useSignupStore();
  const router = useRouter();
  const [plans, setPlans] = useState<Plan[]>([]);

  const [maxData, setMaxData] = useState<number | null>();
  const [networkType, setNetworkType] = useState('');

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupPlanSchema>({
    resolver: zodResolver(signupPlanSchema),
    defaultValues: {
      carrier: '',
      planName: '',
    },
  });

  useEffect(() => {
    const fetchPlans = async () => {
      const response = await getPlanByTelecom(carrier);
      setPlans(response);
    };

    if (carrier && carrier !== prevTelecom.current) {
      fetchPlans();
      prevTelecom.current = carrier;
    }
  }, [carrier]);

  const onSubmit = (data: SignupPlanSchema) => {
    setForm({ carrier: data.carrier, planName: data.planName });

    // TODO: DB 리팩토링 후 제거할 것
    const selectedPlan = plans.find((p) => p.planName === data.planName);
    if (!selectedPlan) return;

    const fetchSignup = async () => {
      const response = await signupWithPlan({
        name,
        phoneNumber,
        planName,
        carrier: selectedPlan.carrier,
        mobileDataAmount: selectedPlan.mobileDataAmount,
        isUltimatedAmount: selectedPlan.isUltimatedAmount,
        sellMobileDataCapacityGB: selectedPlan.sellMobileDataCapacityGB,
        mobileDataType: selectedPlan.mobileDataType,
        userId: 1,
      });

      if (response?.statusCode === 200) {
        router.push('/');
      }
    };

    fetchSignup();
  };

  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <div className="flex flex-[0.9] flex-col justify-start items-start text-center w-full h-fit">
        <Title title="회원가입" className="body-20-bold w-fit pl-0" />

        <div className="flex flex-col items-start gap-3 sm:gap-6 w-full h-fit">
          <label className="flex items-center gap-5 body-16-bold">
            통신사 정보
            {errors.carrier && (
              <p className="text-red-600 caption-10-medium">{errors.carrier.message}</p>
            )}
          </label>
          <Controller
            name="carrier"
            control={control}
            render={({ field }) => (
              <Select
                value={field.value}
                onValueChange={(value) => {
                  field.onChange(value);
                  setForm({ carrier: value });
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
            {errors.planName && (
              <p className="text-red-600 caption-10-medium">{errors.planName.message}</p>
            )}
          </label>
          <Controller
            name="planName"
            control={control}
            render={({ field }) => (
              <Select
                value={field.value}
                onValueChange={(value) => {
                  field.onChange(value);
                  setForm({ planName: value });

                  const selected = plans.find((plan) => plan.planName === value);
                  if (selected) {
                    setMaxData(selected.sellMobileDataCapacityGB);
                    setNetworkType(selected.mobileDataType);
                  }
                }}
              >
                <SelectTrigger
                  size="default"
                  className="w-[180px] bg-white text-black caption-14-regular"
                >
                  <SelectValue placeholder="요금제 선택" />
                </SelectTrigger>
                <SelectContent>
                  {plans.map((plan, index) => (
                    <SelectItem key={index} value={plan.planName || ''}>
                      {plan.planName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>

        {carrier !== '' && planName !== '' && (
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
