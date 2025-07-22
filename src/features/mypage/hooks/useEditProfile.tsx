import { useState, useEffect, useRef } from 'react';

import { plansAPI, editProfileAPI } from '@/api';

export function useEditProfile() {
  const [nickname, setNickname] = useState('');
  const [carrier, setCarrier] = useState('');
  const [plan, setPlan] = useState('');
  const [plans, setPlans] = useState<
    { id: number; label: string; value: string; maxData: number; networkType: string }[]
  >([]);
  const [maxData, setMaxData] = useState<number | null>(null);
  const [networkType, setNetworkType] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'error' | 'success'>('idle');
  const [error, setError] = useState<string | null>(null);
  const prevCarrier = useRef('');

  // 통신사 선택 시 요금제 가져오기
  useEffect(() => {
    if (!carrier || carrier === prevCarrier.current) return;
    setStatus('loading');
    setError(null);

    plansAPI
      .getByCarrier(carrier)
      .then((response) => {
        if (!response || response.length === 0) {
          setError('해당 통신사의 요금제를 찾을 수 없습니다.');
          setPlans([]);
          return;
        }
        setPlans(
          response.map((p) => ({
            id: p.planId,
            label: p.planName,
            value: p.planName,
            maxData: p.sellMobileDataCapacityGB,
            networkType: p.mobileDataType,
          })),
        );
      })
      .catch(() => setError('요금제 조회에 실패했습니다.'))
      .finally(() => {
        setStatus('idle');
        prevCarrier.current = carrier;
      });
  }, [carrier]);

  // 요금제 선택 시 데이터 세팅
  useEffect(() => {
    if (!plan) {
      setMaxData(null);
      setNetworkType('');
      return;
    }
    const selected = plans.find((p) => p.value === plan);
    if (selected) {
      setMaxData(selected.maxData);
      setNetworkType(selected.networkType);
    }
  }, [plan, plans]);

  const saveNickname = async () => {
    if (!nickname || nickname.length > 15) {
      setError('닉네임은 1~15자 이내여야 합니다.');
      return false;
    }
    setStatus('loading');
    const res = await editProfileAPI.updateNickname(nickname);
    setStatus('idle');
    if (!res.success) {
      setError(res.message ?? '닉네임 변경에 실패했습니다.');
      return false;
    }
    return true;
  };

  const savePlan = async () => {
    const selected = plans.find((p) => p.value === plan);
    if (!selected) {
      setError('선택한 요금제를 찾을 수 없습니다.');
      return false;
    }
    setStatus('loading');
    const res = await editProfileAPI.updatePlan(selected.id, selected.label);
    setStatus('idle');
    if (!res.success) {
      setError(res.message ?? '요금제 변경에 실패했습니다.');
      return false;
    }
    return true;
  };

  return {
    nickname,
    setNickname,
    carrier,
    setCarrier,
    plan,
    setPlan,
    plans,
    maxData,
    networkType,
    status,
    error,
    setError,
    saveNickname,
    savePlan,
  };
}
