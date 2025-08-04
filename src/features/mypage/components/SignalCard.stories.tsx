import type { Meta, StoryObj } from '@storybook/react';

// Mock SignalCard for Storybook
const MockSignalCard = ({
  userId = '지구인123',
  zetAmount = 1500,
  availableData = 5,
  maxData = 10,
  honorifics = [
    { name: '초보 탐험가', isActive: true },
    { name: '중급 탐험가', isActive: false },
    { name: '고급 탐험가', isActive: false },
  ],
}: {
  userId?: string;
  zetAmount?: number;
  availableData?: number;
  maxData?: number;
  honorifics?: Array<{ name: string; isActive: boolean }>;
}) => {
  const formatZetAmount = (amount: number): string => {
    if (amount >= 99999) {
      return '99,999+';
    }
    return amount.toLocaleString();
  };

  const formattedZet = formatZetAmount(zetAmount);
  const activeHonorific = honorifics.find((h) => h.isActive);

  return (
    <section
      className="rounded-xl shadow-lg border-[4px] w-full max-w-[620px] mx-auto"
      style={{
        borderColor: '#735AB1',
        backgroundColor: '#f8f9fa',
      }}
      role="region"
      aria-labelledby="signal-card-title"
    >
      {/* 헤더 */}
      <header className="text-center py-2 px-2">
        <h2 id="signal-card-title" className="text-lg font-black text-gray-800">
          UPHONIAN SIGNAL CARD
        </h2>
        <p className="text-xs text-gray-600 opacity-60">EARTH-BASED FIELD IDENTIFICATION</p>
        <hr className="my-1 border-black/30" />
      </header>

      {/* 메인 컨텐츠 */}
      <div className="flex justify-between items-start px-2 sm:px-4 md:px-6 pb-3 gap-2 sm:gap-3 md:gap-4">
        {/* 왼쪽 프로필 */}
        <div className="flex flex-col items-center shrink-0">
          <div className="border w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-md overflow-hidden">
            <div className="w-full h-full bg-gray-300 flex items-center justify-center">👤</div>
          </div>

          {/* 칭호 */}
          <div className="mt-1 sm:mt-2">
            {activeHonorific ? (
              <div className="w-[4.5rem] sm:w-[5rem] px-2 py-0.5 rounded-md text-[10px] sm:text-xs text-white font-medium bg-purple-600 text-center">
                {activeHonorific.name}
              </div>
            ) : (
              <div className="w-[4.5rem] sm:w-[5rem] px-2 py-0.5 rounded-md text-[10px] sm:text-xs text-gray-500 bg-gray-100 font-medium border border-gray-200 text-center">
                신분 미확인
              </div>
            )}
          </div>
        </div>

        {/* 가운데 사용자 정보 */}
        <div className="flex-1 space-y-1 min-w-0 max-w-[180px] sm:max-w-none">
          <div className="flex justify-between items-start gap-2">
            <h3 className="text-base sm:text-lg font-bold text-black truncate flex-1">{userId}</h3>
          </div>

          <div className="text-xs font-bold text-gray-800">
            <span className="truncate">이번 달 판매 가능 용량</span>
          </div>

          {/* 프로그레스 바 */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full"
              style={{ width: `${(availableData / maxData) * 100}%` }}
            ></div>
          </div>
          <div className="text-xs text-gray-600">
            {availableData}/{maxData}GB
          </div>

          <hr className="border-black/30" />

          <div className="text-xs font-bold flex flex-col text-gray-800">
            <span>보유중인 ZET</span>
            <div className="flex justify-between items-center gap-1">
              <span className="text-base font-bold text-purple-600 truncate">
                {formattedZet} ZET
              </span>
              <button className="whitespace-nowrap text-xs rounded-md px-2 py-1 flex items-center justify-center bg-blue-500 text-white flex-shrink-0">
                충전
              </button>
            </div>
          </div>
        </div>

        {/* 오른쪽 QR & 액션 */}
        <div className="flex flex-col items-end gap-1 sm:gap-2 shrink-0">
          <button className="text-gray-800 text-xs h-6 px-1 py-1 whitespace-nowrap border border-gray-300 rounded">
            ✏️&nbsp;프로필 수정
          </button>

          {/* QR코드 */}
          <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-white border border-gray-300 rounded-lg flex items-center justify-center">
            <div className="text-xs text-gray-500">QR</div>
          </div>

          <div className="mt-1 sm:mt-2 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gray-300 rounded flex items-center justify-center">
            <div className="text-xs">💳</div>
          </div>
        </div>
      </div>
    </section>
  );
};

const meta: Meta<typeof MockSignalCard> = {
  title: 'Mypage/SignalCard',
  component: MockSignalCard,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    userId: {
      control: { type: 'text' },
      description: '사용자 ID',
    },
    zetAmount: {
      control: { type: 'number' },
      description: 'ZET 잔액',
    },
    availableData: {
      control: { type: 'number' },
      description: '사용 가능한 데이터 용량',
    },
    maxData: {
      control: { type: 'number' },
      description: '최대 데이터 용량',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    userId: '지구인123',
    zetAmount: 1500,
    availableData: 5,
    maxData: 10,
    honorifics: [
      { name: '초보 탐험가', isActive: true },
      { name: '중급 탐험가', isActive: false },
      { name: '고급 탐험가', isActive: false },
    ],
  },
};

export const HighZet: Story = {
  args: {
    userId: '부자지구인',
    zetAmount: 50000,
    availableData: 8,
    maxData: 10,
    honorifics: [
      { name: '부자 탐험가', isActive: true },
      { name: '초보 탐험가', isActive: false },
    ],
  },
};

export const LowData: Story = {
  args: {
    userId: '데이터부족',
    zetAmount: 100,
    availableData: 1,
    maxData: 10,
    honorifics: [{ name: '초보 탐험가', isActive: true }],
  },
};

export const NoHonorific: Story = {
  args: {
    userId: '신규사용자',
    zetAmount: 0,
    availableData: 0,
    maxData: 10,
    honorifics: [],
  },
};

export const LongUserId: Story = {
  args: {
    userId: '매우긴사용자아이디입니다',
    zetAmount: 2500,
    availableData: 7,
    maxData: 10,
    honorifics: [{ name: '긴칭호를가진탐험가', isActive: true }],
  },
};
