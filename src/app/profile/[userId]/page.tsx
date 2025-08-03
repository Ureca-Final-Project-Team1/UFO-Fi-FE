'use client';

import { useParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';

import { ProfileView } from '@/features/profile/components/ProfileView';
import { Loading } from '@/shared';

function ProfileContent() {
  const params = useParams();
  const [userId, setUserId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let parsedId: number | null = null;
    if (params?.userId) {
      const maybeId = Number(params.userId);
      if (!isNaN(maybeId) && maybeId > 0) {
        parsedId = maybeId;
      }
    }
    setUserId(parsedId);
    setIsLoading(false);
  }, [params]);

  if (isLoading) {
    return <Loading />;
  }

  if (!userId) {
    return <div className="text-white">잘못된 사용자 ID입니다.</div>;
  }

  return <ProfileView userId={userId} />;
}

export default function ProfilePage() {
  return (
    <Suspense fallback={<Loading />}>
      <ProfileContent />
    </Suspense>
  );
}
