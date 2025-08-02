'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { IMAGE_PATHS } from '@/constants';
import { useMyInfo } from '@/features/mypage/hooks/useMyInfo';
import { Button, Icon } from '@/shared';
import { SpeechBubble, Progress } from '@/shared';

export const ExchangeHeader = () => {
  const router = useRouter();
  const { data: userInfo, isLoading, isError } = useMyInfo();

  const handleCharge = () => {
    router.push('/charge');
  };

  const handleNotificationSettings = () => {
    router.push('/exchange/notification');
  };

  const handleBulkPurchase = () => {
    router.push('/exchange/bulk');
  };

  const renderZetBalance = () => {
    if (isLoading) return '로딩 중...';
    if (isError || !userInfo) return '잔액 정보를 불러오지 못했어요.';
    const zet = userInfo.zetAsset || 0;
    return `${zet.toLocaleString()} ZET`;
  };

  // 현재 요금제 정보에서 판매 가능 용량 계산
  const getSellableCapacity = () => {
    if (isLoading || isError || !userInfo) {
      return { available: 0, max: 0 };
    }

    const available = userInfo.sellableDataAmount || 0; // 판매 가능한 데이터 양
    const max = userInfo.sellMobileDataCapacityGb || 0; // 최대 판매 가능 용량

    return { available, max };
  };

  const { available, max } = getSellableCapacity();

  return (
    <div className="w-full">
      {/* 데스크톱/태블릿 레이아웃 */}
      <div className="hidden md:flex relative w-full gap-4 items-start shadow-lg p-4">
        {/* 캐릭터 섹션 */}
        <div className="flex flex-col gap-2 items-center flex-shrink-0">
          <SpeechBubble tailDirection="bottom" size="sm">
            조건에 맞는 상품을 원하시면 필터링 기능을 이용해보세요!
          </SpeechBubble>
          <Image src={IMAGE_PATHS.AL_EXCHANGE} alt="캐릭터" width={200} height={200} />
        </div>

        {/* 메인 컨텐츠 */}
        <div className="flex-1 min-w-0">
          {/* 알림 설정 카드 */}
          <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl border border-blue-500/30 mb-4 backdrop-blur-sm">
            <p className="text-white caption-12-regular">원하는 상품이 올라오면 알려드려요.</p>
            <Button size="sm" variant="ghost" onClick={handleNotificationSettings}>
              <Icon name="Bell" className="w-5 h-5 pr-1" color="primary400" />
              <span className="caption-12-bold text-white">알림설정</span>
            </Button>
          </div>

          {/* 일괄구매/잔액/충전 */}
          <div className="flex items-center justify-between gap-4 mb-4">
            <Button size="sm" variant="exploration-button" onClick={handleBulkPurchase}>
              <Icon name="box" className="w-3 h-3 pr-1" />
              <span className="caption-14-bold">일괄구매</span>
            </Button>
            <div className="flex items-center gap-2">
              <Icon src={IMAGE_PATHS['PACKAGE_A']} className="size-8" />
              <span className="text-lg font-bold text-cyan-400">{renderZetBalance()}</span>
              <Button
                size="sm"
                onClick={handleCharge}
                className="w-auto rounded-md text-white text-sm bg-purple-400 px-4 hover:bg-purple-500"
              >
                충전
              </Button>
            </div>
          </div>

          {/* 이번 달 판매 가능 용량 */}
          <div className="flex items-center text-md text-white mb-2">
            <span>
              이번 달 판매 가능 용량: {available}GB / {max}GB
            </span>
          </div>

          {/* 프로그래스 바 */}
          <Progress
            showCurrentUsage={false}
            showMinMaxLabels={false}
            usedStorage={available}
            totalStorage={max}
            size="lg"
            className="mb-4"
          />

          {/* TODO: 필터 버튼들 */}
          {/* <div className="flex flex-wrap gap-2">
            <Chip>통신사</Chip>
            <Chip>용량</Chip>
            <Chip>가격</Chip>
          </div> */}
        </div>
      </div>

      {/* 모바일 레이아웃 */}
      <div className="md:hidden w-full p-4 space-y-4">
        {/* 알림 설정 카드 */}
        <div className="flex items-center justify-between px-3 py-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl border border-blue-500/30 backdrop-blur-sm">
          <p className="text-white text-xs">원하는 상품이 올라오면 알려드려요.</p>
          <Button size="sm" variant="ghost" onClick={handleNotificationSettings}>
            <Icon name="Bell" className="w-4 h-4" color="primary400" />
            <span className="caption-12-bold text-white pl-2">알림설정</span>
          </Button>
        </div>

        {/* 캐릭터와 말풍선 */}
        <div className="flex justify-center items-center gap-3">
          <Image
            src={IMAGE_PATHS.AL_EXCHANGE}
            alt="캐릭터"
            width={120}
            height={120}
            className="flex-shrink-0"
          />
          <SpeechBubble tailDirection="left" size="sm">
            조건에 맞는 상품을 원하시면 필터링 기능을 이용해보세요!
          </SpeechBubble>
        </div>

        {/* 일괄구매/잔액/충전 */}
        <div className="flex items-center justify-between gap-2">
          <Button
            size="sm"
            variant="exploration-button"
            onClick={handleBulkPurchase}
            className="flex-shrink-0"
          >
            <Icon name="box" className="w-3 h-3 pr-1" />
            <span className="text-xs font-bold">일괄구매</span>
          </Button>
          <div className="flex items-center gap-2 min-w-0">
            <Icon src={IMAGE_PATHS['PACKAGE_A']} className="size-6" />
            <span className="text-sm font-bold text-cyan-400 truncate">{renderZetBalance()}</span>
            <Button
              size="sm"
              onClick={handleCharge}
              className="rounded-md text-white text-xs bg-purple-400 px-3 py-1 flex-shrink-0 hover:bg-purple-500"
            >
              충전
            </Button>
          </div>
        </div>

        {/* 판매 가능 용량 */}
        <div className="space-y-2">
          <div className="text-white text-sm">
            판매 가능 용량: {available}GB / {max}GB
          </div>
          <Progress
            showCurrentUsage={false}
            showMinMaxLabels={false}
            usedStorage={available}
            totalStorage={max}
            size="md"
          />
        </div>

        {/* TODO: 필터 버튼들 API 다 안되면 지워야됨 */}
        {/* <div className="flex flex-wrap gap-2">
          <Chip>통신사</Chip>
          <Chip>용량</Chip>
          <Chip>가격</Chip>
        </div> */}
      </div>
    </div>
  );
};
