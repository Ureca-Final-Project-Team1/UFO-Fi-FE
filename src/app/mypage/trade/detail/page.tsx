'use client';

import { useSearchParams } from 'next/navigation';

import {
  ErrorState,
  EmptyState,
  ReceiptContent,
  CompletionImage,
} from '@/features/mypage/components';
import { usePurchaseDetail } from '@/features/mypage/hooks';
import { Title } from '@/shared';

export default function MyTradeDetailPage() {
  const searchParams = useSearchParams();
  const purchaseHistoryId = searchParams.get('id');
  const { purchaseDetail, loading, error } = usePurchaseDetail(purchaseHistoryId);

  if (loading) {
    return null;
  }

  if (error) {
    return <ErrorState error={error} />;
  }

  if (!purchaseDetail) {
    return <EmptyState />;
  }

  return (
    <div className="overflow-y-hidden w-full min-h-f flex flex-col items-center justify-center">
      <Title title="주문 상세" iconVariant="back" />
      <ReceiptContent purchaseDetail={purchaseDetail} />
      <CompletionImage />
    </div>
  );
}
