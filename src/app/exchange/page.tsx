'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

import { sellAPI } from '@/api';
import { AuthModal } from '@/features/exchange/components/AuthModal';
import { ExchangeFilters } from '@/features/exchange/components/ExchangeFilters';
import { ExchangeHeader } from '@/features/exchange/components/ExchangeHeader';
import { ExchangeList } from '@/features/exchange/components/ExchangeList';
import { Title } from '@/shared';

export default function ExchangePage() {
  const router = useRouter();
  const [authModal, setAuthModal] = useState({
    isOpen: false,
    title: '',
    description: '',
  });

  const handleEdit = (id: number) => {
    router.push(`/sell/edit/${id}`);
  };

  // 삭제 액션
  const handleDelete = async (id: number) => {
    const confirmed = confirm('정말로 게시물을 삭제하시겠습니까?');

    if (!confirmed) return;

    try {
      const response = await sellAPI.deletePost(id);

      if (response.statusCode === 200) {
        toast.success('게시물이 삭제되었습니다.');
        // React Query 사용 시 여기서 invalidateQueries 호출
        window.location.reload();
      } else {
        toast.error('게시물 삭제에 실패했습니다.');
      }
    } catch (error) {
      console.error('게시물 삭제 실패:', error);

      // API 에러 타입 확인
      if (error instanceof Error) {
        if (error.message.includes('410') || error.message.includes('Gone')) {
          toast.error('이미 삭제되었거나 만료된 게시물입니다.');
        } else if (error.message.includes('403') || error.message.includes('Forbidden')) {
          toast.error('삭제 권한이 없습니다.');
        } else {
          toast.error('게시물 삭제 중 오류가 발생했습니다.');
        }
      } else {
        toast.error('게시물 삭제 중 오류가 발생했습니다.');
      }

      setTimeout(() => {
        window.location.reload();
      }, 1500);
    }
  };

  // TODO: 신고 액션
  const handleReport = (id: number) => {
    // eslint-disable-next-line no-console
    console.log('게시물 신고:', id);
  };

  // TODO: 구매 API 연동
  const handlePurchase = (id: number) => {
    // eslint-disable-next-line no-console
    console.log('데이터 구매:', id);
  };

  return (
    <div className="flex flex-col min-h-full w-full pb-6">
      <div className="flex-1">
        {/* 헤더 */}
        <div className="flex items-center justify-between">
          <Title title="전파 거래소" />
        </div>

        {/* 잔액 & 알림 설정 */}
        <ExchangeHeader />

        {/* 필터 & 일괄구매 */}
        <ExchangeFilters />

        {/* 게시글 목록 */}
        <ExchangeList
          onEdit={handleEdit}
          onDelete={handleDelete}
          onReport={handleReport}
          onPurchase={handlePurchase}
        />
      </div>

      {/* 인증 모달 */}
      <AuthModal
        isOpen={authModal.isOpen}
        onClose={() => setAuthModal({ isOpen: false, title: '', description: '' })}
        title={authModal.title}
        description={authModal.description}
      />
    </div>
  );
}
