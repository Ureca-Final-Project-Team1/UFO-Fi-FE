import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Carrier } from '@/backend/types/carrier';
import { Plan } from '@/backend/types/plan';
import { Button } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icons';

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
  const [localNetworkType, setLocalNetworkType] = useState<string>('');

  const handleCarrierChange = (newCarrier: Carrier) => {
    setLocalCarrier(newCarrier);
    setLocalPlan('');
    setLocalMaxData(null);
    setLocalNetworkType('');
    setCarrier?.(newCarrier);
  };

  const handlePlanChange = (newPlan: string) => {
    setLocalPlan(newPlan);
    setPlan?.(newPlan);

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
                <option key={p.planId} value={p.planName}>
                  {p.planName}
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

// 공통 렌더 함수
const renderWithLayout = (
  args: {
    carrier?: Carrier | '';
    setCarrier?: (carrier: Carrier) => void;
    plan?: string;
    setPlan?: (plan: string) => void;
    plans?: Plan[];
    isLoading?: boolean;
    onSave?: () => void;
  },
  title: string = '마이페이지',
  isDesktop = false,
) => (
  <div className="w-full h-full flex flex-col bg-gray-900">
    <div className={`px-4 pt-4 ${isDesktop ? 'max-w-2xl mx-auto w-full' : ''}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
            <Icon name="ChevronLeft" className="w-5 h-5 text-white" />
          </button>
          <h1 className="text-white text-lg font-bold">{title}</h1>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg border border-gray-700">
          <MockPlanEditor {...args} />
        </div>
      </div>
    </div>
  </div>
);

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
      {
        planId: 1,
        planName: '5G 기본 요금제',
        carrier: 'SKT',
        mobileDataAmount: 10,
        isUltimatedAmount: false,
        sellMobileDataCapacityGB: 10,
        mobileDataType: '_5G',
      },
      {
        planId: 2,
        planName: '5G 프리미엄 요금제',
        carrier: 'SKT',
        mobileDataAmount: 20,
        isUltimatedAmount: false,
        sellMobileDataCapacityGB: 20,
        mobileDataType: '_5G',
      },
      {
        planId: 3,
        planName: '5G 무제한 요금제',
        carrier: 'SKT',
        mobileDataAmount: 100,
        isUltimatedAmount: true,
        sellMobileDataCapacityGB: 100,
        mobileDataType: '_5G',
      },
    ] as Plan[],
    isLoading: false,
  },
  render: (args) => renderWithLayout(args),
};

export const WithCarrierSelected: Story = {
  args: {
    carrier: Carrier.SKT,
    plan: '',
    plans: [
      {
        planId: 1,
        planName: '5G 기본 요금제',
        carrier: 'SKT',
        mobileDataAmount: 10,
        isUltimatedAmount: false,
        sellMobileDataCapacityGB: 10,
        mobileDataType: '_5G',
      },
      {
        planId: 2,
        planName: '5G 프리미엄 요금제',
        carrier: 'SKT',
        mobileDataAmount: 20,
        isUltimatedAmount: false,
        sellMobileDataCapacityGB: 20,
        mobileDataType: '_5G',
      },
      {
        planId: 3,
        planName: '5G 무제한 요금제',
        carrier: 'SKT',
        mobileDataAmount: 100,
        isUltimatedAmount: true,
        sellMobileDataCapacityGB: 100,
        mobileDataType: '_5G',
      },
    ] as Plan[],
    isLoading: false,
  },
  render: (args) => renderWithLayout(args),
};

export const WithPlanSelected: Story = {
  args: {
    carrier: Carrier.SKT,
    plan: '5G 기본 요금제',
    plans: [
      {
        planId: 1,
        planName: '5G 기본 요금제',
        carrier: 'SKT',
        mobileDataAmount: 10,
        isUltimatedAmount: false,
        sellMobileDataCapacityGB: 10,
        mobileDataType: '_5G',
      },
      {
        planId: 2,
        planName: '5G 프리미엄 요금제',
        carrier: 'SKT',
        mobileDataAmount: 20,
        isUltimatedAmount: false,
        sellMobileDataCapacityGB: 20,
        mobileDataType: '_5G',
      },
      {
        planId: 3,
        planName: '5G 무제한 요금제',
        carrier: 'SKT',
        mobileDataAmount: 100,
        isUltimatedAmount: true,
        sellMobileDataCapacityGB: 100,
        mobileDataType: '_5G',
      },
    ] as Plan[],
    isLoading: false,
  },
  render: (args) => renderWithLayout(args),
};

export const Loading: Story = {
  args: {
    carrier: Carrier.SKT,
    plan: '5G 기본 요금제',
    plans: [
      {
        planId: 1,
        planName: '5G 기본 요금제',
        carrier: 'SKT',
        mobileDataAmount: 10,
        isUltimatedAmount: false,
        sellMobileDataCapacityGB: 10,
        mobileDataType: '_5G',
      },
      {
        planId: 2,
        planName: '5G 프리미엄 요금제',
        carrier: 'SKT',
        mobileDataAmount: 20,
        isUltimatedAmount: false,
        sellMobileDataCapacityGB: 20,
        mobileDataType: '_5G',
      },
      {
        planId: 3,
        planName: '5G 무제한 요금제',
        carrier: 'SKT',
        mobileDataAmount: 100,
        isUltimatedAmount: true,
        sellMobileDataCapacityGB: 100,
        mobileDataType: '_5G',
      },
    ] as Plan[],
    isLoading: true,
  },
  render: (args) => renderWithLayout(args),
};

export const Desktop: Story = {
  args: {
    carrier: Carrier.KT,
    plan: '5G 프리미엄 요금제',
    plans: [
      {
        planId: 1,
        planName: '5G 기본 요금제',
        carrier: 'KT',
        mobileDataAmount: 10,
        isUltimatedAmount: false,
        sellMobileDataCapacityGB: 10,
        mobileDataType: '_5G',
      },
      {
        planId: 2,
        planName: '5G 프리미엄 요금제',
        carrier: 'KT',
        mobileDataAmount: 20,
        isUltimatedAmount: false,
        sellMobileDataCapacityGB: 20,
        mobileDataType: '_5G',
      },
      {
        planId: 3,
        planName: '5G 무제한 요금제',
        carrier: 'KT',
        mobileDataAmount: 100,
        isUltimatedAmount: true,
        sellMobileDataCapacityGB: 100,
        mobileDataType: '_5G',
      },
    ] as Plan[],
    isLoading: false,
  },
  render: (args) => renderWithLayout(args, '마이페이지', true),
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
  },
};
