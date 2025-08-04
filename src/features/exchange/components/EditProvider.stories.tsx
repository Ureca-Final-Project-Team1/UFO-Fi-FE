import type { Meta, StoryObj } from '@storybook/react';
import Image from 'next/image';

// Mock EditProvider for Storybook (실제 EditProvider와 동일한 구조)
const MockEditProvider = ({ children }: { children: React.ReactNode }) => {
  return <div className="min-h-screen w-full bg-gray-900">{children}</div>;
};

// Mock Loading 컴포넌트 (실제 Loading 컴포넌트와 동일한 구조)
const MockLoading = () => {
  return (
    <div className="flex items-center justify-center min-h-[80vh] w-full flex-col gap-2">
      <div className="relative">
        <Image
          src="/images/alien-success.svg"
          alt="로딩 중..."
          width={64}
          height={64}
          className="mx-auto animate-bounce"
          priority
        />
        <div className="absolute -top-1 -right-1 size-3 bg-cyan-400 rounded-full animate-ping opacity-75" />
        <div
          className="absolute -bottom-1 -left-1 size-2 bg-purple-400 rounded-full animate-ping opacity-75"
          style={{ animationDelay: '0.5s' }}
        />
      </div>
      <span className="text-white caption-14-regular">로딩 중...</span>
    </div>
  );
};

// Mock SellEditPage (실제 sell/edit/[id]/page.tsx와 동일한 구조)
const MockSellEditPage = () => {
  return (
    <div className="relative w-full min-h-full flex flex-col">
      {/* Title 컴포넌트 */}
      <div className="flex items-center justify-between px-4 pt-4 pb-2">
        <div className="flex items-center gap-3">
          <button className="p-2">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <h1 className="text-white text-lg font-bold">데이터 판매 수정</h1>
        </div>
      </div>

      {/* 메인 컨텐츠 영역 */}
      <div className="flex-1 space-y-6 py-4 px-4">
        {/* 거래명세서 타이틀 */}
        <div className="flex items-center space-x-3">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <h2 className="text-white font-bold text-lg">거래명세서 수정</h2>
        </div>

        {/* 통신사 + 제목 입력 */}
        <div className="rounded-lg p-3 space-y-2">
          <div className="flex items-center space-x-2 w-full">
            <div className="w-9 h-9 px-0.5 bg-white/50 rounded-lg shadow-[0px_2px_4px_0px_rgba(0,0,0,0.25)] inline-flex justify-center items-center gap-1 flex-shrink-0">
              <Image src="/icons/carriers/skt.svg" alt="SKT" width={20} height={20} />
            </div>

            <div className="flex-1 min-w-0">
              <input
                type="text"
                defaultValue="SKT 5GB 데이터 팝니다"
                placeholder="글 제목을 입력해주세요."
                className="w-full p-3 bg-[#0E213F] text-white rounded-lg border border-[#175F89] focus:border-cyan-400 focus:outline-none"
                maxLength={10}
              />
            </div>
          </div>
          <div className="text-xs text-right text-white/60">10/10</div>
        </div>

        {/* 판매 용량 설정 슬라이더 */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-white text-sm font-medium">판매 용량</span>
            <span className="text-cyan-400 text-sm font-bold">5 GB</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div className="bg-cyan-400 h-2 rounded-full" style={{ width: '50%' }}></div>
          </div>
          <div className="flex justify-between text-xs text-gray-400">
            <span>1 GB</span>
            <span>10 GB</span>
          </div>
        </div>

        {/* 1GB당 가격 입력 */}
        <div className="flex justify-center items-center gap-3.5 px-4">
          <div className="text-center text-cyan-400 text-lg font-semibold leading-relaxed whitespace-nowrap">
            1GB 당
          </div>

          <div className="w-28 h-10 flex justify-center items-center px-2">
            <input
              type="number"
              defaultValue="90"
              className="w-full p-2 bg-[#0E213F] text-white rounded-lg border border-[#175F89] focus:border-cyan-400 focus:outline-none text-center"
              placeholder="금액"
            />
          </div>

          <div className="text-center text-cyan-400 text-lg font-semibold leading-relaxed whitespace-nowrap">
            ZET
          </div>
        </div>

        {/* 총 판매 금액 표시 */}
        <div className="bg-[#0E213F] rounded-lg p-4 border border-[#175F89]">
          <div className="flex justify-between items-center">
            <span className="text-white text-sm">총 판매 금액</span>
            <span className="text-cyan-400 text-lg font-bold">450 ZET</span>
          </div>
        </div>

        <div className="pt-4 relative">
          {/* 수정 버튼 */}
          <button className="w-full px-6 py-3 min-h-[48px] bg-primary-300 text-primary-text-dark font-bold text-[15px] hover:bg-primary-hover rounded-lg transition-colors relative z-10">
            수정완료
          </button>

          {/* 캐릭터 */}
          <div className="absolute pointer-events-none" style={{ left: '0px', bottom: '-20px' }}>
            <Image
              src="/images/alien-sell.svg"
              alt="판매 우주인"
              width={160}
              height={160}
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const meta: Meta<typeof MockEditProvider> = {
  title: 'Exchange/EditProvider',
  component: MockEditProvider,
  parameters: {
    layout: 'padded',
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof MockEditProvider>;

export const Default: Story = {
  args: {
    children: <MockSellEditPage />,
  },
  decorators: [
    (Story) => (
      <div className="h-full flex flex-col bg-gray-900">
        <Story />
      </div>
    ),
  ],
};

export const Loading: Story = {
  args: {
    children: <MockLoading />,
  },
  decorators: [
    (Story) => (
      <div className="h-full flex flex-col bg-gray-900">
        <Story />
      </div>
    ),
  ],
};

export const WithFormContent: Story = {
  args: {
    children: <MockSellEditPage />,
  },
  decorators: [
    (Story) => (
      <div className="h-full flex flex-col bg-gray-900">
        <Story />
      </div>
    ),
  ],
};
