'use client';

import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem, Button } from '@/shared';

interface PlanEditorProps {
  carrier: string;
  setCarrier: (value: string) => void;
  plan: string;
  setPlan: (value: string) => void;
  plans: { id: number; label: string; value: string }[];
  onSave: () => void;
  isLoading: boolean;
  error?: string | null;
}

export function PlanEditor({
  carrier,
  setCarrier,
  plan,
  setPlan,
  plans,
  onSave,
  isLoading,
  error,
}: PlanEditorProps) {
  const isCarrierSelected = !!carrier;
  const isPlanSelected = !!plan;

  return (
    <div>
      <h2 className="mb-4 font-semibold text-base">요금제 변경</h2>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-white">통신사 정보</label>
        <Select value={carrier} onValueChange={setCarrier} disabled={isLoading}>
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
        <Select value={plan} onValueChange={setPlan} disabled={!carrier || isLoading || !!error}>
          <SelectTrigger className="w-full bg-white text-black">
            <SelectValue
              placeholder={
                !carrier
                  ? '먼저 통신사를 선택해주세요'
                  : isLoading
                    ? '요금제 조회 중...'
                    : error
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
        {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
      </div>

      <Button
        className="w-full h-12 mt-4"
        disabled={!isCarrierSelected || !isPlanSelected || isLoading}
        onClick={onSave}
      >
        요금제 저장
      </Button>
    </div>
  );
}
