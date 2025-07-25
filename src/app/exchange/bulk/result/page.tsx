'use client';

import { Suspense } from 'react';

import { BulkResultContent } from '@/features/bulk/components/BulkResultContent';

export default function BulkResultPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-white">로딩 중...</div>
        </div>
      }
    >
      <BulkResultContent />
    </Suspense>
  );
}
