import { AxiosError } from 'axios';
import { useState, useEffect, useRef } from 'react';

import { plansAPI, editProfileAPI } from '@/backend';
import type { Carrier } from '@/backend/types/carrier';
import type { Plan } from '@/backend/types/plan';
import { getMobileDataTypeDisplay } from '@/shared/utils/mobileData';

interface ErrorResponse {
  statusCode: number;
  message: string;
}

export function useEditProfile() {
  const [nickname, setNickname] = useState('');
  const [carrier, setCarrier] = useState<Carrier | ''>('');
  const [plan, setPlan] = useState('');
  const [plans, setPlans] = useState<Plan[]>([]);
  const [maxData, setMaxData] = useState<number | null>(null);
  const [networkType, setNetworkType] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'error' | 'success'>('idle');
  const prevCarrier = useRef<Carrier | ''>('');

  useEffect(() => {
    if (!carrier || carrier === prevCarrier.current) return;
    setStatus('loading');

    plansAPI
      .getByCarrier(carrier)
      .then((response) => {
        if (!response || response.length === 0) {
          setPlans([]);
          throw new Error('해당 통신사의 요금제를 찾을 수 없습니다.');
        }
        setPlans(response);
      })
      .catch((error) => {
        console.error('요금제 조회 실패:', error);
        setPlans([]);
        throw new Error('요금제를 불러오는 중 문제가 발생했습니다.');
      })
      .finally(() => {
        setStatus('idle');
        prevCarrier.current = carrier;
      });
  }, [carrier]);

  useEffect(() => {
    if (!plan) {
      setMaxData(null);
      setNetworkType('');
      return;
    }

    const selected = plans.find((p) => p.planName === plan);
    if (selected) {
      setMaxData(selected.sellMobileDataCapacityGB);
      setNetworkType(getMobileDataTypeDisplay(selected.mobileDataType));
    }
  }, [plan, plans]);

  const saveNickname = async (): Promise<true | string> => {
    if (!nickname || nickname.length > 15) {
      return '닉네임은 1~15자 이내여야 합니다.';
    }

    setStatus('loading');
    try {
      const res = await editProfileAPI.updateNickname(nickname);

      if (!res.success) {
        return res.message ?? '닉네임 변경에 실패했습니다.';
      }

      return true;
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>;
      return error.response?.data.message ?? '닉네임 변경 중 오류가 발생했습니다.';
    } finally {
      setStatus('idle');
    }
  };

  const savePlan = async (): Promise<true | string> => {
    const selected = plans.find((p) => p.planName === plan);
    if (!selected) {
      return '선택한 요금제를 찾을 수 없습니다.';
    }

    setStatus('loading');
    try {
      const res = await editProfileAPI.updatePlan(selected.planId, selected.planName);

      if (!res.success) {
        return res.message ?? '요금제 변경에 실패했습니다.';
      }

      return true;
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>;
      return error.response?.data.message ?? '요금제 변경 중 오류가 발생했습니다.';
    } finally {
      setStatus('idle');
    }
  };

  return {
    nickname,
    setNickname,
    carrier,
    setCarrier,
    plan,
    setPlan,
    plans,
    setPlans,
    maxData,
    setMaxData,
    networkType,
    setNetworkType,
    status,
    saveNickname,
    savePlan,
  };
}
