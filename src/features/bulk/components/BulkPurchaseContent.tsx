'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { bulkPurchaseAPI } from '@/api';
import { BulkResultCard } from '@/features/bulk/components/BulkResultCard';
import { Button, Loading, Title } from '@/shared';
import { usePostIdsStore } from '@/stores/useBulkStore';
import { formatTimeAgo } from '@/utils';

import { BulkPurchaseItem, FailureBulkPurchaseItem } from '../types/bulkResult.types';

export function BulkPurchaseContent() {
  const { postIds, setPostIds } = usePostIdsStore();
  const router = useRouter();

  const [successBulkPurchase, setSuccessBulkPurchase] = useState<BulkPurchaseItem[]>([]);
  const [failureBulkPurchase, setFailureBulkPurchase] = useState<FailureBulkPurchaseItem[]>([]);
  const [postCounts, setPostCounts] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClick = () => {
    setPostIds([]);
    router.push('/exchange');
  };

  useEffect(() => {
    if (postIds.length === 0) return;

    const fetchPurchase = async () => {
      try {
        setIsLoading(true);
        const response = await bulkPurchaseAPI.postBulkPurchaseResult(postIds);
        if (response.statusCode !== 200) {
          toast.error(response.message ?? '일괄구매에 실패했습니다.');
          return;
        }
        setSuccessBulkPurchase(response.content.successPosts);
        setFailureBulkPurchase(response.content.failPosts);
        setPostCounts([response.content.successCount, response.content.failureCount]);
      } catch (e) {
        toast.error(e instanceof Error ? e.message : '알 수 없는 오류가 발생했습니다.');
        setError('일괄구매 결과를 불러오는 데 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPurchase();
  }, [postIds]);

  if (isLoading) return <Loading />;

  if (error) {
    return (
      <div className="text-red-500 text-center py-10">
        <p className="body-16-bold">{error}</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col gap-6">
      <Title title="일괄구매 결과" />
      <section>
        <p className="body-16-bold mb-3">구매한 데이터 ({postCounts[0] || 0}건)</p>
        {successBulkPurchase.length === 0 ? (
          <p className="text-gray-400 text-sm">구매한 데이터가 없습니다.</p>
        ) : (
          <div className="grid gap-4">
            {successBulkPurchase.map((item) => (
              <BulkResultCard
                key={item.postId}
                carrier={item.carrier}
                message={item.title}
                dataAmount={item.sellMobileDataCapacityGb}
                price={item.totalPrice}
                seller={item.sellerNickname}
                timeAgo={formatTimeAgo(item.createdAt)}
                profileUrl={item.sellerProfileUrl}
              />
            ))}
          </div>
        )}
      </section>

      <section>
        <p className="body-16-bold mb-3">실패한 데이터 ({postCounts[1] || 0}건)</p>
        {failureBulkPurchase.length === 0 ? (
          <p className="text-gray-400 text-sm">실패한 데이터가 없습니다.</p>
        ) : (
          <div className="grid gap-4">
            {failureBulkPurchase.map((item) => (
              <div className="relative border border-red-300/20 rounded-xl" key={item.postId}>
                {item.reason && (
                  <div className="absolute top-2 right-3 z-20">
                    <span className="block body-16-bold text-red-500 opacity-90 px-2 rounded">
                      {item.reason}
                    </span>
                  </div>
                )}

                <div className="opacity-60 grayscale">
                  <BulkResultCard
                    carrier={item.carrier}
                    message={item.title}
                    dataAmount={item.sellMobileDataCapacityGb}
                    price={item.totalPrice}
                    seller={item.sellerNickname}
                    timeAgo={formatTimeAgo(item.createdAt)}
                    profileUrl={item.sellerProfileUrl}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <Button onClick={handleClick} size="full-width" className="body-16-medium h-14 text-white">
        돌아가기
      </Button>
    </div>
  );
}
