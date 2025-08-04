import type { Meta, StoryObj } from '@storybook/react';
import Image from 'next/image';

// Mock ExchangeList for Storybook
const MockExchangeList = () => {
  const mockItems = [
    {
      id: 1,
      title: 'SKT 5G 데이터 판매',
      carrier: 'SKT',
      networkType: '5G',
      capacity: '10GB',
      price: '1,500ZET',
      timeLeft: '2시간 전',
      sellerNickname: '데이터셀러',
      sellerId: 1,
      sellerProfileUrl: '/images/avatar.svg',
      isOwner: false,
    },
    {
      id: 2,
      title: 'KT 4G 데이터 판매',
      carrier: 'KT',
      networkType: '4G',
      capacity: '5GB',
      price: '800ZET',
      timeLeft: '1시간 전',
      sellerNickname: 'KT유저',
      sellerId: 2,
      sellerProfileUrl: '/images/avatar.svg',
      isOwner: false,
    },
    {
      id: 3,
      title: 'LG U+ 5G 데이터 판매',
      carrier: 'LG U+',
      networkType: '5G',
      capacity: '20GB',
      price: '2,500ZET',
      timeLeft: '30분 전',
      sellerNickname: 'LG유저',
      sellerId: 3,
      sellerProfileUrl: '/images/avatar.svg',
      isOwner: true,
    },
    {
      id: 4,
      title: 'SKT 4G 데이터 판매',
      carrier: 'SKT',
      networkType: '4G',
      capacity: '15GB',
      price: '2,000ZET',
      timeLeft: '5분 전',
      sellerNickname: 'SKT유저',
      sellerId: 4,
      sellerProfileUrl: '/images/avatar.svg',
      isOwner: false,
    },
    {
      id: 5,
      title: 'KT 5G 데이터 판매',
      carrier: 'KT',
      networkType: '5G',
      capacity: '8GB',
      price: '1,200ZET',
      timeLeft: '10분 전',
      sellerNickname: 'KT유저2',
      sellerId: 5,
      sellerProfileUrl: '/images/avatar.svg',
      isOwner: false,
    },
    {
      id: 6,
      title: 'LG U+ 4G 데이터 판매',
      carrier: 'LG U+',
      networkType: '4G',
      capacity: '12GB',
      price: '1,800ZET',
      timeLeft: '15분 전',
      sellerNickname: 'LG유저2',
      sellerId: 6,
      sellerProfileUrl: '/images/avatar.svg',
      isOwner: false,
    },
  ];

  const getCarrierIcon = (carrier: string) => {
    switch (carrier.toUpperCase()) {
      case 'SKT':
        return '/icons/carriers/skt.svg';
      case 'KT':
        return '/icons/carriers/kt.svg';
      case 'LG U+':
      case 'LGU+':
      case 'LGU':
        return '/icons/carriers/lgu.svg';
      default:
        return null;
    }
  };

  // Mock SellingItem component
  const MockSellingItem = ({
    carrier,
    networkType,
    capacity,
    price,
    title,
    timeLeft,
    isOwner = false,
    sellerNickname,
    sellerProfileUrl,
  }: {
    carrier: string;
    networkType: string;
    capacity: string;
    price: string;
    title: string;
    timeLeft: string;
    isOwner?: boolean;
    sellerNickname: string;
    sellerProfileUrl: string;
  }) => {
    const carrierIcon = getCarrierIcon(carrier);

    return (
      <div className="relative w-full max-w-[170px] sm:max-w-[190px] mb-8">
        {/* 카드 본체 */}
        <div className="relative z-10 p-3 rounded-2xl bg-[#0E213F] shadow-md border border-[#175F89] flex flex-col min-h-[200px]">
          {/* 뱃지들 */}
          <div className="flex gap-1 justify-between items-center mb-2">
            <div className="flex items-center gap-1">
              <div className="inline-flex items-center justify-center rounded-full border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 border-transparent bg-white text-gray-900">
                {carrierIcon && (
                  <Image
                    src={carrierIcon}
                    alt={carrier}
                    width={12}
                    height={12}
                    className="inline-block w-3 h-3"
                  />
                )}
              </div>
              <div className="inline-flex items-center justify-center rounded-full border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 border-transparent bg-[#175F89] text-white">
                {networkType}
              </div>
            </div>
            {/* 시간 영역 */}
            <span className="text-gray-400 text-[12px] text-right">{timeLeft}</span>
          </div>

          {/* 프로필 영역 */}
          <div className="mb-2">
            <div className="flex items-center gap-2">
              <div className="size-10 rounded-full overflow-hidden border border-cyan-400/30 hover:border-cyan-400 transition-colors flex-shrink-0">
                <Image
                  src={sellerProfileUrl || '/images/avatar.svg'}
                  alt={`${sellerNickname} 프로필`}
                  width={32}
                  height={32}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col min-w-0 flex-1">
                <span className="text-cyan-300 caption-12-bold font-medium truncate">
                  {sellerNickname}
                </span>
                <span className="text-gray-400 caption-12-regular">프로필 보기</span>
              </div>
            </div>
          </div>

          {/* 글 제목 */}
          <div className="mb-2">
            <span className="text-white text-sm font-semibold line-clamp-1 leading-tight">
              {title}
            </span>
          </div>

          {/* 용량 + 가격 */}
          <div className="flex justify-between items-baseline mb-2">
            <span className="text-white text-lg font-bold">{capacity}</span>
            <span className="text-cyan-300 text-lg font-bold">{price}</span>
          </div>

          {/* 구매/관리 버튼 */}
          <div className="flex justify-between items-center gap-1 mt-auto">
            {!isOwner ? (
              <>
                <button className="exploration-button flex items-center justify-center">
                  구매하기
                </button>
                <button className="h-fit w-fit px-2 text-xs hover:bg-accent hover:text-accent-foreground p-1 hover:bg-red-500/20 rounded-full">
                  <svg className="w-3 h-3 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </>
            ) : (
              <div className="flex justify-end items-center w-full gap-1">
                <button className="h-fit w-fit px-2 text-xs hover:bg-accent hover:text-accent-foreground p-1 hover:bg-white/10 rounded-full">
                  <svg
                    className="w-3 h-3 text-white/70 hover:text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </button>
                <button className="h-fit w-fit px-2 text-xs hover:bg-accent hover:text-accent-foreground p-1 hover:bg-red-500/20 rounded-full">
                  <svg
                    className="w-3 h-3 text-red-300 hover:text-red-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 받침대 */}
        <Image
          src="/images/exchange/stone.svg"
          alt="stone"
          width={260}
          height={60}
          className="absolute bottom-[-2rem] left-1/2 -translate-x-1/2 z-0"
        />
      </div>
    );
  };

  return (
    <div className="w-full">
      {/* 게시물 목록 컨테이너 */}
      <section role="feed" aria-label="데이터 거래 게시물 목록" aria-live="polite">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 justify-center">
          {mockItems.map((item) => (
            <div key={item.id} className="flex justify-center">
              <MockSellingItem
                title={item.title}
                carrier={item.carrier}
                networkType={item.networkType}
                capacity={item.capacity}
                price={item.price}
                timeLeft={item.timeLeft}
                isOwner={item.isOwner}
                sellerNickname={item.sellerNickname}
                sellerProfileUrl={item.sellerProfileUrl}
              />
            </div>
          ))}
        </div>

        {/* 무한스크롤 상태 표시 */}
        <div
          className="w-full py-8 flex justify-center"
          role="status"
          aria-label="추가 콘텐츠 로딩 상태"
        >
          <div className="text-gray-400 text-sm text-center">
            <div className="flex flex-col items-center gap-2">
              <p>🎉 모든 게시글을 불러왔습니다!</p>
              <p className="text-xs text-gray-500">총 {mockItems.length}개의 상품</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const meta: Meta<typeof MockExchangeList> = {
  title: 'Exchange/ExchangeList',
  component: MockExchangeList,
  parameters: {
    layout: 'padded',
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof MockExchangeList>;

export const Default: Story = {
  args: {},
  decorators: [
    (Story) => (
      <div className="h-full flex flex-col bg-gray-900">
        <div className="px-4 pt-4">
          <Story />
        </div>
      </div>
    ),
  ],
};

export const WithPurchaseLoading: Story = {
  args: {},
  decorators: [
    (Story) => (
      <div className="h-full flex flex-col bg-gray-900">
        <div className="px-4 pt-4 relative">
          <Story />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="text-white">구매 처리 중...</div>
          </div>
        </div>
      </div>
    ),
  ],
};
