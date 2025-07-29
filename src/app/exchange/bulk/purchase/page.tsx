'use client';

import { Suspense } from 'react';

import { BulkPurchaseContent } from '@/features/bulk/components/BulkPurchaseContent';

export default function BulkPurchasePage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-full">
          <div className="text-white">로딩 중...</div>
        </div>
      }
    >
      <BulkPurchaseContent />
    </Suspense>
  );
}
