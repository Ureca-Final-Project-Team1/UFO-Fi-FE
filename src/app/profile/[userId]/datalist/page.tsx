'use client';

import { useParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';

import { DataListView } from '@/features/profile/components/DataListView';

function DataListContent() {
  const params = useParams();
  const [userId, setUserId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (params?.userId) {
      const id = Number(params.userId);
      if (!isNaN(id) && id > 0) {
        setUserId(id);
      }
    }
    setIsLoading(false);
  }, [params]);

  if (isLoading) {
    return <div className="text-white">로딩 중...</div>;
  }

  if (!userId) {
    return <div className="text-white">잘못된 사용자 ID입니다.</div>;
  }

  return <DataListView userId={userId} />;
}

export default function ProfileDataListPage() {
  return (
    <Suspense fallback={<div className="text-white">판매 데이터를 불러오는 중...</div>}>
      <DataListContent />
    </Suspense>
  );
}
