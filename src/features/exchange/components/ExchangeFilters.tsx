'use client';

import { useRouter } from 'next/navigation';

import { Button, Icon } from '@/shared';

export const ExchangeFilters = () => {
  const router = useRouter();

  const handleBulkPurchase = () => {
    router.push('/exchange/bulk');
  };

  return (
    <section
      aria-labelledby="exchange-filters"
      className="mb-4 flex flex-wrap items-center justify-between gap-2 sm:relative"
    >
      <h2 id="exchange-filters" className="sr-only">
        거래소 필터 및 정렬 옵션
      </h2>

      {/* TODO: 필터 칩들 */}
      {/* <div className="flex flex-wrap gap-2" role="group" aria-label="거래 게시물 필터">
        <Chip aria-label="통신사별 필터">통신사</Chip>
        <Chip aria-label="데이터 용량별 필터">용량</Chip>
        <Chip aria-label="가격별 필터">가격</Chip>
      </div> */}

      {/* 일괄구매 버튼 */}
      <div className="ml-auto sm:absolute sm:right-0 sm:top-0">
        <Button
          type="button"
          size="sm"
          variant="exploration-button"
          onClick={handleBulkPurchase}
          aria-label="여러 데이터를 한번에 구매하기"
        >
          <Icon name="box" className="w-3 h-3 pr-1" aria-hidden="true" />
          <span className="caption-14-bold"> 일괄구매</span>
        </Button>
      </div>
    </section>
  );
};
