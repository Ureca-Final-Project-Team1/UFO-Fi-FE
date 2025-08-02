'use client';

import { useRouter } from 'next/navigation';
import { useEffect, ComponentProps } from 'react';

import { PurchaseErrorType } from '@/api/types/exchange';
import { Button } from '@/shared';
import { analytics } from '@/utils/analytics';

import {
  overlayVariants,
  modalVariants,
  iconContainerVariants,
  iconVariants,
  titleVariants,
  messageVariants,
  errorDetailVariants,
  errorDetailTextVariants,
  retryWarningVariants,
  retryWarningTextVariants,
  actionContainerVariants,
  primaryButtonVariants,
  secondaryButtonContainerVariants,
  secondaryButtonVariants,
  footerVariants,
  footerTextVariants,
} from './PurchaseErrorRecoveryVariants';

type SimpleErrorRecoveryProps = ComponentProps<'div'> & {
  error?: string;
  errorType?: PurchaseErrorType;
  postId?: string;
  onRetry?: () => void;
  canRetry?: boolean;
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
    <div className={overlayVariants()} {...rest}>
      <div className={modalVariants()}>
        {/* 에러 아이콘 */}
        <div className={iconContainerVariants()}>
          <div className={iconVariants()}>{config.icon}</div>
          <h2 className={titleVariants()}>{config.title}</h2>
          <p className={messageVariants()}>{config.message}</p>
        </div>
        {/* 에러 상세 정보 */}
        <div className={`${config.bgColor} ${config.borderColor} ${errorDetailVariants()}`}>
          <p className={errorDetailTextVariants()}>오류 내용: {error}</p>
        </div>
        {/* 재시도 불가능한 경우 추가 안내 */}
        {!canRetry && (
          <div className={retryWarningVariants()}>
            <p className={retryWarningTextVariants()}>이 오류는 고객 센터에 문의해주세요!</p>
          </div>
        )}
        {/* 액션 버튼들 */}
        <div className={actionContainerVariants()}>
          {/* 주요 액션 */}
          <Button
            size="full-width"
            variant="primary"
            onClick={handlePrimaryAction}
            className={primaryButtonVariants()}
          >
            {config.primaryLabel}
          </Button>

          {/* 보조 액션들 */}
          <div className={secondaryButtonContainerVariants()}>
            <Button
              size="default"
              variant="secondary"
              onClick={() => handleSecondaryAction('back')}
              className={secondaryButtonVariants()}
            >
              이전으로
            </Button>

            <Button
              size="default"
              variant="secondary"
              onClick={() => handleSecondaryAction('main')}
              className={secondaryButtonVariants()}
            >
              메인으로
            </Button>
          </div>
        </div>

        <div className={footerVariants()}>
          <p className={footerTextVariants()}>문제가 지속되면 고객센터로 문의해주세요.</p>
        </div>
      </div>
    </div>
  );
};
