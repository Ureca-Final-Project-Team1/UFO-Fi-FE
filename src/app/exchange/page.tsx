'use client';

import { ExchangeFilters } from '@/features/exchange/components/ExchangeFilters';
import { ExchangeHeader } from '@/features/exchange/components/ExchangeHeader';
import { ExchangeList } from '@/features/exchange/components/ExchangeList';
import { Title } from '@/shared';

export default function ExchangePage() {
  const handleEdit = (id: number) => {
    // eslint-disable-next-line no-console
    console.log('Edit item:', id);
  };

  const handleDelete = (id: number) => {
    // eslint-disable-next-line no-console
    console.log('Delete item:', id);
  };

  const handleReport = (id: number) => {
    // eslint-disable-next-line no-console
    console.log('Report item:', id);
  };

  const handlePurchase = (id: number) => {
    // eslint-disable-next-line no-console
    console.log('Purchase item:', id);
  };

  return (
    <div className="flex flex-col min-h-full w-full pb-6">
      <div className="flex-1">
        {/* 헤더 */}
        <div className="flex items-center justify-between">
          <Title title="전파 거래소" />
        </div>

        {/* 잔액 & 알림 설정 */}
        <ExchangeHeader />

        {/* 필터 & 일괄구매 */}
        <ExchangeFilters />

        {/* 게시글 목록 */}
        <ExchangeList
          onEdit={handleEdit}
          onDelete={handleDelete}
          onReport={handleReport}
          onPurchase={handlePurchase}
        />
      </div>
    </div>
  );
}
