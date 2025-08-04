import type { Meta, StoryObj } from '@storybook/react';
import Image from 'next/image';
import { useState } from 'react';

import { ICON_PATHS } from '@/constants/icons';
import { IMAGE_PATHS } from '@/constants/images';
import { Icon, Button, PriceInput } from '@/shared';

import { BulkCapacitySlider } from './BulkCapacitySlider';

const InteractiveWrapper = ({
  initialValue,
  maxCapacity,
  children,
}: {
  initialValue: number[];
  maxCapacity: number;
  children: (
    value: number[],
    setValue: React.Dispatch<React.SetStateAction<number[]>>,
    maxCapacity: number,
  ) => React.ReactNode;
}) => {
  const [value, setValue] = useState(initialValue);
  return <>{children(value, setValue, maxCapacity)}</>;
};

const meta: Meta<typeof BulkCapacitySlider> = {
  title: 'Components/Bulk/BulkCapacitySlider',
  component: BulkCapacitySlider,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      description: '현재 선택된 용량값 (배열)',
      control: 'object',
    },
    setValue: {
      description: '용량값 변경 함수',
      action: 'setValue',
    },
    maxCapacity: {
      description: '최대 용량',
      control: { type: 'number', min: 1, max: 100 },
    },
  },
};

export default meta;
type Story = StoryObj<typeof BulkCapacitySlider>;

// 기본 스토리 (실제 일괄구매 페이지와 동일한 레이아웃)
export const Default: Story = {
  render: (args) => (
    <InteractiveWrapper initialValue={args.value} maxCapacity={args.maxCapacity}>
      {(value, setValue, maxCapacity) => (
        <div className="pb-10 bg-gray-900 min-h-screen">
          {/* 헤더 - Title 컴포넌트 대신 직접 구현 */}
          <header className="flex items-center justify-between px-4 py-4 border-b border-gray-800">
            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
                <Icon name="ArrowLeft" className="w-5 h-5 text-white" />
              </button>
              <h1 className="text-white font-bold text-lg">일괄구매</h1>
            </div>
          </header>

          <main className="relative rounded-[20px] space-y-6 pb-12 px-4">
            {/* 거래 제안서 헤더 */}
            <header className="flex items-center space-x-3">
              <Icon name="FilePenLine" color="white" aria-hidden="true" />
              <h1 className="text-white font-bold text-lg">거래 제안서</h1>
            </header>

            {/* 외계 데이터 중개소 설명 */}
            <section className="space-y-3 flex flex-col justify-center items-center">
              <Icon src={ICON_PATHS.UFO_LOGO} alt="UFO-Fi 로고" size="xl" />
              <h2 className="text-center text-white font-bold text-xl">외계 데이터 중개소</h2>
              <div className="text-center">
                <p className="text-white text-base">제가 최저가 조합을 찾아드릴게요!</p>
                <p className="text-sm text-amber-300 mt-1">
                  (지불 가능한 금액 내에서 조합이 생성됩니다!)
                </p>
              </div>
            </section>

            {/* 구매 데이터 용량 섹션 */}
            <section className="space-y-4">
              <div className="flex items-center space-x-2">
                <Icon name="Sticker" size={20} aria-hidden="true" />
                <h2 className="text-white font-bold text-lg">구매 데이터 용량</h2>
              </div>

              {/* 용량 표시 및 슬라이더 */}
              <div className="text-center">
                <BulkCapacitySlider
                  {...args}
                  value={value}
                  setValue={setValue}
                  maxCapacity={maxCapacity}
                />
              </div>
            </section>

            {/* GB당 최대 예산 섹션 */}
            <section className="space-y-4 relative">
              <h2 className="text-white font-bold text-lg">GB당 최대 예산</h2>

              {/* 가격 입력 부분 */}
              <div className="flex items-center gap-2">
                <Icon src={ICON_PATHS['COIN']} className="size-4" aria-hidden="true" />
                <span className="text-cyan-400 caption-14-bold">1GB 당</span>
                <div className="w-28 h-10 flex justify-center items-center px-2">
                  <PriceInput
                    value="1000"
                    onChange={() => {}}
                    placeholder="금액"
                    variant="blueFill"
                  />
                </div>
                <div className="text-yellow-400 caption-14-bold">ZET</div>
              </div>

              {/* 외계인 캐릭터 */}
              <div
                className="absolute h-full right-0"
                aria-hidden="true"
                style={{
                  right: '-30px',
                  bottom: '-100px',
                }}
              >
                <Image
                  src={IMAGE_PATHS.AL_BULK_PURCHASE}
                  alt=""
                  width={200}
                  height={200}
                  priority
                />
              </div>
            </section>

            {/* 하단 버튼 */}
            <div className="w-full pt-8 flex justify-start">
              <Button
                type="button"
                size="default"
                onClick={() => {}}
                variant="exploration-button"
                className="px-8 py-3 min-w-[200px]"
              >
                최적 조합 보기
              </Button>
            </div>
          </main>
        </div>
      )}
    </InteractiveWrapper>
  ),
  args: {
    value: [50],
    maxCapacity: 100,
  },
};

// 초기값이 0인 경우
export const InitialZero: Story = {
  render: (args) => (
    <InteractiveWrapper initialValue={args.value} maxCapacity={args.maxCapacity}>
      {(value, setValue, maxCapacity) => (
        <div className="pb-10 bg-gray-900 min-h-screen">
          {/* 헤더 - Title 컴포넌트 대신 직접 구현 */}
          <header className="flex items-center justify-between px-4 py-4 border-b border-gray-800">
            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
                <Icon name="ArrowLeft" className="w-5 h-5 text-white" />
              </button>
              <h1 className="text-white font-bold text-lg">일괄구매</h1>
            </div>
          </header>

          <main className="relative rounded-[20px] space-y-6 pb-12 px-4">
            {/* 거래 제안서 헤더 */}
            <header className="flex items-center space-x-3">
              <Icon name="FilePenLine" color="white" aria-hidden="true" />
              <h1 className="text-white font-bold text-lg">거래 제안서</h1>
            </header>

            {/* 외계 데이터 중개소 설명 */}
            <section className="space-y-3 flex flex-col justify-center items-center">
              <Icon src={ICON_PATHS.UFO_LOGO} alt="UFO-Fi 로고" size="xl" />
              <h2 className="text-center text-white font-bold text-xl">외계 데이터 중개소</h2>
              <div className="text-center">
                <p className="text-white text-base">제가 최저가 조합을 찾아드릴게요!</p>
                <p className="text-sm text-amber-300 mt-1">
                  (지불 가능한 금액 내에서 조합이 생성됩니다!)
                </p>
              </div>
            </section>

            {/* 구매 데이터 용량 섹션 */}
            <section className="space-y-4">
              <div className="flex items-center space-x-2">
                <Icon name="Sticker" size={20} aria-hidden="true" />
                <h2 className="text-white font-bold text-lg">구매 데이터 용량</h2>
              </div>

              {/* 용량 표시 및 슬라이더 */}
              <div className="text-center">
                <BulkCapacitySlider
                  {...args}
                  value={value}
                  setValue={setValue}
                  maxCapacity={maxCapacity}
                />
              </div>
            </section>

            {/* GB당 최대 예산 섹션 */}
            <section className="space-y-4 relative">
              <h2 className="text-white font-bold text-lg">GB당 최대 예산</h2>

              {/* 가격 입력 부분 */}
              <div className="flex items-center gap-2">
                <Icon src={ICON_PATHS['COIN']} className="size-4" aria-hidden="true" />
                <span className="text-cyan-400 caption-14-bold">1GB 당</span>
                <div className="w-28 h-10 flex justify-center items-center px-2">
                  <PriceInput
                    value="1000"
                    onChange={() => {}}
                    placeholder="금액"
                    variant="blueFill"
                  />
                </div>
                <div className="text-yellow-400 caption-14-bold">ZET</div>
              </div>

              {/* 외계인 캐릭터 */}
              <div
                className="absolute h-full right-0"
                aria-hidden="true"
                style={{
                  right: '-30px',
                  bottom: '-100px',
                }}
              >
                <Image
                  src={IMAGE_PATHS.AL_BULK_PURCHASE}
                  alt=""
                  width={200}
                  height={200}
                  priority
                />
              </div>
            </section>

            {/* 하단 버튼 */}
            <div className="w-full pt-8 flex justify-start">
              <Button
                type="button"
                size="default"
                onClick={() => {}}
                variant="exploration-button"
                className="px-8 py-3 min-w-[200px]"
              >
                최적 조합 보기
              </Button>
            </div>
          </main>
        </div>
      )}
    </InteractiveWrapper>
  ),
  args: {
    value: [0],
    maxCapacity: 100,
  },
};

// 데스크톱 뷰
export const Desktop: Story = {
  render: (args) => (
    <InteractiveWrapper initialValue={args.value} maxCapacity={args.maxCapacity}>
      {(value, setValue, maxCapacity) => (
        <div className="pb-10 bg-gray-900 min-h-screen">
          {/* 헤더 - Title 컴포넌트 대신 직접 구현 */}
          <header className="flex items-center justify-between px-4 py-4 border-b border-gray-800">
            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
                <Icon name="ArrowLeft" className="w-5 h-5 text-white" />
              </button>
              <h1 className="text-white font-bold text-lg">일괄구매</h1>
            </div>
          </header>

          <main className="relative rounded-[20px] space-y-6 pb-12 px-4">
            {/* 거래 제안서 헤더 */}
            <header className="flex items-center space-x-3">
              <Icon name="FilePenLine" color="white" aria-hidden="true" />
              <h1 className="text-white font-bold text-lg">거래 제안서</h1>
            </header>

            {/* 외계 데이터 중개소 설명 */}
            <section className="space-y-3 flex flex-col justify-center items-center">
              <Icon src={ICON_PATHS.UFO_LOGO} alt="UFO-Fi 로고" size="xl" />
              <h2 className="text-center text-white font-bold text-xl">외계 데이터 중개소</h2>
              <div className="text-center">
                <p className="text-white text-base">제가 최저가 조합을 찾아드릴게요!</p>
                <p className="text-sm text-amber-300 mt-1">
                  (지불 가능한 금액 내에서 조합이 생성됩니다!)
                </p>
              </div>
            </section>

            {/* 구매 데이터 용량 섹션 */}
            <section className="space-y-4">
              <div className="flex items-center space-x-2">
                <Icon name="Sticker" size={20} aria-hidden="true" />
                <h2 className="text-white font-bold text-lg">구매 데이터 용량</h2>
              </div>

              {/* 용량 표시 및 슬라이더 */}
              <div className="text-center">
                <BulkCapacitySlider
                  {...args}
                  value={value}
                  setValue={setValue}
                  maxCapacity={maxCapacity}
                />
              </div>
            </section>

            {/* GB당 최대 예산 섹션 */}
            <section className="space-y-4 relative">
              <h2 className="text-white font-bold text-lg">GB당 최대 예산</h2>

              {/* 가격 입력 부분 */}
              <div className="flex items-center gap-2">
                <Icon src={ICON_PATHS['COIN']} className="size-4" aria-hidden="true" />
                <span className="text-cyan-400 caption-14-bold">1GB 당</span>
                <div className="w-28 h-10 flex justify-center items-center px-2">
                  <PriceInput
                    value="1000"
                    onChange={() => {}}
                    placeholder="금액"
                    variant="blueFill"
                  />
                </div>
                <div className="text-yellow-400 caption-14-bold">ZET</div>
              </div>

              {/* 외계인 캐릭터 */}
              <div
                className="absolute h-full right-0"
                aria-hidden="true"
                style={{
                  right: '-50px',
                  bottom: '-150px',
                }}
              >
                <Image
                  src={IMAGE_PATHS.AL_BULK_PURCHASE}
                  alt=""
                  width={300}
                  height={300}
                  priority
                />
              </div>
            </section>

            {/* 하단 버튼 */}
            <div className="w-full pt-8 flex justify-start">
              <Button
                type="button"
                size="lg"
                onClick={() => {}}
                variant="exploration-button"
                className="px-8 py-3 min-w-[200px]"
              >
                최적 조합 보기
              </Button>
            </div>
          </main>
        </div>
      )}
    </InteractiveWrapper>
  ),
  args: {
    value: [75],
    maxCapacity: 100,
  },
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
  },
};
