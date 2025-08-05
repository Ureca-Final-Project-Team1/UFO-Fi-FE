import type { Meta, StoryObj } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm, FieldError } from 'react-hook-form';

import { Carrier } from '@/backend/types/carrier';
import type { Plan } from '@/backend/types/plan';

import { OCRInputSection } from './OcrInputSection';

// QueryClient 인스턴스 생성
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});

// Mock OcrInputSection for Storybook
const MockOcrInputSection = ({
  isLoading = false,
  hasError = false,
  isOcrProcessing = false,
}: {
  isLoading?: boolean;
  hasError?: boolean;
  isOcrProcessing?: boolean;
}) => {
  const [plans, setPlans] = useState<Plan[]>([
    {
      planId: 1,
      planName: '5G 기본 요금제',
      carrier: Carrier.SKT,
      mobileDataAmount: 10,
      isUltimatedAmount: false,
      sellMobileDataCapacityGB: 10,
      mobileDataType: '_5G',
    },
    {
      planId: 2,
      planName: '5G 프리미엄 요금제',
      carrier: Carrier.SKT,
      mobileDataAmount: 20,
      isUltimatedAmount: false,
      sellMobileDataCapacityGB: 20,
      mobileDataType: '_5G',
    },
    {
      planId: 3,
      planName: '5G 무제한 요금제',
      carrier: Carrier.SKT,
      mobileDataAmount: 100,
      isUltimatedAmount: true,
      sellMobileDataCapacityGB: 100,
      mobileDataType: '_5G',
    },
  ]);

  // 실제 react-hook-form 사용
  const {
    control,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      carrier: '',
      planName: '',
    },
  });

  const mockSetPlans = (newPlans: Plan[]) => setPlans(newPlans);
  const mockSetMaxData = (maxData: number | null) => console.warn('Max Data:', maxData);
  const mockSetNetworkType = (networkType: string) => console.warn('Network Type:', networkType);
  const mockSetForm = (form: { carrier?: string; planName?: string }) =>
    console.warn('Form:', form);

  // 에러 상태 시뮬레이션
  const mockErrors = hasError
    ? {
        carrier: { type: 'required', message: '통신사를 선택해주세요.' } as FieldError,
        planName: { type: 'required', message: '요금제를 선택해주세요.' } as FieldError,
      }
    : errors;

  return (
    <QueryClientProvider client={queryClient}>
      <div className="w-full bg-gray-900 p-4">
        <div className="max-w-md mx-auto">
          <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg border border-gray-700">
            <h2 className="text-white text-base font-semibold mb-4">OCR 요금제 입력 섹션</h2>

            <OCRInputSection
              className=""
              control={control}
              errors={mockErrors}
              setValue={setValue}
              plans={plans}
              setPlans={mockSetPlans}
              setMaxData={mockSetMaxData}
              setNetworkType={mockSetNetworkType}
              isLoading={isLoading}
              setIsLoading={() => {}}
              setForm={mockSetForm}
            />

            {/* 상태 표시 */}
            <div className="mt-4 p-3 bg-blue-500/20 border border-blue-500/30 rounded-lg">
              <p className="text-blue-300 text-sm">
                <strong>선택된 통신사:</strong> {watch('carrier') || '없음'}
              </p>
              <p className="text-blue-300 text-sm">
                <strong>선택된 요금제:</strong> {watch('planName') || '없음'}
              </p>
              <p className="text-blue-300 text-sm">
                <strong>로딩 상태:</strong> {isLoading ? '로딩 중' : '완료'}
              </p>
              {isOcrProcessing && (
                <p className="text-yellow-300 text-sm">
                  <strong>OCR 처리 중...</strong>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </QueryClientProvider>
  );
};

const meta: Meta<typeof MockOcrInputSection> = {
  title: 'Signup/OcrInputSection',
  component: MockOcrInputSection,
  parameters: {
    layout: 'padded',
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    isLoading: {
      control: { type: 'boolean' },
      description: '로딩 상태',
    },
    hasError: {
      control: { type: 'boolean' },
      description: '에러 상태',
    },
    isOcrProcessing: {
      control: { type: 'boolean' },
      description: 'OCR 처리 상태',
    },
  },
};

export default meta;
type Story = StoryObj<typeof MockOcrInputSection>;

export const Default: Story = {
  args: {
    isLoading: false,
    hasError: false,
    isOcrProcessing: false,
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
    hasError: false,
    isOcrProcessing: false,
  },
};

export const WithErrors: Story = {
  args: {
    isLoading: false,
    hasError: true,
    isOcrProcessing: false,
  },
};

export const OcrProcessing: Story = {
  args: {
    isLoading: false,
    hasError: false,
    isOcrProcessing: true,
  },
};

export const Desktop: Story = {
  args: {
    isLoading: false,
    hasError: false,
    isOcrProcessing: false,
  },
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
  },
};
