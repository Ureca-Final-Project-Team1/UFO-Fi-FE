import { ICON_PATHS } from '@/constants/icons';
import { Button, Icon, Badge, Avatar } from '@/shared';

interface SellingItemProps {
  carrier: string;
  networkType: string;
  capacity: string;
  price: string;
  timeLeft: string;
  isOwner?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  onReport?: () => void;
  onPurchase?: () => void;
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

export default function SellingItem({
  carrier,
  networkType,
  capacity,
  price,
  timeLeft,
  isOwner = false,
  onEdit,
  onDelete,
  onReport,
  onPurchase,
}: SellingItemProps) {
  const carrierIcon = getCarrierIcon(carrier);

  // 필수 props 유효성 검사만 진행
  if (!carrier || !capacity || !price || !timeLeft) {
    return null;
  }

  return (
    <div className="relative p-4 rounded-2xl border border-white/10 gradient-card-1">
      {/* 오른쪽 상단 버튼 */}
      <div className="absolute top-2 right-2 flex">
        {isOwner ? (
          <>
            <Button
              variant="ghost"
              size="compact"
              onClick={onEdit}
              className="p-1 hover:bg-white/10 rounded-full"
            >
              <Icon name="Edit" className="w-4 h-4 text-white/70 hover:text-white" />
            </Button>
            <Button
              variant="ghost"
              size="compact"
              onClick={onDelete}
              className="p-1 hover:bg-red-500/20 rounded-full"
            >
              <Icon name="Trash2" className="w-4 h-4 text-red-300 hover:text-red-200" />
            </Button>
          </>
        ) : (
          <Button
            variant="ghost"
            size="compact"
            onClick={onReport}
            className="p-1 hover:bg-white/10 rounded-full"
          >
            <Icon name="Siren" className="w-4 h-4" color="red" />
          </Button>
        )}
      </div>

      {/* 콘텐츠 라인 */}
      <div className="flex gap-4 items-start">
        {/* 아바타 */}
        <Avatar variant="selling" size="md">
          <Icon name="astronaut" className="w-8 h-8 text-purple-200" />
        </Avatar>

        {/* 정보 영역 */}
        <div className="flex-1 flex flex-col gap-1">
          {/* 뱃지 */}
          <Badge showIcon={false} variant="secondary">
            <div className="flex items-center gap-1">
              {carrierIcon && <Icon src={carrierIcon} alt={carrier} className="w-4 h-4" />}
              <span>{`${carrier} ${networkType}`}</span>
            </div>
          </Badge>

          {/* 용량 + 가격 */}
          <div className="flex gap-2 items-baseline">
            <span className="text-white text-xl font-bold">{capacity}</span>
            <span className="text-cyan-300 text-xl font-bold">{price}</span>
          </div>

          {/* 시간 + 구매 버튼 한 줄 정렬 */}
          <div className="flex justify-between items-center">
            <span className="text-gray-300 text-sm">{timeLeft}</span>
            {!isOwner && (
              <Button
                variant="exploration-button"
                size="sm"
                onClick={onPurchase}
                className="text-white shadow-lg px-4 py-2 caption-14-bold"
              >
                구매하기
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
