import type { Meta, StoryObj } from '@storybook/react';

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
      sellerProfileUrl: '/images/avatar.png',
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
      sellerProfileUrl: '/images/avatar.png',
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
      sellerProfileUrl: '/images/avatar.png',
      isOwner: true,
    },
  ];

  return (
    <div className="w-full">
      <section role="feed" aria-label="데이터 거래 게시물 목록" aria-live="polite">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 justify-center">
          {mockItems.map((item) => (
            <div key={item.id} className="flex justify-center">
              <div className="relative w-full max-w-[170px] sm:max-w-[190px] mb-8">
                <div className="relative z-10 p-3 rounded-2xl bg-[#0E213F] shadow-md border border-[#175F89] flex flex-col min-h-[200px]">
                  {/* 뱃지들 */}
                  <div className="flex gap-1 justify-between items-center mb-2">
                    <div className="flex items-center gap-1">
                      <div className="text-[9px] px-2 py-0.5 bg-blue-500 text-white rounded">
                        {item.carrier}
                      </div>
                      <div className="text-[9px] px-2 py-0.5 bg-gray-500 text-white rounded">
                        {item.networkType}
                      </div>
                    </div>
                    <span className="text-gray-400 text-[12px] text-right">{item.timeLeft}</span>
                  </div>

                  {/* 프로필 영역 */}
                  <div className="mb-2">
                    <div className="flex items-center gap-2">
                      <div className="size-10 rounded-full overflow-hidden border border-cyan-400/30 bg-gray-600 flex items-center justify-center">
                        👤
                      </div>
                      <div className="flex flex-col min-w-0 flex-1">
                        <span className="text-cyan-300 text-xs font-medium truncate">
                          {item.sellerNickname}
                        </span>
                        <span className="text-gray-400 text-xs">프로필 보기</span>
                      </div>
                    </div>
                  </div>

                  {/* 제목 */}
                  <div className="mb-2">
                    <h3 className="text-white text-sm font-medium line-clamp-2">{item.title}</h3>
                  </div>

                  {/* 용량과 가격 */}
                  <div className="mt-auto space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400 text-xs">{item.capacity}</span>
                      <span className="text-cyan-400 text-sm font-bold">{item.price}</span>
                    </div>
                    <div className="text-gray-400 text-xs">판매 중</div>
                    <div className="flex justify-between items-center">
                      <button className="text-xs bg-blue-500 text-white px-2 py-1 rounded">
                        구매하기
                      </button>
                      {item.isOwner ? (
                        <div className="flex gap-1">
                          <button className="text-xs bg-gray-500 text-white px-2 py-1 rounded">
                            수정
                          </button>
                          <button className="text-xs bg-red-500 text-white px-2 py-1 rounded">
                            삭제
                          </button>
                        </div>
                      ) : (
                        <button className="text-xs bg-gray-500 text-white px-2 py-1 rounded">
                          신고
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
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
  },
  tags: ['autodocs'],
  argTypes: {
    onEdit: { action: 'edit clicked' },
    onDelete: { action: 'delete clicked' },
    onReport: { action: 'report clicked' },
    onPurchase: { action: 'purchase clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithPurchaseLoading: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: '구매 로딩 상태를 시뮬레이션합니다.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="relative">
        <Story />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-white">구매 처리 중...</div>
        </div>
      </div>
    ),
  ],
};
