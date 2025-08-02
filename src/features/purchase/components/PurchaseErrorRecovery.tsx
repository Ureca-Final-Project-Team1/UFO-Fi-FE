'use client';

import { useRouter } from 'next/navigation';
import { useEffect, ComponentProps } from 'react';

import { PurchaseErrorType } from '@/api/types/exchange';
import { Button } from '@/shared';
import { analytics } from '@/utils/analytics';

type SimpleErrorRecoveryProps = ComponentProps<'div'> & {
  error?: string;
  errorType?: PurchaseErrorType;
  postId?: string;
  onRetry?: () => void;
  canRetry?: boolean;
};

// 조건부 스타일링을 위한 객체들
const overlayStyleMap = {
  base: 'fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4',
};

const modalStyleMap = {
  base: 'bg-gray-800 rounded-2xl p-8 max-w-sm w-full mx-4 relative',
};

const iconContainerStyleMap = {
  base: 'text-center mb-6',
};

const iconStyleMap = {
  base: 'text-5xl mb-4',
};

const titleStyleMap = {
  base: 'text-xl font-bold text-white mb-2',
};

const messageStyleMap = {
  base: 'text-gray-300 text-sm leading-relaxed whitespace-pre-line',
};

const errorDetailStyleMap = {
  base: 'border rounded-lg p-3 mb-6',
};

const errorDetailTextStyleMap = {
  base: 'text-xs text-gray-400 text-center',
};

const retryWarningStyleMap = {
  base: 'bg-red-900/20 border border-red-500/30 rounded-lg p-4 mb-6',
};

const retryWarningTextStyleMap = {
  base: 'text-red-300 text-sm text-center',
};

const actionContainerStyleMap = {
  base: 'space-y-3',
};

const primaryButtonStyleMap = {
  base: 'py-3 text-base font-semibold',
};

const secondaryButtonContainerStyleMap = {
  base: 'flex gap-3',
};

const secondaryButtonStyleMap = {
  base: 'flex-1 py-2 text-sm',
};

const footerStyleMap = {
  base: 'mt-4 text-center',
};

const footerTextStyleMap = {
  base: 'text-xs text-gray-500',
};

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

export const PurchaseErrorRecovery: React.FC<SimpleErrorRecoveryProps> = (props) => {
  const {
    error = '알 수 없는 오류가 발생했습니다.',
    errorType = PurchaseErrorType.NETWORK_ERROR,
    postId = '',
    onRetry = () => {},
    canRetry = false,
    ...rest
  } = props;

  const router = useRouter();
  const config = getErrorConfig(errorType);

  useEffect(() => {
    analytics.event('error_recovery_shown', {
      post_id: postId,
      error_type: errorType,
      error_message: error,
    });
  }, [error, errorType, postId]);

  const handlePrimaryAction = () => {
    analytics.event('error_recovery_primary_action', {
      post_id: postId,
      action: config.primaryAction,
      error_type: errorType,
    });

    switch (config.primaryAction) {
      case 'charge':
        router.push('/charge');
        break;
      case 'browse':
        router.push('/exchange');
        break;
      case 'retry':
        onRetry?.();
        break;
    }
  };

  const handleSecondaryAction = (action: 'back' | 'main') => {
    analytics.event('error_recovery_secondary_action', {
      post_id: postId,
      action,
      error_type: errorType,
    });

    if (action === 'back') {
      router.back();
    } else {
      router.push('/');
    }
  };

  return (
    <div className={overlayStyleMap.base} {...rest}>
      <div className={modalStyleMap.base}>
        {/* 에러 아이콘 */}
        <div className={iconContainerStyleMap.base}>
          <div className={iconStyleMap.base}>{config.icon}</div>
          <h2 className={titleStyleMap.base}>{config.title}</h2>
          <p className={messageStyleMap.base}>{config.message}</p>
        </div>
        {/* 에러 상세 정보 */}
        <div className={`${config.bgColor} ${config.borderColor} ${errorDetailStyleMap.base}`}>
          <p className={errorDetailTextStyleMap.base}>오류 내용: {error}</p>
        </div>
        {/* 재시도 불가능한 경우 추가 안내 */}
        {!canRetry && (
          <div className={retryWarningStyleMap.base}>
            <p className={retryWarningTextStyleMap.base}>이 오류는 고객 센터에 문의해주세요!</p>
          </div>
        )}
        {/* 액션 버튼들 */}
        <div className={actionContainerStyleMap.base}>
          {/* 주요 액션 */}
          <Button
            size="full-width"
            variant="primary"
            onClick={handlePrimaryAction}
            className={primaryButtonStyleMap.base}
          >
            {config.primaryLabel}
          </Button>

          {/* 보조 액션들 */}
          <div className={secondaryButtonContainerStyleMap.base}>
            <Button
              size="default"
              variant="secondary"
              onClick={() => handleSecondaryAction('back')}
              className={secondaryButtonStyleMap.base}
            >
              이전으로
            </Button>

            <Button
              size="default"
              variant="secondary"
              onClick={() => handleSecondaryAction('main')}
              className={secondaryButtonStyleMap.base}
            >
              메인으로
            </Button>
          </div>
        </div>

        <div className={footerStyleMap.base}>
          <p className={footerTextStyleMap.base}>문제가 지속되면 고객센터로 문의해주세요.</p>
        </div>
      </div>
    </div>
  );
};
