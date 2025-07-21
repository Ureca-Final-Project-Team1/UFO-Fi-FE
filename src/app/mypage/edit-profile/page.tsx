'use client';

import { useEffect, useRef, useState } from 'react';

import { plansAPI } from '@/api';
import {
  Title,
  Input,
  Button,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/shared';

interface RawPlan {
  planId: number;
  planName: string;
  sellMobileDataCapacityGB: number;
  mobileDataType: string;
}

export default function EditProfilePage() {
  const [nickname, setNickname] = useState('');
  const [carrier, setCarrier] = useState('');
  const [plan, setPlan] = useState('');
  const [plans, setPlans] = useState<
    { label: string; value: string; maxData: number; networkType: string }[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [maxData, setMaxData] = useState<number | null>(null);
  const [networkType, setNetworkType] = useState('');
  const prevCarrier = useRef('');

  // 통신사 변경 시 요금제 목록 fetch
  useEffect(() => {
    const fetchPlans = async () => {
      if (!carrier) return;
      setIsLoading(true);
      setApiError(null);

      try {
        const response: RawPlan[] = await plansAPI.getByCarrier(carrier);
        setPlans(
          response.map((plan) => ({
            label: plan.planName,
            value: plan.planName,
            maxData: plan.sellMobileDataCapacityGB,
            networkType: plan.mobileDataType,
          })),
        );
        setPlan('');
        setMaxData(null);
        setNetworkType('');
        if (!response || response.length === 0) {
          setApiError('해당 통신사의 요금제를 찾을 수 없습니다.');
        }
      } catch {
        setApiError('요금제 조회에 실패했습니다.');
        setPlans([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (carrier && carrier !== prevCarrier.current) {
      fetchPlans();
      prevCarrier.current = carrier;
    }
  }, [carrier]);

  // 요금제 선택 시 정보 세팅
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

  const isNicknameValid = nickname.length > 0 && nickname.length <= 15;
  const isCarrierSelected = !!carrier;
  const isPlanSelected = !!plan;

  const handleSave = () => {
    if (!isNicknameValid || !isCarrierSelected || !isPlanSelected) return;
    // TODO: 저장 API 호출
    alert('수정한 정보가 저장되었습니다!');
  };

  return (
    <div className="flex flex-col min-h-screen w-full">
      <Title title="프로필 수정" iconVariant="back" />
      <div className="mx-4 mt-6 flex flex-col gap-8">
        {/* 닉네임 수정 */}
        <div>
          <h1 className="mb-4 font-semibold text-lg">닉네임 수정</h1>
          <Input
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="변경할 닉네임을 입력해주세요."
            variant="whiteBorder"
            maxLength={15}
            error={!isNicknameValid && nickname ? '닉네임은 1~15자 이내여야 합니다.' : undefined}
          />
        </div>

        {/* 요금제 변경 */}
        <div>
          <h2 className="mb-4 font-semibold text-base">요금제 변경</h2>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-white">통신사 정보</label>
            <Select value={carrier} onValueChange={setCarrier}>
              <SelectTrigger className="w-full bg-white text-black">
                <SelectValue placeholder="통신사 선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="KT">KT</SelectItem>
                <SelectItem value="SKT">SKT</SelectItem>
                <SelectItem value="LGU">LG U+</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-white">요금제 선택</label>
            <Select
              value={plan}
              onValueChange={setPlan}
              disabled={!carrier || isLoading || !!apiError}
            >
              <SelectTrigger className="w-full bg-white text-black">
                <SelectValue
                  placeholder={
                    !carrier
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
                {plans.map((p) => (
                  <SelectItem key={p.value} value={p.value}>
                    {p.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {apiError && <p className="text-red-500 text-xs mt-2">{apiError}</p>}
          </div>
        </div>

        {/* 정보 확인 */}
        {carrier && plan && maxData !== null && networkType && (
          <div className="flex flex-col gap-3 mt-4">
            <hr className="border-t border-white w-full" />
            <p className="text-start w-full text-white font-bold text-base mb-2">
              다음 정보가 맞는지 확인해주세요.
            </p>
            <div className="flex items-center justify-between text-white">
              <span>판매할 수 있는 최대 데이터</span>
              <span className="font-semibold">{maxData}GB</span>
            </div>
            <div className="flex items-center justify-between text-white">
              <span>네트워크 타입</span>
              <span className="font-semibold">{networkType}</span>
            </div>
          </div>
        )}
      </div>

      {/* 하단 고정 버튼 */}
      <div className="sticky bottom-0 bg-inherit pb-4 mt-auto">
        <Button
          className="w-full h-14 mt-6"
          disabled={!isNicknameValid || !isCarrierSelected || !isPlanSelected}
          onClick={handleSave}
        >
          수정한 정보 저장하기
        </Button>
      </div>
    </div>
  );
}
