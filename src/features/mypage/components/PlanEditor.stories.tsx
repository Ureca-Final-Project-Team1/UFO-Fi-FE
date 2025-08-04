import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Plan } from '@/backend';
import { Carrier } from '@/backend/types/carrier';
import { Icon, Button } from '@/shared';

// Mock PlanEditor for Storybook to avoid React Query dependency
const MockPlanEditor = ({
  carrier = '' as Carrier | '',
  setCarrier,
  plan = '',
  setPlan,
  plans = [],
  isLoading = false,
  onSave,
}: {
  carrier?: Carrier | '';
  setCarrier?: (carrier: Carrier) => void;
  plan?: string;
  setPlan?: (plan: string) => void;
  plans?: Plan[];
  isLoading?: boolean;
  onSave?: () => void;
}) => {
  const [localCarrier, setLocalCarrier] = useState<Carrier | ''>(carrier);
  const [localPlan, setLocalPlan] = useState(plan);
  const [localMaxData, setLocalMaxData] = useState<number | null>(null);
  const [localNetworkType, setLocalNetworkType] = useState('');

  const handleCarrierChange = (newCarrier: Carrier) => {
    setLocalCarrier(newCarrier);
    setCarrier?.(newCarrier);
    setLocalPlan('');
    setPlan?.('');
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
    <div>
      <h2 className="mb-4 font-semibold text-lg text-white">요금제 변경</h2>

      {/* Mock OCR Input Section */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">통신사</label>
          <select
            value={localCarrier}
            onChange={(e) => handleCarrierChange(e.target.value as Carrier)}
            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
          >
            <option value="">통신사를 선택하세요</option>
            <option value={Carrier.SKT}>SKT</option>
            <option value={Carrier.KT}>KT</option>
            <option value={Carrier.LGU}>LG U+</option>
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

      <Button
        className="w-full h-12 mt-4"
        disabled={!localCarrier || !localPlan || isLoading}
        onClick={onSave}
      >
        요금제 저장
      </Button>
    </div>
  );
};

const meta: Meta<typeof MockPlanEditor> = {
  title: 'Mypage/PlanEditor',
  component: MockPlanEditor,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    setCarrier: { action: 'carrier changed' },
    setPlan: { action: 'plan changed' },
    setPlans: { action: 'plans changed' },
    setIsLoading: { action: 'loading changed' },
    onSave: { action: 'save clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof MockPlanEditor>;

export const Default: Story = {
  args: {
    carrier: '' as Carrier | '',
    plan: '',
    plans: [
      { id: 1, name: '5G 기본 요금제', carrier: 'SKT', data: 10 },
      { id: 2, name: '5G 프리미엄 요금제', carrier: 'SKT', data: 20 },
      { id: 3, name: '5G 무제한 요금제', carrier: 'SKT', data: 100 },
    ] as Plan[],
    isLoading: false,
  },
  render: (args) => (
    <div className="w-full h-full flex flex-col bg-gray-900">
      <div className="px-4 pt-4">
        {/* 헤더 - Title 컴포넌트 대신 직접 구현 */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
              <Icon name="ChevronLeft" className="w-5 h-5 text-white" />
            </button>
            <h1 className="text-white text-lg font-bold">마이페이지</h1>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg border border-gray-700">
            <MockPlanEditor {...args} />
          </div>
        </div>
      </div>
    </div>
  ),
};

export const WithCarrierSelected: Story = {
  args: {
    carrier: Carrier.SKT,
    plan: '',
    plans: [
      { id: 1, name: '5G 기본 요금제', carrier: 'SKT', data: 10 },
      { id: 2, name: '5G 프리미엄 요금제', carrier: 'SKT', data: 20 },
      { id: 3, name: '5G 무제한 요금제', carrier: 'SKT', data: 100 },
    ] as Plan[],
    isLoading: false,
  },
  render: (args) => (
    <div className="w-full h-full flex flex-col bg-gray-900">
      <div className="px-4 pt-4">
        {/* 헤더 - Title 컴포넌트 대신 직접 구현 */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
              <Icon name="ChevronLeft" className="w-5 h-5 text-white" />
            </button>
            <h1 className="text-white text-lg font-bold">마이페이지</h1>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg border border-gray-700">
            <MockPlanEditor {...args} />
          </div>
        </div>
      </div>
    </div>
  ),
};

export const WithPlanSelected: Story = {
  args: {
    carrier: Carrier.SKT,
    plan: '5G 기본 요금제',
    plans: [
      { id: 1, name: '5G 기본 요금제', carrier: 'SKT', data: 10 },
      { id: 2, name: '5G 프리미엄 요금제', carrier: 'SKT', data: 20 },
      { id: 3, name: '5G 무제한 요금제', carrier: 'SKT', data: 100 },
    ] as Plan[],
    isLoading: false,
  },
  render: (args) => (
    <div className="w-full h-full flex flex-col bg-gray-900">
      <div className="px-4 pt-4">
        {/* 헤더 - Title 컴포넌트 대신 직접 구현 */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
              <Icon name="ChevronLeft" className="w-5 h-5 text-white" />
            </button>
            <h1 className="text-white text-lg font-bold">마이페이지</h1>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg border border-gray-700">
            <MockPlanEditor {...args} />
          </div>
        </div>
      </div>
    </div>
  ),
};

export const Loading: Story = {
  args: {
    carrier: Carrier.SKT,
    plan: '5G 기본 요금제',
    plans: [
      { id: 1, name: '5G 기본 요금제', carrier: 'SKT', data: 10 },
      { id: 2, name: '5G 프리미엄 요금제', carrier: 'SKT', data: 20 },
      { id: 3, name: '5G 무제한 요금제', carrier: 'SKT', data: 100 },
    ] as Plan[],
    isLoading: true,
  },
  render: (args) => (
    <div className="w-full h-full flex flex-col bg-gray-900">
      <div className="px-4 pt-4">
        {/* 헤더 - Title 컴포넌트 대신 직접 구현 */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
              <Icon name="ChevronLeft" className="w-5 h-5 text-white" />
            </button>
            <h1 className="text-white text-lg font-bold">마이페이지</h1>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg border border-gray-700">
            <MockPlanEditor {...args} />
          </div>
        </div>
      </div>
    </div>
  ),
};

export const Desktop: Story = {
  args: {
    carrier: Carrier.KT,
    plan: '5G 프리미엄 요금제',
    plans: [
      { id: 1, name: '5G 기본 요금제', carrier: 'KT', data: 10 },
      { id: 2, name: '5G 프리미엄 요금제', carrier: 'KT', data: 20 },
      { id: 3, name: '5G 무제한 요금제', carrier: 'KT', data: 100 },
    ] as Plan[],
    isLoading: false,
  },
  render: (args) => (
    <div className="w-full h-full flex flex-col bg-gray-900">
      <div className="px-4 pt-4 max-w-2xl mx-auto w-full">
        {/* 헤더 - Title 컴포넌트 대신 직접 구현 */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
              <Icon name="ChevronLeft" className="w-5 h-5 text-white" />
            </button>
            <h1 className="text-white text-lg font-bold">데스크톱 마이페이지</h1>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg border border-gray-700">
            <MockPlanEditor {...args} />
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
  },
};
