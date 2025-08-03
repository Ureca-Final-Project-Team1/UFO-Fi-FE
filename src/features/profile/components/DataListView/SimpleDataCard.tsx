'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import type { TradePost } from '@/backend/types/profile';
import { ICON_PATHS } from '@/constants/icons';
import { Button, Icon, Badge, Avatar } from '@/shared';
import { formatTimeAgo } from '@/shared/utils';
import { getMobileDataTypeDisplay } from '@/shared/utils';

interface SimpleDataCardProps {
  post: TradePost;
  sellerNickname: string;
}

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

export function SimpleDataCard({ post, sellerNickname }: SimpleDataCardProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const carrierIcon = getCarrierIcon(post.carrier);
  const timeAgo = formatTimeAgo(post.createdAt);
  const networkType = getMobileDataTypeDisplay(post.mobileDataType);

  const handlePurchase = async () => {
    setIsLoading(true);
    try {
      router.push(`/exchange/purchase/${post.postId}/step1`);
    } catch (error) {
      console.error('구매 페이지 이동 실패:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative p-4 rounded-2xl border border-white/10 gradient-card-1">
      <div className="flex gap-4 items-center">
        {/* 아바타 */}
        <Avatar variant="selling" size="md">
          <Icon name="astronaut" className="w-8 h-8 text-purple-200" />
        </Avatar>

        <div className="flex-1 flex flex-col gap-1">
          {/* 뱃지 */}
          <div className="flex items-center justify-between">
            <Badge showIcon={false} variant="secondary">
              <div className="flex items-center gap-1">
                {carrierIcon && <Icon src={carrierIcon} alt={post.carrier} className="size-4" />}
                <span>{`${post.carrier} ${networkType}`}</span>
              </div>
            </Badge>
          </div>

          {/* 제목 */}
          <span className="text-white text-xl font-bold line-clamp-1" title={post.title}>
            {post.title}
          </span>

          {/* 용량 + 가격 */}
          <div className="flex gap-2 items-baseline">
            <span className="text-white text-xl font-bold">{post.sellMobileDataAmountGB}GB</span>
          </div>

          {/* 판매자 닉네임 */}
          <span className="text-gray-300 text-xs">by {sellerNickname}</span>

          {/* 시간 + 구매 버튼 */}
          <div className="flex justify-between items-center">
            <span className="text-gray-300 text-sm">{timeAgo}</span>
            <Button
              variant="exploration-button"
              size="sm"
              onClick={handlePurchase}
              disabled={isLoading}
              className="text-white shadow-lg px-4 py-2 caption-14-bold"
            >
              {isLoading ? '이동 중...' : '구매하기'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
