import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { purchaseHistory } from '@/api/services/history/purchaseHistory';
import { purchaseDetailService, PurchaseDetail } from '@/api/services/mypage/purchaseDetail';

interface UsePurchaseDetailResult {
  purchaseDetail: PurchaseDetail | null;
  loading: boolean;
  error: string | null;
}

export const usePurchaseDetail = (purchaseHistoryId: string | null): UsePurchaseDetailResult => {
  const [purchaseDetail, setPurchaseDetail] = useState<PurchaseDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchPurchaseDetail = async () => {
      if (!purchaseHistoryId) {
        setError('구매 내역 ID가 없습니다.');
        setLoading(false);
        return;
      }

      try {
        // 1. 먼저 현재 사용자의 구매 내역 리스트를 가져와서 권한 확인해야함
        const userPurchaseList = await purchaseHistory();
        const isAuthorized = userPurchaseList?.some(
          (item) => item.purchaseHistoryId.toString() === purchaseHistoryId,
        );

        if (!isAuthorized) {
          setError('접근 권한이 없습니다.');
          setLoading(false);
          // 3초 후 자동으로 거래 내역 페이지로 리다이렉트
          setTimeout(() => {
            router.push('/mypage/trade');
          }, 3000);
          return;
        }

        // 2. 권한이 확인되면 상세 정보를 가져옴
        const data = await purchaseDetailService.getPurchaseDetail(purchaseHistoryId);
        setPurchaseDetail(data);
      } catch (error) {
        console.error('Failed to fetch purchase detail:', error);
        setError(error instanceof Error ? error.message : '구매 내역을 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchPurchaseDetail();
  }, [purchaseHistoryId, router]);

  return {
    purchaseDetail,
    loading,
    error,
  };
};
