'use client';

import { useParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';

import { DataListView } from '@/features/profile/components/DataListView';
import { Loading } from '@/shared';

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
    return <Loading />;
  }

  if (!userId) {
    return <div className="text-white">잘못된 사용자 ID입니다.</div>;
  }

  return <DataListView userId={userId} />;
}

export default function ProfileDataListPage() {
  return (
    <Suspense fallback={<Loading />}>
      <DataListContent />
    </Suspense>
  );
}
