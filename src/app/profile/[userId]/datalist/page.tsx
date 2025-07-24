'use client';

import { useParams } from 'next/navigation';
import { Suspense } from 'react';

import { DataListView } from '@/features/profile/components/DataListView';

export default function ProfileDataListPage() {
  const params = useParams();
  const userId = Number(params.userId);

  if (isNaN(userId) || userId <= 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-white">잘못된 사용자 ID입니다.</div>
      </div>
    );
  }

  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-white">판매 데이터를 불러오는 중...</div>
        </div>
      }
    >
      <DataListView userId={userId} />
    </Suspense>
  );
}
