import type { Meta, StoryObj } from '@storybook/react';

// Mock ReceiptContent for Storybook
const MockReceiptContent = ({
  purchaseDetail = {
    purchaseHistoryId: 'PUR-2024-001',
    carrier: 'SKT',
    totalGB: 10,
    createdAt: '2024-01-15T10:30:00Z',
    totalZet: 1500,
  },
}: {
  purchaseDetail?: {
    purchaseHistoryId: string;
    carrier: string;
    totalGB: number;
    createdAt: string;
    totalZet: number;
  };
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR');
  };

  const getCarrierIcon = (carrier: string) => {
    switch (carrier) {
      case 'SKT':
        return '📱';
      case 'KT':
        return '📱';
      case 'LG U+':
        return '📱';
      default:
        return '📱';
    }
  };

  return (
    <div className="w-full flex items-center justify-center mt-8 relative">
      <div className="w-[350px] h-[350px] bg-white border-2 border-gray-300 rounded-lg shadow-lg"></div>

      {/* 영수증 내용 */}
      <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-64 text-center">
        {/* UFO-Fi 타이틀 */}
        <div className="mb-10">
          <div className="text-3xl">🛸</div>
          <div className="text-3xl font-bold text-gray-800">UFO-Fi</div>
        </div>
        <hr className="border-dotted border-t-2 border-gray-400 mb-3" />
        {/* 주문번호 */}
        <div className="flex justify-between border-b-2 border-dotted border-gray-400 pb-1 mb-3">
          <span className="text-sm text-gray-600">주문번호</span>
          <span className="text-sm font-medium text-black">{purchaseDetail.purchaseHistoryId}</span>
        </div>

        {/* 상품 정보 */}
        <div className="flex justify-between border-b-2 border-dotted border-gray-400 pb-1 mb-3">
          <span className="text-sm text-gray-600">상품 정보</span>
          <span className="text-sm font-medium text-black flex items-center gap-1">
            {getCarrierIcon(purchaseDetail.carrier)}
            {purchaseDetail.totalGB}GB
          </span>
        </div>

        {/* 구매 일자 */}
        <div className="flex justify-between border-b-2 border-dotted border-gray-400 pb-1 mb-3">
          <span className="text-sm text-gray-600">구매 일자</span>
          <span className="text-sm font-medium text-black">
            {formatDate(purchaseDetail.createdAt)}
          </span>
        </div>

        {/* 총 ZET */}
        <div className="flex justify-between border-b-2 border-dotted border-gray-400 pb-1 mb-8">
          <span className="text-sm text-gray-600">구입 가격</span>
          <span className="text-sm font-medium text-black">{purchaseDetail.totalZet} ZET</span>
        </div>
      </div>
    </div>
  );
};

const meta: Meta<typeof MockReceiptContent> = {
  title: 'Mypage/TradeDetail/ReceiptContent',
  component: MockReceiptContent,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    purchaseDetail: {
      control: { type: 'object' },
      description: '구매 상세 정보',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    purchaseDetail: {
      purchaseHistoryId: 'PUR-2024-001',
      carrier: 'SKT',
      totalGB: 10,
      createdAt: '2024-01-15T10:30:00Z',
      totalZet: 1500,
    },
  },
};

export const KT: Story = {
  args: {
    purchaseDetail: {
      purchaseHistoryId: 'PUR-2024-002',
      carrier: 'KT',
      totalGB: 5,
      createdAt: '2024-01-16T14:20:00Z',
      totalZet: 800,
    },
  },
};

export const LGU: Story = {
  args: {
    purchaseDetail: {
      purchaseHistoryId: 'PUR-2024-003',
      carrier: 'LG U+',
      totalGB: 20,
      createdAt: '2024-01-17T09:15:00Z',
      totalZet: 2500,
    },
  },
};

export const LargeAmount: Story = {
  args: {
    purchaseDetail: {
      purchaseHistoryId: 'PUR-2024-004',
      carrier: 'SKT',
      totalGB: 100,
      createdAt: '2024-01-18T16:45:00Z',
      totalZet: 10000,
    },
  },
};
