'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { Carrier, sellAPI } from '@/backend';
import { IMAGE_PATHS } from '@/constants';
import SellingItem from '@/features/exchange/components/SellingItem';
import { useMyInfo } from '@/features/mypage/hooks';
import { useProfile } from '@/features/profile/hooks/useProfile';
import { Modal, ReportedModal, Title } from '@/shared';
import { useUserPlan } from '@/shared/hooks/useUserPlan';
import { formatPrice, formatTimeAgo, getMobileDataTypeDisplay, queryKeys } from '@/shared/utils';

interface DataListViewProps {
  userId: number;
  onRefetch?: (refetchFn: () => void) => void;
}

export function DataListView({ userId, onRefetch }: DataListViewProps) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: profile, isLoading, error, refetch } = useProfile(userId);
  const { data: userPlan } = useUserPlan();
  const { data: myInfo } = useMyInfo();

  const [reportModal, setReportModal] = useState({ isOpen: false, postId: 0, sellerId: 0 });
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, postId: 0 });
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    refetch();
    queryClient.invalidateQueries({ queryKey: queryKeys.profile(userId) });
  }, [onRefetch, refetch, userId, queryClient]);

  const handleRefetch = () => {
    refetch();
    queryClient.invalidateQueries({ queryKey: queryKeys.profile(userId) });
    queryClient.invalidateQueries({ queryKey: queryKeys.myInfo() });
  };

  const handleReport = (postId: number, sellerId: number) => {
    setReportModal({ isOpen: true, postId, sellerId });
    handleRefetch();
  };

  const handleCancelReport = () => {
    setReportModal({ isOpen: false, postId: 0, sellerId: 0 });
  };

  const handleDelete = (postId: number) => {
    setDeleteModal({ isOpen: true, postId });
  };

  const handleCancelDelete = () => {
    setDeleteModal({ isOpen: false, postId: 0 });
  };

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    try {
      await sellAPI.deletePost(deleteModal.postId);
      toast.success('게시물이 삭제되었습니다.');
      setDeleteModal({ isOpen: false, postId: 0 });

      handleRefetch();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '삭제 중 오류가 발생했습니다.';
      toast.error(errorMessage);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEdit = (postId: number) => {
    router.push(`/sell/edit/${postId}`);
    handleRefetch(); // ✅ 수정 후 refetch
  };

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
        <div className="text-white">{error?.message ?? '판매 데이터를 불러올 수 없습니다.'}</div>
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
              판매중인 데이터 <span className="text-cyan-400">{profile.tradePostsRes.length}</span>
              건
            </h3>
          </div>

          {profile.tradePostsRes.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 justify-center">
              {profile.tradePostsRes
                .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                .map(({ carrier, ...post }) => {
                  const isOwner = myInfo?.nickname === profile.nickname;

                  return (
                    <SellingItem
                      key={post.postId}
                      networkType={getMobileDataTypeDisplay(post.mobileDataType)}
                      capacity={`${post.sellMobileDataAmountGB}GB`}
                      sellerNickname={profile.nickname}
                      sellerProfileUrl={profile.profileImageUrl ?? IMAGE_PATHS.AVATAR}
                      price={`${formatPrice(String(post.totalZet)) ?? 0}ZET`}
                      timeLeft={formatTimeAgo(post.createdAt)}
                      sellerId={profile.userId}
                      carrier={carrier as Carrier}
                      isOwner={isOwner}
                      {...post}
                      onPurchase={() => router.push(`/exchange/purchase/${post.postId}`)}
                      onReport={() => handleReport(post.postId, profile.userId)}
                      myCarrier={userPlan?.carrier as Carrier}
                      onEdit={isOwner ? () => handleEdit(post.postId) : undefined}
                      onDelete={isOwner ? () => handleDelete(post.postId) : undefined}
                    />
                  );
                })}
            </div>
          ) : (
            <div className="text-center text-gray-400 py-12">
              <div className="text-lg mb-2">📱</div>
              <div>판매중인 데이터가 없습니다.</div>
            </div>
          )}
        </div>
      </div>

      <Modal
        isOpen={deleteModal.isOpen}
        onClose={handleCancelDelete}
        title="게시물을 삭제하시겠습니까?"
        description="삭제된 게시물은 복구할 수 없습니다."
        type="double"
        primaryButtonText={isDeleting ? '삭제 중...' : '삭제하기'}
        secondaryButtonText="취소"
        onPrimaryClick={handleConfirmDelete}
        onSecondaryClick={handleCancelDelete}
        primaryButtonDisabled={isDeleting}
      />

      <ReportedModal
        isOpen={reportModal.isOpen}
        onClose={handleCancelReport}
        postId={reportModal.postId}
        postOwnerUserId={reportModal.sellerId}
      />
    </div>
  );
}
