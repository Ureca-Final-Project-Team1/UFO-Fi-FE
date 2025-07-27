'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Plan } from '@/api';
import { Carrier } from '@/api/types/carrier';
import { OCRInputSection } from '@/features/signup/components';
import { SignupPlanSchema, signupPlanSchema } from '@/schemas/signupSchema';
import { Button } from '@/shared/ui';

interface PlanEditorProps {
  carrier: Carrier | '';
  setCarrier: (carrier: Carrier) => void;
  plan: string;
  setPlan: (plan: string) => void;
  plans: Plan[];
  setPlans: (plans: Plan[]) => void;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  onSave: () => void;
}

export function PlanEditor({
  carrier,
  setCarrier,
  plan,
  setPlan,
  plans,
  setPlans,
  isLoading,
  setIsLoading,
  onSave,
}: PlanEditorProps) {
  const [maxData, setMaxData] = useState<number | null>(null);
  const [networkType, setNetworkType] = useState('');

  const {
    control,
    formState: { errors },
    setValue,
  } = useForm<SignupPlanSchema>({
    resolver: zodResolver(signupPlanSchema),
    defaultValues: {
      carrier: carrier || '',
      planName: plan || '',
    },
  });

  return (
    <div>
      <h2 className="mb-4 font-semibold text-base">요금제 변경</h2>
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
        setForm={({ carrier, planName }) => {
          if (carrier) setCarrier(carrier);
          if (planName) setPlan(planName);
        }}
      />
      {carrier && plan && maxData !== null && networkType && (
        <div className="w-full flex flex-col gap-5 mt-8">
          <hr className="border-t border-[var(--color-hr-border)] w-full" />
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
      <Button
        className="w-full h-12 mt-4"
        disabled={!carrier || !plan || isLoading}
        onClick={onSave}
      >
        요금제 저장
      </Button>
    </div>
  );
}
