'use client';

import Image from 'next/image';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { purchaseHistory } from '@/api/services/history/purchaseHistory';
import { purchaseDetailService, PurchaseDetail } from '@/api/services/mypage/purchaseDetail';
import { ICON_PATHS, IMAGE_PATHS } from '@/constants';
import { Icon, Title } from '@/shared';

export default function MyTradeDetailPage() {
  const [purchaseDetail, setPurchaseDetail] = useState<PurchaseDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const purchaseHistoryId = searchParams.get('id');

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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date
      .toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
      .replace(/\./g, '.')
      .replace(/\s/g, ' ');
  };

  const getCarrierIcon = (carrier: string) => {
    switch (carrier.toUpperCase()) {
      case 'SKT':
        return ICON_PATHS.SKT;
      case 'KT':
        return ICON_PATHS.KT;
      case 'LG U+':
      case 'LGU+':
      case 'LGU':
        return ICON_PATHS.LGU;
      default:
        return null;
    }
  };

  if (loading) {
    return null;
  }

  if (error) {
    return (
      <div className="overflow-y-hidden w-full min-h-f flex flex-col items-center justify-center">
        <Title title="주문 상세" iconVariant="back" />
        <div className="flex items-center justify-center mt-8">
          <div className="text-red-500">{error}</div>
        </div>
      </div>
    );
  }

  if (!purchaseDetail) {
    return (
      <div className="overflow-y-hidden w-full min-h-f flex flex-col items-center justify-center">
        <Title title="주문 상세" iconVariant="back" />
        <div className="flex items-center justify-center mt-8">
          <div className="text-gray-500">구매 내역을 찾을 수 없습니다.</div>
        </div>
      </div>
    );
  }
  return (
    <div className="overflow-y-hidden w-full min-h-f flex flex-col items-center justify-center">
      <Title title="주문 상세" iconVariant="back" />
      <div className="w-full flex items-center justify-center mt-8 relative">
        <Image src={IMAGE_PATHS['RECEIPT']} alt="receipt" width={350} height={350} />

        {/* 영수증 내용 */}
        <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-64 text-center">
          {/* UFO-Fi 타이틀 */}
          <div className="mb-10">
            <Icon src={ICON_PATHS.UFO_LOGO} alt="UFO Logo" size="3xl" />
            <div className="text-3xl font-bold text-gray-800">UFO-Fi</div>
          </div>
          <div className="flex justify-between border-b-2 border-dotted border-gray-400 pb-1 mb-3"></div>
          {/* 주문번호 */}
          <div className="flex justify-between border-b-2 border-dotted border-gray-400 pb-1 mb-3">
            <span className="text-sm text-gray-600">주문번호</span>
            <span className="text-sm font-medium text-black">
              {purchaseDetail.purchaseHistoryId}
            </span>
          </div>

          {/* 상품 정보 */}
          <div className="flex justify-between border-b-2 border-dotted border-gray-400 pb-1 mb-3">
            <span className="text-sm text-gray-600">상품 정보</span>
            <span className="text-sm font-medium text-black flex items-center gap-1">
              <Icon
                src={getCarrierIcon(purchaseDetail.carrier)!}
                alt={purchaseDetail.carrier}
                className="w-3 h-3 object-contain"
              />
              {purchaseDetail.totalGB}GB
            </span>
          </div>

          {/* 구매 일자 */}
          <div className="flex justify-between border-b-2 border-dotted border-gray-400 pb-1 mb-3">
            <span className="text-sm text-gray-600">구매 일자</span>
            <span className="text-sm font-medium text-black">
              {formatDate(purchaseDetail.createdAt)}
            </span>
          </div>

          {/* 총 ZET */}
          <div className="flex justify-between border-b-2 border-dotted border-gray-400 pb-1 mb-8">
            <span className="text-sm text-gray-600">구입 가격</span>
            <span className="text-sm font-medium text-black">{purchaseDetail.totalZet} ZET</span>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-center mt-8 relative">
        <Image
          src={IMAGE_PATHS['AL_COMPLETE']}
          alt="avatar"
          width={150}
          height={150}
          className="absolute mx-auto mb-10 -top-10"
        />
        <Image
          src={IMAGE_PATHS['MY_PLANET']}
          alt="my-planet"
          width={390}
          height={390}
          className="mx-auto mt-10"
        />
      </div>
    </div>
  );
}
