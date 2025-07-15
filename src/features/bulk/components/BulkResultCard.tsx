import { Icon, Avatar } from '@/shared';

interface BulkResultCardProps {
  carrier: 'KT' | 'SKT' | 'LGU';
  message: string;
  dataAmount: number;
  price: number;
  seller: string;
  timeAgo: string;
}

const CARRIER_COLORS = {
  KT: 'bg-red-500',
  SKT: 'bg-red-600',
  LGU: 'bg-pink-500',
};

export function BulkResultCard({
  carrier,
  message,
  dataAmount,
  price,
  seller,
  timeAgo,
}: BulkResultCardProps) {
  return (
    <div className="gradient-card-1 rounded-2xl p-4 flex flex-col gap-3 h-full min-h-[120px]">
      {/* 상단: 사용자 정보 & 시간 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar size="sm" />
          <span className="text-white body-14-medium">{seller}</span>
        </div>
        <span className="text-gray-400 caption-12-regular">{timeAgo}</span>
      </div>

      {/* 중앙: 통신사 & 메시지 */}
      <div className="flex items-center gap-2 flex-1">
        <div
          className={`w-6 h-6 rounded ${CARRIER_COLORS[carrier]} flex items-center justify-center flex-shrink-0`}
        >
          <span className="text-white caption-12-bold">{carrier}</span>
        </div>
        <span className="text-white body-14-medium truncate">{message}</span>
      </div>

      {/* 하단: 데이터량 & 가격 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon name="Database" className="w-4 h-4 text-cyan-400" />
          <span className="text-cyan-400 heading-18-bold">{dataAmount}GB</span>
        </div>

        <div className="flex items-center gap-1">
          <Icon name="Coins" className="w-4 h-4 text-yellow-400" />
          <span className="text-yellow-400 heading-16-bold">{price}ZET</span>
        </div>
      </div>
    </div>
  );
}
