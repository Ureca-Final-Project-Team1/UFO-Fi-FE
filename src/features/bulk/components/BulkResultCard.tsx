import Image from 'next/image';

import { Carrier } from '@/api/types/carrier';
import { IMAGE_PATHS } from '@/constants';
import { Icon, Avatar } from '@/shared';

interface BulkResultCardProps {
  carrier: Carrier;
  message: string;
  dataAmount: number;
  price: number;
  seller: string;
  timeAgo: string;
  profileUrl?: string;
}

const CARRIER_COLORS = {
  KT: 'bg-red-500',
  SKT: 'bg-red-600',
  LGU: 'bg-pink-500',
};

// 일괄구매 구매 예정 데이터 카드 아이템
export function BulkResultCard({
  carrier,
  message,
  dataAmount,
  price,
  seller,
  timeAgo,
  profileUrl,
}: BulkResultCardProps) {
  return (
    <div className="gradient-card-1 rounded-2xl p-4 flex flex-col gap-3 h-full min-h-[120px]">
      {/* 상단: 사용자 닉네임 & 타임스탬프 */}
      <div className="flex items-center gap-2">
        <Avatar size="sm">
          <Image
            src={profileUrl || IMAGE_PATHS.AVATAR}
            alt="profile"
            className="w-full h-full object-cover rounded-full"
            width={32}
            height={32}
          />
        </Avatar>
        <div className="flex flex-col">
          <span className="text-white caption-14-bold">{seller}</span>
          <span className="text-gray-300 caption-12-regular">{timeAgo}</span>
        </div>
      </div>

      {/* 통신사 & 타이틀 */}
      <div className="flex items-center gap-2 flex-1">
        <div
          className={`w-6 h-6 rounded ${CARRIER_COLORS[carrier]} flex items-center justify-center flex-shrink-0`}
        >
          <span className="text-white caption-12-bold">{carrier}</span>
        </div>
        <span className="text-white caption-14-regular truncate">{message}</span>
      </div>

      {/* 하단: 데이터량 & 가격 */}
      <div className="flex flex-wrap justify-between gap-y-2">
        <div className="flex items-center gap-2">
          <Icon name="Database" className="w-4 h-4 text-cyan-400" />
          <span className="text-cyan-400 body-16-semibold">{dataAmount}GB</span>
        </div>

        <div className="flex items-center gap-2">
          <Icon name="Coins" className="w-4 h-4 text-yellow-400" />
          <span className="text-yellow-400 body-16-semibold">{price}ZET</span>
        </div>
      </div>
    </div>
  );
}
