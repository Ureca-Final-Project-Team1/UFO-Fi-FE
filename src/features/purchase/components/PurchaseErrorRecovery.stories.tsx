import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { PurchaseErrorType } from '@/backend/types/exchange';
import { Button } from '@/shared';

// Mock PurchaseErrorRecovery for Storybook
const MockPurchaseErrorRecovery = ({
  error = '알 수 없는 오류가 발생했습니다.',
  errorType = PurchaseErrorType.NETWORK_ERROR,
  canRetry = true,
}: {
  error?: string;
  errorType?: PurchaseErrorType;
  postId?: string;
  canRetry?: boolean;
}) => {
  const [retryCount, setRetryCount] = useState(0);

  const getErrorConfig = (errorType: PurchaseErrorType) => {
    switch (errorType) {
      case PurchaseErrorType.PRODUCT_UNAVAILABLE:
        return {
          title: '😔 상품이 품절되었습니다',
          message: '아쉽게도 다른 구매자가 먼저 구매했습니다.\n비슷한 다른 상품을 찾아보세요!',
          icon: '📦',
          primaryAction: 'browse',
          primaryLabel: '다른 상품 찾기',
          bgColor: 'bg-orange-900/30',
          borderColor: 'border-orange-500/40',
        };

      case PurchaseErrorType.INSUFFICIENT_BALANCE:
        return {
          title: '💰 ZET 잔액이 부족합니다',
          message: 'ZET를 충전하고 구매를 계속해보세요.',
          icon: '💳',
          primaryAction: 'charge',
          primaryLabel: 'ZET 충전하기',
          bgColor: 'bg-blue-900/30',
          borderColor: 'border-blue-500/40',
        };

      case PurchaseErrorType.PRODUCT_NOT_FOUND:
        return {
          title: '🔍 상품을 찾을 수 없습니다',
          message: '상품이 삭제되었거나 존재하지 않습니다.',
          icon: '❌',
          primaryAction: 'browse',
          primaryLabel: '거래소로 돌아가기',
          bgColor: 'bg-red-900/30',
          borderColor: 'border-red-500/40',
        };

      case PurchaseErrorType.NETWORK_ERROR:
        return {
          title: '📡 연결이 불안정합니다',
          message: '인터넷 연결을 확인하고 다시 시도해주세요.',
          icon: '🌐',
          primaryAction: 'retry',
          primaryLabel: '다시 시도',
          bgColor: 'bg-yellow-900/30',
          borderColor: 'border-yellow-500/40',
        };

      default:
        return {
          title: '⚠️ 일시적인 오류입니다',
          message: '서버에 일시적인 문제가 발생했습니다.\n잠시 후 다시 시도해주세요.',
          icon: '🔧',
          primaryAction: 'retry',
          primaryLabel: '다시 시도',
          bgColor: 'bg-gray-900/30',
          borderColor: 'border-gray-500/40',
        };
    }
  };

  const config = getErrorConfig(errorType);

  const handlePrimaryAction = () => {
    if (config.primaryAction === 'retry') {
      setRetryCount((prev) => prev + 1);
    }
    // 다른 액션들은 라우팅이 필요하므로 콘솔에 로그
    // console.log(`${config.primaryAction} 액션 실행됨`);
  };

  const handleSecondaryAction = () => {
    // console.log(`액션 실행됨`);
  };

  return (
    <div className="w-full bg-gray-900 p-4">
      <div className="max-w-md mx-auto">
        <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg border border-gray-700">
          <h2 className="text-white text-base font-semibold mb-4">구매 에러 복구</h2>

          <div className="bg-white rounded-lg max-w-md w-full p-6 space-y-4">
            {/* 에러 아이콘 */}
            <div className="text-center space-y-2">
              <div className="text-4xl">{config.icon}</div>
              <h2 className="text-lg font-semibold text-gray-900">{config.title}</h2>
              <p className="text-sm text-gray-600 whitespace-pre-line">{config.message}</p>
            </div>

            {/* 에러 상세 정보 */}
            <div className={`${config.bgColor} ${config.borderColor} p-3 rounded border`}>
              <p className="text-xs text-gray-700">오류 내용: {error}</p>
            </div>

            {/* 재시도 불가능한 경우 추가 안내 */}
            {!canRetry && (
              <div className="bg-yellow-50 border border-yellow-200 p-3 rounded">
                <p className="text-xs text-yellow-800">이 오류는 고객 센터에 문의해주세요!</p>
              </div>
            )}

            {/* 액션 버튼들 */}
            <div className="space-y-3">
              {/* 주요 액션 */}
              <Button size="full-width" variant="primary" onClick={handlePrimaryAction}>
                {config.primaryAction === 'retry'
                  ? `${config.primaryLabel} (${retryCount}회)`
                  : config.primaryLabel}
              </Button>

              {/* 보조 액션들 */}
              <div className="flex gap-2">
                <Button
                  size="default"
                  variant="secondary"
                  onClick={() => handleSecondaryAction()}
                  className="flex-1"
                >
                  이전으로
                </Button>

                <Button
                  size="default"
                  variant="secondary"
                  onClick={() => handleSecondaryAction()}
                  className="flex-1"
                >
                  메인으로
                </Button>
              </div>
            </div>

            <div className="text-center">
              <p className="text-xs text-gray-500">문제가 지속되면 고객센터로 문의해주세요.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const meta: Meta<typeof MockPurchaseErrorRecovery> = {
  title: 'Purchase/PurchaseErrorRecovery',
  component: MockPurchaseErrorRecovery,
  parameters: {
    layout: 'padded',
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    error: {
      control: { type: 'text' },
      description: '오류 메시지',
    },
    errorType: {
      control: { type: 'select' },
      options: [
        PurchaseErrorType.PRODUCT_UNAVAILABLE,
        PurchaseErrorType.INSUFFICIENT_BALANCE,
        PurchaseErrorType.PRODUCT_NOT_FOUND,
        PurchaseErrorType.NETWORK_ERROR,
      ],
      description: '오류 타입',
    },
    postId: {
      control: { type: 'text' },
      description: '게시물 ID',
    },
    canRetry: {
      control: { type: 'boolean' },
      description: '재시도 가능 여부',
    },
  },
};

export default meta;
type Story = StoryObj<typeof MockPurchaseErrorRecovery>;

export const ProductUnavailable: Story = {
  args: {
    error: '상품이 이미 판매되었습니다.',
    errorType: PurchaseErrorType.PRODUCT_UNAVAILABLE,
    postId: '123',
    canRetry: false,
  },
};

export const InsufficientBalance: Story = {
  args: {
    error: '잔액이 부족합니다. 현재 잔액: 100 ZET',
    errorType: PurchaseErrorType.INSUFFICIENT_BALANCE,
    postId: '456',
    canRetry: true,
  },
};

export const ProductNotFound: Story = {
  args: {
    error: '요청한 상품을 찾을 수 없습니다.',
    errorType: PurchaseErrorType.PRODUCT_NOT_FOUND,
    postId: '789',
    canRetry: false,
  },
};

export const NetworkError: Story = {
  args: {
    error: '네트워크 연결에 실패했습니다.',
    errorType: PurchaseErrorType.NETWORK_ERROR,
    postId: '101',
    canRetry: true,
  },
};

export const DefaultError: Story = {
  args: {
    error: '알 수 없는 오류가 발생했습니다.',
    errorType: PurchaseErrorType.NETWORK_ERROR,
    postId: '999',
    canRetry: true,
  },
};

export const CannotRetry: Story = {
  args: {
    error: '시스템 오류가 발생했습니다.',
    errorType: PurchaseErrorType.PRODUCT_NOT_FOUND,
    postId: '555',
    canRetry: false,
  },
};

export const Desktop: Story = {
  args: {
    error: '네트워크 연결에 실패했습니다.',
    errorType: PurchaseErrorType.NETWORK_ERROR,
    postId: '101',
    canRetry: true,
  },
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
  },
};
