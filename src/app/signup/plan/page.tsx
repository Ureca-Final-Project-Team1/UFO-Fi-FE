'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import '@/styles/globals.css';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { getUserInfoResponse, Plan, signupAPI } from '@/backend';
import { Carrier } from '@/backend/types/carrier';
import { OCRInputSection, Stepper } from '@/features/signup/components';
import { signupPlanSchema, SignupPlanSchema } from '@/schemas/signupSchema';
import { Button, Title } from '@/shared';
import { useSignupStore } from '@/stores/useSignupStore';

const PlanPage = () => {
  const { name, phoneNumber, carrier, planName, setForm, isProfileComplete } = useSignupStore();
  const [plans, setPlans] = useState<Plan[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [maxData, setMaxData] = useState<number | null>(null);
  const [networkType, setNetworkType] = useState('');
  const queryClient = useQueryClient();

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

  const onSubmit = async (data: SignupPlanSchema) => {
    if (!isProfileComplete()) {
      toast.error('이름과 전화번호가 필요합니다.');
      return;
    }

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
      await signupAPI.signup({
        userInfoReq: { name, phoneNumber },
        userPlanReq: {
          planId: selectedPlan.planId,
          planName: selectedPlan.planName,
        },
      });
      toast.success('회원가입이 완료되었습니다!');
      useSignupStore.getState().reset();
      queryClient.setQueryData(['userInfo'], (prev: getUserInfoResponse | undefined) => {
        if (!prev) return prev;

        return {
          ...prev,
          content: {
            ...prev.content,
            role: 'ROLE_USER',
          },
        };
      });
    } catch (error) {
      console.error('회원가입 에러:', error);
      toast.error('회원가입 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main>
      <section className="flex flex-col flex-1">
        <header className="w-full">
          <Title iconVariant="back" title="회원가입" className="body-20-bold w-full pl-0 mb-6" />
        </header>

        <div className="flex flex-col items-start gap-6 w-full">
          <Stepper step={2} content="가입 신청" className="mb-5" />
          <h1 className="heading-24-bold ml-2">
            가입을 위한 정보를
            <br />
            입력해주세요
          </h1>

          <OCRInputSection
            control={control}
            errors={errors}
            setValue={setValue}
            plans={plans}
            setPlans={setPlans}
            setMaxData={setMaxData}
            setNetworkType={setNetworkType}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            setForm={setForm}
          />
        </div>

        {watchedCarrier && watchedPlanName && maxData !== null && networkType && (
          <section className="w-full flex flex-col gap-5 mt-8 mb-4" aria-label="가입 정보 확인">
            <hr className="border-t border-[var(--color-hr-border)] w-full" />
            <div className="flex flex-col gap-5">
              <p className="text-start w-full text-white body-20-bold">
                다음 정보가 맞는지 확인해주세요.
              </p>
              <div className="flex flex-col gap-3">
                <div className="flex justify-between text-white body-16-bold">
                  <span>판매할 수 있는 최대 데이터</span>
                  <span className="caption-14-regular">{maxData}GB</span>
                </div>
                <div className="flex justify-between text-white body-16-bold">
                  <span>네트워크 타입</span>
                  <span className="caption-14-regular">{networkType}</span>
                </div>
              </div>
            </div>
          </section>
        )}
      </section>

      <footer className="sticky bottom-0 bg-inherit pb-4 w-full">
        <Button
          onClick={handleSubmit(onSubmit)}
          type="submit"
          size="full-width"
          className="body-16-medium h-14 text-white"
          disabled={isLoading || !watchedCarrier || !watchedPlanName}
        >
          {isLoading ? '처리 중...' : '회원가입'}
        </Button>
      </footer>
    </main>
  );
};

export default PlanPage;
