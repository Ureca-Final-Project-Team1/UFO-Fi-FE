import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

// Mock OcrInputSection for Storybook
const MockOcrInputSection = ({
  className = '',
  plans = [
    { planName: '5G 기본 요금제', sellMobileDataCapacityGB: 10, mobileDataType: '_5G' },
    { planName: '5G 프리미엄 요금제', sellMobileDataCapacityGB: 20, mobileDataType: '_5G' },
    { planName: '5G 무제한 요금제', sellMobileDataCapacityGB: 100, mobileDataType: '_5G' },
  ],
  isLoading = false,
  setMaxData,
  setNetworkType,
  setForm,
}: {
  className?: string;
  plans?: Array<{ planName: string; sellMobileDataCapacityGB: number; mobileDataType: string }>;
  isLoading?: boolean;
  setMaxData?: (maxData: number | null) => void;
  setNetworkType?: (networkType: string) => void;
  setForm?: (form: { carrier?: string; planName?: string }) => void;
}) => {
  const [selectedCarrier, setSelectedCarrier] = useState('');
  const [selectedPlan, setSelectedPlan] = useState('');
  const [carrierError, setCarrierError] = useState('');
  const [planError, setPlanError] = useState('');

  const handleCarrierChange = (carrier: string) => {
    setSelectedCarrier(carrier);
    setSelectedPlan('');
    setCarrierError('');
    setForm?.({ carrier, planName: '' });
    setMaxData?.(null);
    setNetworkType?.('');
  };

  const handlePlanChange = (planName: string) => {
    setSelectedPlan(planName);
    setPlanError('');
    setForm?.({ planName });

    const selected = plans.find((p) => p.planName === planName);
    if (selected) {
      setMaxData?.(selected.sellMobileDataCapacityGB);
      setNetworkType?.(selected.mobileDataType.replace(/^_/, ''));
    }
  };

  const handleFileUpload = () => {
    // Mock OCR functionality
    console.log('OCR 처리 중...');
  };

  return (
    <div className={`flex flex-col gap-5 w-full ${className}`}>
      {/* 통신사 */}
      <div className="w-full">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          통신사 정보
          {carrierError && <p className="text-red-500 text-xs mt-1">{carrierError}</p>}
        </label>
        <select
          value={selectedCarrier}
          onChange={(e) => handleCarrierChange(e.target.value)}
          disabled={isLoading}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
        >
          <option value="">통신사 선택</option>
          <option value="SKT">SKT</option>
          <option value="LGU">LG U+</option>
          <option value="KT">KT</option>
        </select>
      </div>

      {/* 요금제 */}
      <div className="w-full">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          요금제 정보
          {planError && <p className="text-red-500 text-xs mt-1">{planError}</p>}
        </label>
        <select
          value={selectedPlan}
          onChange={(e) => handlePlanChange(e.target.value)}
          disabled={isLoading || !selectedCarrier}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
        >
          <option value="">요금제 선택</option>
          {plans.map((plan) => (
            <option key={plan.planName} value={plan.planName}>
              {plan.planName}
            </option>
          ))}
        </select>
      </div>

      {/* OCR 버튼 */}
      <div className="w-full">
        <div className="pb-4">
          <button
            type="button"
            onClick={handleFileUpload}
            disabled={isLoading}
            className={`w-full p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 transition-colors ${
              isLoading ? 'bg-gray-100 cursor-not-allowed' : 'bg-white cursor-pointer'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <span className="text-2xl">📷</span>
              <p className="text-gray-600">
                {isLoading ? 'OCR 처리 중...' : '캡처 이미지로 요금제 자동 입력'}
              </p>
            </div>
          </button>
        </div>
      </div>

      {/* Mock status display */}
      <div className="mt-4 p-4 bg-gray-100 rounded-lg text-sm">
        <div>선택된 통신사: {selectedCarrier || '없음'}</div>
        <div>선택된 요금제: {selectedPlan || '없음'}</div>
        <div>로딩 상태: {isLoading ? '로딩 중' : '완료'}</div>
      </div>
    </div>
  );
};

const meta: Meta<typeof MockOcrInputSection> = {
  title: 'Signup/OcrInputSection',
  component: MockOcrInputSection,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    setMaxData: { action: 'max data set' },
    setNetworkType: { action: 'network type set' },
    setForm: { action: 'form updated' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    plans: [
      { planName: '5G 기본 요금제', sellMobileDataCapacityGB: 10, mobileDataType: '_5G' },
      { planName: '5G 프리미엄 요금제', sellMobileDataCapacityGB: 20, mobileDataType: '_5G' },
      { planName: '5G 무제한 요금제', sellMobileDataCapacityGB: 100, mobileDataType: '_5G' },
    ],
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
    plans: [
      { planName: '5G 기본 요금제', sellMobileDataCapacityGB: 10, mobileDataType: '_5G' },
      { planName: '5G 프리미엄 요금제', sellMobileDataCapacityGB: 20, mobileDataType: '_5G' },
    ],
  },
};

export const WithSelection: Story = {
  args: {
    plans: [
      { planName: '5G 기본 요금제', sellMobileDataCapacityGB: 10, mobileDataType: '_5G' },
      { planName: '5G 프리미엄 요금제', sellMobileDataCapacityGB: 20, mobileDataType: '_5G' },
      { planName: '5G 무제한 요금제', sellMobileDataCapacityGB: 100, mobileDataType: '_5G' },
    ],
  },
};

export const ManyPlans: Story = {
  args: {
    plans: [
      { planName: '5G 기본 요금제', sellMobileDataCapacityGB: 10, mobileDataType: '_5G' },
      { planName: '5G 프리미엄 요금제', sellMobileDataCapacityGB: 20, mobileDataType: '_5G' },
      { planName: '5G 무제한 요금제', sellMobileDataCapacityGB: 100, mobileDataType: '_5G' },
      { planName: '4G 기본 요금제', sellMobileDataCapacityGB: 5, mobileDataType: '_4G' },
      { planName: '4G 프리미엄 요금제', sellMobileDataCapacityGB: 15, mobileDataType: '_4G' },
      { planName: '4G 무제한 요금제', sellMobileDataCapacityGB: 50, mobileDataType: '_4G' },
    ],
  },
};

export const NoPlans: Story = {
  args: {
    plans: [],
  },
};
