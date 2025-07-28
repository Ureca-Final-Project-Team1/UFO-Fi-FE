'use client';

import { useRouter } from 'next/navigation';

import { ICON_PATHS } from '@/constants/icons';
import { SpeechBubble } from '@/features/main/components';
import { useMyInfo } from '@/features/mypage/hooks/useMyInfo';
import { Button, Chip, Icon } from '@/shared';
import { Progress } from '@/shared/ui/Progress';

export const ExchangeHeader = () => {
  const router = useRouter();
  const { data: userInfo, isLoading, isError } = useMyInfo();

  const handleCharge = () => {
    router.push('/charge');
  };

  const handleNotificationSettings = () => {
    router.push('/exchange/notification');
  };

  // 예시 데이터
  const availableVolume = 3; // GB
  const maxVolume = 5; // GB

  const renderZetBalance = () => {
    if (isLoading) return '로딩 중...';
    if (isError || !userInfo) return '잔액 정보를 불러오지 못했어요.';
    const zet = userInfo.zetAsset || 0;
    return `${zet.toLocaleString()} ZET`;
  };

  return (
    <div className="relative w-full gap-2 flex flex-row items-center shadow-lg">
      <div className="flex flex-col gap-2 items-center">
        {/* 말풍선 */}
        <SpeechBubble tailDirection="bottom" className="w-[220px] text-center text-xs py-2 px-3">
          조건에 맞는 상품을 원하시면 <br /> 필터링 기능을 이용해보세요!
        </SpeechBubble>
        <img src="/images/exchange/exchange_alien.svg" alt="캐릭터" className="w-50" />
      </div>

      <div>
        {/* 알림 설정 카드 */}
        <div className="flex items-center justify-between px-3 py-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl border border-blue-500/30 mb-4 backdrop-blur-sm">
          <p className="text-white caption-12-regular">원하는 상품이 올라오면 알려드려요.</p>
          <Button size="sm" variant="ghost" onClick={handleNotificationSettings}>
            <Icon name="Bell" className="w-5 h-5 pr-1" color="primary400" />
            <span className="caption-12-bold"> 알림설정</span>
          </Button>
        </div>

        {/* 일괄구매/잔액/충전 */}
        <div className="flex items-center justify-between gap-4 mb-3">
          <Button size="sm" variant="exploration-button">
            <Icon name="box" className="w-3 h-3 pr-1" />
            <span className="caption-14-bold"> 일괄구매</span>
          </Button>
          <div className="flex items-center gap-2">
            <Icon src={ICON_PATHS['COIN']} className="w-4 h-4" />
            <span className="text-lg font-bold text-cyan-400">{renderZetBalance()}</span>
            <Button
              size="sm"
              onClick={handleCharge}
              className="w-auto rounded-md text-white text-sm bg-purple-400 px-4"
            >
              충전
            </Button>
          </div>
        </div>

        {/* 이번 달 판매 가능 용량 */}
        <div className="flex items-center text-md text-white">
          <span>이번 달 판매 가능 용량 : {availableVolume}GB</span>
        </div>

        <Progress
          showCurrentUsage={false}
          showMinMaxLabels={false}
          usedStorage={availableVolume}
          totalStorage={maxVolume}
          size="lg"
          className="mb-5"
        />

        {/* 필터 버튼들 (통신사/용량/가격) */}
        <div className="flex flex-wrap gap-2">
          <Chip rightIcon={<Icon name="ChevronDown" />}>통신사</Chip>
          <Chip>용량</Chip>
          <Chip>가격</Chip>
        </div>
      </div>
    </div>
  );
};
