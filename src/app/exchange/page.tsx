'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { sellAPI } from '@/api';
import { ExchangeFilters } from '@/features/exchange/components/ExchangeFilters';
import { ExchangeHeader } from '@/features/exchange/components/ExchangeHeader';
import { ExchangeList } from '@/features/exchange/components/ExchangeList';
import { PostData } from '@/features/exchange/types';
import { Title } from '@/shared';

export default function ExchangePage() {
  const router = useRouter();

  const handleEdit = (id: number, postData: PostData) => {
    const queryParams = new URLSearchParams({
      title: postData.title,
      zetPerUnit: postData.zetPerUnit.toString(),
      capacity: postData.capacity.toString(),
      carrier: postData.carrier,
    });

    router.push(`/sell/edit/${id}?${queryParams.toString()}`);
  };

  // 삭제 액션
  const handleDelete = async (id: number) => {
    const confirmed = confirm('정말로 게시물을 삭제하시겠습니까?');

    if (!confirmed) return;

    try {
      const response = await sellAPI.deletePost(id);

      if (response.statusCode === 200) {
        toast.success('게시물이 삭제되었습니다.');

        // ExchangeList의 refetch를 트리거하기 위해 페이지 새로고침
        // 실제로는 React Query의 invalidateQueries를 사용하는 것이 좋음
        window.location.reload();
      } else {
        toast.error('게시물 삭제에 실패했습니다.');
      }
    } catch (error) {
      console.error('게시물 삭제 실패:', error);
      toast.error('게시물 삭제 중 오류가 발생했습니다.');
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
          onEdit={handleEdit} // 함수만 전달
          onDelete={handleDelete}
          onReport={handleReport}
          onPurchase={handlePurchase}
        />
      </div>
    </div>
  );
}
