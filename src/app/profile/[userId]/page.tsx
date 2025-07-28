'use client';

import { useParams } from 'next/navigation';
import { Suspense } from 'react';

import { ProfileView } from '@/features/profile/components/ProfileView';

export default function ProfilePage() {
  const params = useParams();
  const userId = Number(params.userId);

  if (!userId || isNaN(userId)) {
    return (
      <div className="flex items-center justify-center min-h-full">
        <div className="text-white">잘못된 사용자 ID입니다.</div>
      </div>
    );
  }

  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-full">
          <div className="text-white">프로필을 불러오는 중...</div>
        </div>
      }
    >
      <ProfileView userId={userId} />
    </Suspense>
  );
}
