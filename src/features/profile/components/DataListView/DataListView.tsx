'use client';

import { useRouter } from 'next/navigation';

import { useProfile } from '@/features';
import { Title } from '@/shared';

import { SimpleDataCard } from './SimpleDataCard';

interface DataListViewProps {
  userId: number;
}

export function DataListView({ userId }: DataListViewProps) {
  const router = useRouter();
  const { data: profile, isLoading, error } = useProfile(userId);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-white">판매 데이터를 불러오는 중...</div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4">
        <div className="text-white">판매 데이터를 불러올 수 없습니다.</div>
        <button onClick={() => router.back()} className="text-cyan-400 underline">
          돌아가기
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full pb-6">
      <Title title="판매중인 데이터 목록" iconVariant="back" />

      <div className="px-4 space-y-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-white font-semibold text-lg">
              판매중인 데이터 <span className="text-cyan-400"> {profile.tradePostsRes.length}</span>
              건
            </h3>
          </div>

          {profile.tradePostsRes.length > 0 ? (
            <div className="grid grid-cols-1 gap-3">
              {profile.tradePostsRes.map((post) => (
                <SimpleDataCard key={post.postId} post={post} sellerNickname={profile.nickname} />
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-400 py-12">
              <div className="text-lg mb-2">📱</div>
              <div>판매중인 데이터가 없습니다.</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
