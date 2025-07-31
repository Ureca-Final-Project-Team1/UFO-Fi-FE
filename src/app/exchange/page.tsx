'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

import { sellAPI } from '@/api';
import { ExchangeHeader } from '@/features/exchange/components/ExchangeHeader';
import { ExchangeList } from '@/features/exchange/components/ExchangeList';
import { useScrollTracker } from '@/hooks/useScrollTracker';
import { Title, Modal, ReportedModal } from '@/shared';
import { handleApiAction } from '@/utils/handleApiAction';
import queryClient from '@/utils/queryClient';

export default function ExchangePage() {
  const router = useRouter();
  useScrollTracker(); // 스크롤 위치 추적 훅

  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    postId: 0,
  });
  const [isDeleting, setIsDeleting] = useState(false);

  const [reportModal, setReportModal] = useState({
    isOpen: false,
    postId: 0,
    sellerId: 0,
  });

  const handleEdit = (id: number) => {
    router.push(`/sell/edit/${id}`);
  };

  // 삭제 모달 열기
  const handleDelete = (id: number) => {
    setDeleteModal({ isOpen: true, postId: id });
  };

  // 신고 모달 열기
  const handleReport = (id: number, sellerId: number) => {
    setReportModal({ isOpen: true, postId: id, sellerId });
  };

  // 실제 삭제 실행
  const handleConfirmDelete = async () => {
    setIsDeleting(true);

    await handleApiAction({
      apiCall: () => sellAPI.deletePost(deleteModal.postId),
      successMessage: '게시물이 삭제되었습니다.',
      errorMessage: '게시물 삭제 중 오류가 발생했습니다.',
      onSuccess: () => {
        setDeleteModal({ isOpen: false, postId: 0 });
        queryClient.invalidateQueries({ queryKey: ['exchangePosts'] });
        setIsDeleting(false);
      },
      onError: (error) => {
        // 특정 에러 케이스 처리
        if (error instanceof Error) {
          if (error.message.includes('410') || error.message.includes('Gone')) {
            toast.error('이미 삭제되었거나 만료된 게시물입니다.');
          } else if (error.message.includes('403') || error.message.includes('Forbidden')) {
            toast.error('삭제 권한이 없습니다.');
          }
        }

        setTimeout(() => {
          queryClient.invalidateQueries({ queryKey: ['exchangePosts'] });
        }, 1500);
      },
    });
  };

  // 삭제 모달 닫기
  const handleCancelDelete = () => {
    setDeleteModal({ isOpen: false, postId: 0 });
  };

  // 신고 모달 닫기
  const handleCancelReport = () => {
    setReportModal({ isOpen: false, postId: 0, sellerId: 0 });
  };

  // 구매 액션
  const handlePurchase = (id: number) => {
    router.push(`/exchange/purchase/${id}`);
  };

  return (
    <div className="flex flex-col min-h-full w-full pb-6">
      <div className="flex-1">
        {/* 헤더 */}
        <div className="flex items-center justify-between">
          <Title title="전파 거래소" />
        </div>

        <div className="mb-5">
          {/* 상단 영역 */}
          <ExchangeHeader />
        </div>

        {/* 게시글 목록 */}
        <ExchangeList
          onEdit={handleEdit}
          onDelete={handleDelete}
          onReport={handleReport}
          onPurchase={handlePurchase}
        />
      </div>

      {/* 삭제 확인 모달 */}
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

      {/* 신고 모달 */}
      <ReportedModal
        isOpen={reportModal.isOpen}
        onClose={handleCancelReport}
        postId={reportModal.postId}
        postOwnerUserId={reportModal.sellerId}
      />
    </div>
  );
}
