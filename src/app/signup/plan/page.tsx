'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import '@/styles/globals.css';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Plan, plansAPI, signupAPI } from '@/api';
import { Carrier } from '@/api/types/carrier';
import { PlanCombo, Stepper } from '@/features/signup/components';
import { useOCRToGptMutation } from '@/hooks/useOCRToGptMutation';
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
  const [maxData, setMaxData] = useState<number | null>(null);
  const [networkType, setNetworkType] = useState('');
  const [planNameOCR, setPlanNameOCR] = useState('');
  const [carrierOCR, setCarrierOCR] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { mutate: runOCRAndGPT } = useOCRToGptMutation((result) => {
    setPlanNameOCR(result[0]);
    setCarrierOCR(result[1]);
    setIsLoading(false);
  });

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    setIsLoading(true);
    runOCRAndGPT(formData);
  };

  const handleClick = () => fileInputRef.current?.click();

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
    if (carrierOCR) setValue('carrier', carrierOCR);
    if (planNameOCR) setValue('planName', planNameOCR);
  }, [planNameOCR, carrierOCR, setValue]);

  const handleApiError = (error: unknown) => {
    console.error('API 오류:', error);
    const isAxiosError = (
      err: unknown,
    ): err is { response: { data: { message: string }; status: number } } =>
      typeof err === 'object' && err !== null && 'response' in err;

    const errorMessage = isAxiosError(error)
      ? error.response.data.message
      : error instanceof Error
        ? error.message
        : '요금제 조회에 실패했습니다.';

    setApiError(errorMessage);
    toast.error(errorMessage);
    setPlans([]);
    if (isAxiosError(error) && error.response.status === 401) router.push('/login');
  };

  useEffect(() => {
    const fetchPlans = async () => {
      if (!watchedCarrier || watchedCarrier === prevTelecom.current) return;
      setIsLoading(true);
      try {
        const response = await plansAPI.getByCarrier(watchedCarrier);
        setPlans(response);
        setValue('planName', '');
        setMaxData(null);
        setNetworkType('');
        if (!response || response.length === 0) {
          const msg = '해당 통신사의 요금제를 찾을 수 없습니다.';
          setApiError(msg);
          toast.error(msg);
        }
      } catch (error) {
        handleApiError(error);
      } finally {
        setIsLoading(false);
      }
      prevTelecom.current = watchedCarrier;
    };
    fetchPlans();
  }, [watchedCarrier, setValue, router]);

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
        userPlanReq: { planId: selectedPlan.planId, planName: selectedPlan.planName },
      });
      toast.success('회원가입이 완료되었습니다!');
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
        <Title title="회원가입" className="body-20-bold w-full pl-0 mb-6" />
        <div className="flex flex-col items-start gap-6 w-full">
          <Stepper step={2} content="가입 신청" className="mb-5" />
          <p className="heading-24-bold ml-2">
            가입을 위한 정보를
            <br />
            입력해주세요
          </p>
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
                  <SelectTrigger className="w-full bg-white text-black caption-14-regular">
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
                <PlanCombo
                  value={field.value}
                  planNames={plans.map((p) => p.planName)}
                  onSelect={(value) => {
                    field.onChange(value);
                    setForm({ planName: value });
                    const selected = plans.find((p) => p.planName === value);
                    if (selected) {
                      setMaxData(selected.sellMobileDataCapacityGB);
                      setNetworkType(selected.mobileDataType.replace(/^_/, ''));
                    }
                  }}
                />
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
                <div className="flex justify-between text-white body-16-bold">
                  <p>판매할 수 있는 최대 데이터</p>
                  <p className="caption-14-regular">{maxData}GB</p>
                </div>
                <div className="flex justify-between text-white body-16-bold">
                  <p>네트워크 타입</p>
                  <p className="caption-14-regular">{networkType}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="w-full mt-8">
          <label className="flex items-center gap-3 body-16-bold text-white mb-3">
            캡처 이미지로 요금제 자동 입력
          </label>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
          <Button type="button" onClick={handleClick} variant="primary" disabled={isLoading}>
            이미지 선택하기
          </Button>
        </div>
      </div>

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
