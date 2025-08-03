'use client';

import { Suspense } from 'react';

import { BulkResultContent } from '@/features/exchange/bulk/components/BulkResultContent';
import { Loading } from '@/shared';

export default function BulkResultPage() {
  return (
    <Suspense fallback={<Loading />}>
      <BulkResultContent />
    </Suspense>
  );
}
