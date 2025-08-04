import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

// Mock PlanEditor for Storybook
const MockPlanEditor = ({
  carrier = '',
  setCarrier,
  plan = '',
  setPlan,
  plans = [
    { id: 1, name: '5G 기본 요금제', carrier: 'SKT', data: 10 },
    { id: 2, name: '5G 프리미엄 요금제', carrier: 'SKT', data: 20 },
    { id: 3, name: '5G 무제한 요금제', carrier: 'SKT', data: 100 },
  ],
  isLoading = false,
  onSave,
}: {
  carrier?: string;
  setCarrier?: (carrier: string) => void;
  plan?: string;
  setPlan?: (plan: string) => void;
  plans?: Array<{ id: number; name: string; carrier: string; data: number }>;
  isLoading?: boolean;
  onSave?: () => void;
}) => {
  const [localCarrier, setLocalCarrier] = useState(carrier);
  const [localPlan, setLocalPlan] = useState(plan);
  const [localMaxData, setLocalMaxData] = useState<number | null>(null);
  const [localNetworkType, setLocalNetworkType] = useState('');

  const handleCarrierChange = (newCarrier: string) => {
    setLocalCarrier(newCarrier);
    setCarrier?.(newCarrier);
  };

  const handlePlanChange = (newPlan: string) => {
    setLocalPlan(newPlan);
    setPlan?.(newPlan);
    // Mock data for demonstration
    if (newPlan.includes('기본')) {
      setLocalMaxData(10);
      setLocalNetworkType('5G');
    } else if (newPlan.includes('프리미엄')) {
      setLocalMaxData(20);
      setLocalNetworkType('5G');
    } else if (newPlan.includes('무제한')) {
      setLocalMaxData(100);
      setLocalNetworkType('5G');
    }
  };

  return (
    <div className="p-6 bg-gray-800 rounded-lg">
      <h2 className="mb-4 font-semibold text-lg text-white">요금제 변경</h2>

      {/* Mock OCR Input Section */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">통신사</label>
          <select
            value={localCarrier}
            onChange={(e) => handleCarrierChange(e.target.value)}
            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
          >
            <option value="">통신사를 선택하세요</option>
            <option value="SKT">SKT</option>
            <option value="KT">KT</option>
            <option value="LG U+">LG U+</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">요금제</label>
          <select
            value={localPlan}
            onChange={(e) => handlePlanChange(e.target.value)}
            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
            disabled={!localCarrier}
          >
            <option value="">요금제를 선택하세요</option>
            {plans
              .filter((p) => p.carrier === localCarrier)
              .map((p) => (
                <option key={p.id} value={p.name}>
                  {p.name}
                </option>
              ))}
          </select>
        </div>
      </div>

      {/* Confirmation Section */}
      {localCarrier && localPlan && localMaxData !== null && localNetworkType && (
        <div className="w-full flex flex-col gap-5 mt-8">
          <hr className="border-t border-gray-600 w-full" />
          <div className="flex flex-col gap-5">
            <p className="text-start w-full text-white text-lg font-bold">
              다음 정보가 맞는지 확인해주세요.
            </p>
            <div className="flex flex-col gap-3">
              <div className="flex justify-between text-white font-bold">
                <p>판매할 수 있는 최대 데이터</p>
                <p className="text-sm font-normal">{localMaxData}GB</p>
              </div>
              <div className="flex justify-between text-white font-bold">
                <p>네트워크 타입</p>
                <p className="text-sm font-normal">{localNetworkType}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Save Button */}
      <button
        className={`w-full h-12 mt-4 rounded-lg font-medium transition-colors ${
          !localCarrier || !localPlan || isLoading
            ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
            : 'bg-blue-600 text-white hover:bg-blue-700'
        }`}
        disabled={!localCarrier || !localPlan || isLoading}
        onClick={onSave}
      >
        {isLoading ? '저장 중...' : '요금제 저장'}
      </button>
    </div>
  );
};

const meta: Meta<typeof MockPlanEditor> = {
  title: 'Mypage/PlanEditor',
  component: MockPlanEditor,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    setCarrier: { action: 'carrier changed' },
    setPlan: { action: 'plan changed' },
    onSave: { action: 'save clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    plans: [
      { id: 1, name: '5G 기본 요금제', carrier: 'SKT', data: 10 },
      { id: 2, name: '5G 프리미엄 요금제', carrier: 'SKT', data: 20 },
      { id: 3, name: '5G 무제한 요금제', carrier: 'SKT', data: 100 },
    ],
  },
};

export const WithSelection: Story = {
  args: {
    carrier: 'SKT',
    plan: '5G 프리미엄 요금제',
    plans: [
      { id: 1, name: '5G 기본 요금제', carrier: 'SKT', data: 10 },
      { id: 2, name: '5G 프리미엄 요금제', carrier: 'SKT', data: 20 },
      { id: 3, name: '5G 무제한 요금제', carrier: 'SKT', data: 100 },
    ],
  },
};

export const Loading: Story = {
  args: {
    carrier: 'SKT',
    plan: '5G 기본 요금제',
    isLoading: true,
    plans: [
      { id: 1, name: '5G 기본 요금제', carrier: 'SKT', data: 10 },
      { id: 2, name: '5G 프리미엄 요금제', carrier: 'SKT', data: 20 },
    ],
  },
};

export const MultipleCarriers: Story = {
  args: {
    plans: [
      { id: 1, name: '5G 기본 요금제', carrier: 'SKT', data: 10 },
      { id: 2, name: '5G 프리미엄 요금제', carrier: 'SKT', data: 20 },
      { id: 3, name: '5G 기본 요금제', carrier: 'KT', data: 10 },
      { id: 4, name: '5G 프리미엄 요금제', carrier: 'KT', data: 20 },
      { id: 5, name: '5G 기본 요금제', carrier: 'LG U+', data: 10 },
      { id: 6, name: '5G 프리미엄 요금제', carrier: 'LG U+', data: 20 },
    ],
  },
};
