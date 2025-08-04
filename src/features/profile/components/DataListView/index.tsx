'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Carrier } from '@/backend';
import { IMAGE_PATHS } from '@/constants';
import SellingItem from '@/features/exchange/components/SellingItem';
import { useProfile } from '@/features/profile/hooks/useProfile';
import { ReportedModal, Title } from '@/shared';
import { useUserPlan } from '@/shared/hooks/useUserPlan';
import { formatPrice, formatTimeAgo, getMobileDataTypeDisplay } from '@/shared/utils';

interface DataListViewProps {
  userId: number;
}

export function DataListView({ userId }: DataListViewProps) {
  const router = useRouter();
  const { data: profile, isLoading, error } = useProfile(userId);
  const { data: userPlan } = useUserPlan();
  const [reportModal, setReportModal] = useState({ isOpen: false, postId: 0, sellerId: 0 });

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

  const handleReport = (postId: number, sellerId: number) => {
    setReportModal({ isOpen: true, postId, sellerId });
  };

  const handleCancelReport = () => {
    setReportModal({ isOpen: false, postId: 0, sellerId: 0 });
  };

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
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 justify-center">
              {profile.tradePostsRes
                .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                .map(({ carrier, ...post }) => (
                  <SellingItem
                    key={post.postId}
                    networkType={getMobileDataTypeDisplay(post.mobileDataType)}
                    capacity={String(`${post.sellMobileDataAmountGB}GB`)}
                    sellerNickname={profile.nickname}
                    sellerProfileUrl={profile.profileImageUrl ?? IMAGE_PATHS.AVATAR}
                    price={`${formatPrice(String(post.totalZet)) ?? 0}ZET`}
                    timeLeft={formatTimeAgo(post.createdAt)}
                    sellerId={profile.userId}
                    carrier={carrier as Carrier}
                    {...post}
                    onPurchase={() => router.push(`/exchange/purchase/${post.postId}`)}
                    onReport={() => handleReport(post.postId, profile.userId)}
                    myCarrier={userPlan?.carrier as Carrier}
                  />
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
      <ReportedModal
        isOpen={reportModal.isOpen}
        onClose={handleCancelReport}
        postId={reportModal.postId}
        postOwnerUserId={reportModal.sellerId}
      />
    </div>
  );
}
