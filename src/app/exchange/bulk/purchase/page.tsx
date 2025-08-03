'use client';

import { Suspense } from 'react';

import { BulkPurchaseContent } from '@/features';
import { Loading } from '@/shared';

export default function BulkPurchasePage() {
  return (
    <Suspense fallback={<Loading />}>
      <BulkPurchaseContent />
    </Suspense>
  );
}
