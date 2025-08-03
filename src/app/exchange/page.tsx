'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

import { sellAPI, myInfoAPI, purchaseHistory, ExchangePost } from '@/api';
import { ExchangeHeader } from '@/features/exchange/components/ExchangeHeader';
import { ExchangeList } from '@/features/exchange/components/ExchangeList';
import { Modal, ReportedModal, Title } from '@/shared';
import { usePurchaseFlowStore } from '@/stores/usePurchaseFlowStore';
import { queryKeys } from '@/utils';

export default function ExchangePage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { setProductData, setUserZetBalance, setIsFirstPurchase } = usePurchaseFlowStore();

  const [deleteModal, setDeleteModal] = useState({ isOpen: false, postId: 0 });
  const [reportModal, setReportModal] = useState({ isOpen: false, postId: 0, sellerId: 0 });
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPurchaseLoading, setIsPurchaseLoading] = useState(false);

  // 수정 핸들러
  const handleEdit = (id: number) => {
    router.push(`/sell/edit/${id}`);
  };

  // 삭제 핸들러
  const handleDelete = (id: number) => {
    setDeleteModal({ isOpen: true, postId: id });
  };

  // 신고 핸들러
  const handleReport = (postId: number, sellerId: number) => {
    setReportModal({ isOpen: true, postId, sellerId });
  };

  // 데이터 미리 로드
  const handlePurchase = async (id: number, productFromList?: ExchangePost) => {
    setIsPurchaseLoading(true);

    try {
      // 1. 상품 데이터 준비
      let productData = productFromList;
      if (!productData) {
        const response = await sellAPI.getPostDetail(id);
        productData = response.content;
      }

      if (!productData) {
        toast.error('상품을 찾을 수 없습니다.');
        return;
      }

      if (productData.status !== 'SELLING') {
        toast.error('판매 중인 상품이 아닙니다.');
        return;
      }

      // 2. 병렬로 사용자 정보와 구매 내역 조회
      const [userInfo, history] = await Promise.all([myInfoAPI.get(), purchaseHistory()]);

      // 3. Zustand Store에 데이터 저장
      setProductData(productData);
      setUserZetBalance(userInfo?.zetAsset || 0);
      setIsFirstPurchase(!history || history.length === 0);

      // 4. 구매 페이지로 이동
      router.push(`/exchange/purchase/${id}`);
    } catch (error) {
      console.error('구매 준비 중 오류:', error);
      toast.error('구매 준비 중 오류가 발생했습니다.');
    } finally {
      setIsPurchaseLoading(false);
    }
  };

  // 삭제 확인
  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    try {
      await sellAPI.deletePost(deleteModal.postId);
      toast.success('게시물이 삭제되었습니다.');
      setDeleteModal({ isOpen: false, postId: 0 });

      // 캐시 무효화
      queryClient.invalidateQueries({
        queryKey: queryKeys.exchangePostsInfinite(),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.myInfo(),
      });
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('삭제 중 오류가 발생했습니다.');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCancelDelete = () => {
    setDeleteModal({ isOpen: false, postId: 0 });
  };

  const handleCancelReport = () => {
    setReportModal({ isOpen: false, postId: 0, sellerId: 0 });
  };

  return (
    <div className="pb-6">
      <main className="flex-1" role="main" aria-labelledby="page-title">
        <header className="flex items-center justify-between">
          <Title title="전파 거래소" iconVariant="back" />
        </header>

        <section className="mb-5" aria-label="거래소 정보 및 필터">
          <ExchangeHeader />
        </section>

        <section aria-label="데이터 거래 게시물 목록">
          <h2 className="sr-only">거래 게시물</h2>
          <ExchangeList
            onEdit={handleEdit}
            onDelete={handleDelete}
            onReport={handleReport}
            onPurchase={handlePurchase}
            purchaseLoading={isPurchaseLoading}
          />
        </section>
      </main>

      {/* 모달들 */}
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
