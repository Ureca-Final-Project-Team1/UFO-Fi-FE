'use client';

import { useRouter } from 'next/navigation';

import { Button, Chip, Icon } from '@/shared';

export const ExchangeFilters = () => {
  const router = useRouter();

  const handleBulkPurchase = () => {
    router.push('/exchange/bulk');
  };

  return (
    <div className="mb-4 flex flex-wrap items-center justify-between gap-2 sm:relative">
      {/* TODO: 추후 정렬 적용 필요 */}
      <div className="flex flex-wrap gap-2">
        <Chip rightIcon={<Icon name="ChevronDown" />}>통신사</Chip>
        <Chip>용량</Chip>
        <Chip>가격</Chip>
      </div>

      {/* 일괄구매 버튼 */}
      <div className="ml-auto sm:absolute sm:right-0 sm:top-0">
        <Button size="sm" variant="exploration-button" onClick={handleBulkPurchase}>
          <Icon name="box" className="w-3 h-3 pr-1" />
          <span className="caption-14-bold"> 일괄구매</span>
        </Button>
      </div>
    </div>
  );
};
