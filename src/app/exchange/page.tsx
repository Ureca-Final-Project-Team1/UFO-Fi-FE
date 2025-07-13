'use client';

import { useRouter } from 'next/navigation';

import { ICON_PATHS } from '@/constants/icons';
import { Button, Chip, Icon, Title } from '@/shared';

import SellingItem from '../../features/exchange/components/SellingItem';

export default function ExchangePage() {
  const router = useRouter();

  // 더미 데이터
  const sellingItems = [
    {
      id: 1,
      carrier: 'KT',
      networkType: '5G',
      capacity: '1GB',
      price: '2,500원',
      timeLeft: '30분전',
      isOwner: false,
    },
    {
      id: 2,
      carrier: 'SKT',
      networkType: 'LTE',
      capacity: '1GB',
      price: '2,500원',
      timeLeft: '30분전',
      isOwner: true,
    },
    {
      id: 3,
      carrier: 'LG U+',
      networkType: '5G',
      capacity: '1GB',
      price: '2,500원',
      timeLeft: '30분전',
      isOwner: false,
    },
    {
      id: 4,
      carrier: 'KT',
      networkType: '5G',
      capacity: '2GB',
      price: '4,500원',
      timeLeft: '1시간전',
      isOwner: false,
    },
  ];

  const handleEdit = (id: number) => {
    console.log('Edit item:', id);
  };

  const handleDelete = (id: number) => {
    console.log('Delete item:', id);
  };

  const handleReport = (id: number) => {
    console.log('Report item:', id);
  };

  const handlePurchase = (id: number) => {
    console.log('Purchase item:', id);
  };

  const handleNotificationSettings = () => {
    router.push('/notification');
  };

  const handleCharge = () => {
    console.log('Charge ZET');
  };

  // const handleFilterClick = () => {
  //   router.push('/notification');
  // };

  const handleBulkPurchase = () => {
    console.log('Bulk purchase');
  };

  return (
    <div className="flex flex-col min-h-full w-full">
      <div className="flex-1">
        {/* 헤더 */}
        <div className="flex items-center justify-between">
          <Title title="전파 거래소" />
        </div>

        {/* 잔액 표시 */}
        <div className="text-right mb-2">
          <div className="inline-flex items-center gap-x-3 py-2">
            <Icon src={ICON_PATHS['COIN']} className="w-4 h-4" />
            <span className="text-lg font-bold text-cyan-400">0 ZET</span>
            <Button
              size="sm"
              onClick={handleCharge}
              className="w-auto rounded-[5px] text-white text-sm"
            >
              충전
            </Button>
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

        {/* 알림 설정 필터링으로 이동할 뱃지 */}
        <div className="mb-4">
          {/* 뱃지 필터 */}
          <div className="flex flex-wrap gap-2">
            <Chip rightIcon={<Icon name="ChevronDown" />}>통신사</Chip>
            <Chip rightIcon={<Icon name="ChevronDown" />}>용량</Chip>
            <Chip rightIcon={<Icon name="ChevronDown" />}>가격</Chip>
          </div>

          {/* 모바일에선 아래쪽, 태블릿 이상에선 우측 배치 */}
          <div className="mt-2 sm:mt-0 sm:absolute sm:right-0 sm:top-0">
            <Button size="sm" variant="exploration-button" onClick={handleBulkPurchase}>
              <Icon name="box" className="w-3 h-3 pr-1" />
              <span className="caption-14-bold"> 일괄구매</span>
            </Button>
          </div>
        </div>

        {/* 판매글 아이템 목록 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {sellingItems.map((item) => (
            <SellingItem
              key={item.id}
              carrier={item.carrier}
              networkType={item.networkType}
              capacity={item.capacity}
              price={item.price}
              timeLeft={item.timeLeft}
              isOwner={item.isOwner}
              onEdit={() => handleEdit(item.id)}
              onDelete={() => handleDelete(item.id)}
              onReport={() => handleReport(item.id)}
              onPurchase={() => handlePurchase(item.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
