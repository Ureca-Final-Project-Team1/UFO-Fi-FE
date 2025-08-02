'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

import { sellAPI } from '@/api';
import { ExchangeHeader } from '@/features/exchange/components/ExchangeHeader';
import { ExchangeList } from '@/features/exchange/components/ExchangeList';
import { Modal, ReportedModal, Title } from '@/shared';
import { queryKeys } from '@/utils';

export default function ExchangePage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, postId: 0 });
  const [reportModal, setReportModal] = useState({ isOpen: false, postId: 0, sellerId: 0 });
  const [isDeleting, setIsDeleting] = useState(false);

  // 수정 핸들러
  const handleEdit = (id: number) => {
    router.push(`/exchange/edit/${id}`);
  };

  // 삭제 핸들러
  const handleDelete = (id: number) => {
    setDeleteModal({ isOpen: true, postId: id });
  };

  // 신고 핸들러
  const handleReport = (postId: number, sellerId: number) => {
    setReportModal({ isOpen: true, postId, sellerId });
  };

  // 구매 핸들러
  const handlePurchase = (id: number) => {
    router.push(`/exchange/purchase/${id}`);
  };

  // 삭제 확인
  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    try {
      // 실제 API 호출
      await sellAPI.deletePost(deleteModal.postId);

      toast.success('게시물이 삭제되었습니다.');
      setDeleteModal({ isOpen: false, postId: 0 });

      // queryKeys를 사용한 캐시 무효화
      queryClient.invalidateQueries({
        queryKey: queryKeys.exchangePostsInfinite(),
      });

      queryClient.invalidateQueries({
        queryKey: ['posts'], // 기존 posts 키가 있다면
      });

      // 내 정보도 업데이트
      queryClient.invalidateQueries({
        queryKey: queryKeys.myInfo(),
      });
    } catch (error) {
      console.error('Delete error:', error);

      // 에러 타입별 메시지 처리
      if (error instanceof Error) {
        if (error.message.includes('404')) {
          toast.error('이미 삭제되었거나 존재하지 않는 게시물입니다.');
        } else if (error.message.includes('403')) {
          toast.error('삭제 권한이 없습니다.');
        } else if (error.message.includes('401')) {
          toast.error('로그인이 필요합니다.');
        } else {
          toast.error('삭제 중 오류가 발생했습니다.');
        }
      } else {
        toast.error('삭제 중 오류가 발생했습니다.');
      }
    } finally {
      setIsDeleting(false);
    }
  };

  // 삭제 취소
  const handleCancelDelete = () => {
    setDeleteModal({ isOpen: false, postId: 0 });
  };

  // 신고 모달 닫기
  const handleCancelReport = () => {
    setReportModal({ isOpen: false, postId: 0, sellerId: 0 });
  };

  return (
    <div className="pb-6">
      {/* 메인 컨텐츠 */}
      <main className="flex-1" role="main" aria-labelledby="page-title">
        {/* 페이지 헤더 */}
        <header className="flex items-center justify-between">
          <Title title="전파 거래소" iconVariant="back" />
        </header>

        {/* 상단 영역 */}
        <section className="mb-5" aria-label="거래소 정보 및 필터">
          <ExchangeHeader />
        </section>

        {/* 게시글 목록 */}
        <section aria-label="데이터 거래 게시물 목록">
          <h2 className="sr-only">거래 게시물</h2>
          <ExchangeList
            onEdit={handleEdit}
            onDelete={handleDelete}
            onReport={handleReport}
            onPurchase={handlePurchase}
          />
        </section>
      </main>

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
        aria-labelledby="delete-modal-title"
        aria-describedby="delete-modal-description"
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
