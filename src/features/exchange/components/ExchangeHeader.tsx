'use client';

import { useRouter } from 'next/navigation';

import { ICON_PATHS } from '@/constants/icons';
import { useMyInfo } from '@/features/mypage/hooks/useMyInfo';
import { Button, Icon } from '@/shared';

export const ExchangeHeader = () => {
  const router = useRouter();
  const { data: userInfo, isLoading, isError } = useMyInfo();

  const handleCharge = () => {
    router.push('/charge');
  };

  const handleNotificationSettings = () => {
    router.push('/exchange/notification');
  };

  const renderZetBalance = () => {
    if (isLoading) return '로딩 중...';
    if (isError || !userInfo) return '잔액 정보를 불러오지 못했어요.';
    return `${userInfo.zetAsset.toLocaleString()} ZET`;
  };

  return (
    <>
      {/* 잔액 표시 */}
      <div className="text-right mb-2">
        <div className="inline-flex items-center gap-x-3 py-2">
          <Icon src={ICON_PATHS['COIN']} className="w-4 h-4" />
          <span className="text-lg font-bold text-cyan-400">{renderZetBalance()}</span>
          {!isError && userInfo && (
            <Button
              size="sm"
              onClick={handleCharge}
              className="w-auto rounded-md text-white text-sm"
            >
              충전
            </Button>
          )}
        </div>
      </div>

      {/* 알림 설정 카드 */}
      <div className="flex items-center justify-between px-3 py-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl border border-blue-500/30 mb-4 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <p className="text-white caption-14-regular">원하는 상품이 올라오면 알려드려요.</p>
        </div>
        <Button size="sm" variant="ghost" onClick={handleNotificationSettings}>
          <Icon name="Bell" className="w-5 h-5 pr-1" color="primary400" />
          <span className="caption-12-bold"> 알림설정</span>
        </Button>
      </div>
    </>
  );
};
