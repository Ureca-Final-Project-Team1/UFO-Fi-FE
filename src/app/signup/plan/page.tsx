'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import '@/styles/globals.css';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Plan, plansAPI, signupAPI } from '@/api';
import { Carrier } from '@/api/types/carrier';
import { signupPlanSchema, SignupPlanSchema } from '@/schemas/signupSchema';
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

const PlanPage = () => {
  const prevTelecom = useRef('');
  const { name, phoneNumber, carrier, planName, setForm, isProfileComplete } = useSignupStore();
  const router = useRouter();
  const [plans, setPlans] = useState<Plan[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const [maxData, setMaxData] = useState<number | null>();
  const [networkType, setNetworkType] = useState('');

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<SignupPlanSchema>({
    resolver: zodResolver(signupPlanSchema),
    defaultValues: {
      carrier: carrier || '',
      planName: planName || '',
    },
  });

  const watchedCarrier = watch('carrier');
  const watchedPlanName = watch('planName');

  useEffect(() => {
    const fetchPlans = async () => {
      if (!watchedCarrier) {
        return;
      }

      setIsLoading(true);
      setApiError(null);

      try {
        const response = await plansAPI.getByCarrier(watchedCarrier);
        setPlans(response);

        // 통신사 변경 시 요금제 선택 초기화
        setValue('planName', '');
        setMaxData(null);
        setNetworkType('');

        if (!response || response.length === 0) {
          setApiError('해당 통신사의 요금제를 찾을 수 없습니다.');
          toast.error('해당 통신사의 요금제를 찾을 수 없습니다.');
        }
      } catch (error: unknown) {
        console.error('=== useEffect: 요금제 조회 실패 ===');
        console.error('에러:', error);
        const isAxiosError = (
          err: unknown,
        ): err is { response: { data: { message: string }; status: number } } => {
          return typeof err === 'object' && err !== null && 'response' in err;
        };
        const errorMessage = isAxiosError(error)
          ? error.response.data.message
          : error instanceof Error
            ? error.message
            : '요금제 조회에 실패했습니다.';

        setApiError(errorMessage);
        toast.error(errorMessage);
        setPlans([]);

        // 401 에러인 경우 로그인 페이지로 리다이렉트
        if (isAxiosError(error) && error.response.status === 401) {
          router.push('/login');
          return;
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (watchedCarrier && watchedCarrier !== prevTelecom.current) {
      fetchPlans();
      prevTelecom.current = watchedCarrier;
    }
  }, [watchedCarrier, setValue, router]);

  const onSubmit = async (data: SignupPlanSchema) => {
    // 프로필 정보 완료 여부 확인
    if (!isProfileComplete()) {
      toast.error('이름과 전화번호가 필요합니다.');
      return;
    }

    // planName이 비어있지 않음을 확인
    if (!data.planName?.trim()) {
      toast.error('요금제를 선택해주세요.');
      return;
    }

    setForm({ carrier: data.carrier as Carrier, planName: data.planName });

    const selectedPlan = plans.find((p) => p.planName === data.planName);
    if (!selectedPlan) {
      toast.error('선택된 요금제를 찾을 수 없습니다.');
      return;
    }

    setIsLoading(true);
    try {
      const requestData = {
        userInfoReq: {
          name,
          phoneNumber,
        },
        userPlanReq: {
          planId: selectedPlan.planId,
          planName: selectedPlan.planName,
        },
      };

      await signupAPI.signup(requestData);
      toast.success(`회원가입이 완료되었습니다!`);
      useSignupStore.getState().reset();
      router.push('/');
    } catch (error) {
      console.error('회원가입 에러:', error);
      toast.error('회원가입 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col justify-start items-start">
        <Title title="회원가입" className="body-20-bold w-fit pl-0 mb-6" />

        <div className="flex flex-col items-start gap-6 w-full">
          <div className="w-full">
            <label className="flex items-center gap-5 body-16-bold mb-3">
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
                    setForm({ carrier: value as Carrier });
                  }}
                >
                  <SelectTrigger
                    size="default"
                    className="w-full bg-white text-black caption-14-regular"
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
          </div>

          <div className="w-full">
            <label className="flex items-center gap-5 body-16-bold mb-3">
              요금제 정보
              {errors.planName && (
                <p className="text-red-600 caption-10-medium">{errors.planName.message}</p>
              )}
              {apiError && <p className="text-red-600 caption-10-medium">{apiError}</p>}
            </label>
            <Controller
              name="planName"
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value || ''}
                  onValueChange={(value) => {
                    field.onChange(value);
                    setForm({ planName: value });

                    const selected = plans.find((plan) => plan.planName === value);
                    if (selected) {
                      setMaxData(selected.sellMobileDataCapacityGB);
                      setNetworkType(selected.mobileDataType);
                    }
                  }}
                  disabled={!watchedCarrier || isLoading}
                >
                  <SelectTrigger
                    size="default"
                    className="w-full bg-white text-black caption-14-regular"
                  >
                    <SelectValue
                      placeholder={
                        !watchedCarrier
                          ? '먼저 통신사를 선택해주세요'
                          : isLoading
                            ? '요금제 조회 중...'
                            : apiError
                              ? '요금제 조회 실패'
                              : plans.length === 0
                                ? '요금제가 없습니다'
                                : '요금제 선택'
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {plans.map((plan) => (
                      <SelectItem key={plan.planId} value={plan.planName}>
                        {plan.planName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>
        </div>

        {watchedCarrier && watchedPlanName && maxData !== null && networkType && (
          <div className="w-full flex flex-col gap-5 mt-8">
            <hr className="border-t border-white w-full" />
            <div className="flex flex-col gap-5">
              <p className="text-start w-full text-white body-20-bold">
                다음 정보가 맞는지 확인해주세요.
              </p>

              <div className="flex flex-col gap-3">
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

      {/* 고정된 하단 버튼 */}
      <div className="sticky bottom-0 bg-inherit pb-4">
        <Button
          onClick={handleSubmit(onSubmit)}
          type="submit"
          size="full-width"
          className="body-16-medium h-14 text-white"
          disabled={isLoading || !watchedCarrier || !watchedPlanName}
        >
          {isLoading ? '처리 중...' : '회원가입'}
        </Button>
      </div>
    </div>
  );
};

export default PlanPage;
