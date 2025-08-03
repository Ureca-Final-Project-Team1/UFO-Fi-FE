import Image from 'next/image';

import { Carrier } from '@/backend/types/carrier';
import { IMAGE_PATHS } from '@/constants';
import { ICON_PATHS } from '@/constants/icons';
import { Button, Icon, Badge, UserLink } from '@/shared';

interface SellingItemProps {
  carrier: Carrier;
  networkType: string;
  capacity: string;
  price: string;
  timeLeft: string;
  isOwner?: boolean;
  title: string;
  sellerNickname: string;
  sellerId: number;
  sellerProfileUrl: string;
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
  title,
  timeLeft,
  isOwner = false,
  sellerNickname,
  sellerId,
  sellerProfileUrl,
  onEdit,
  onDelete,
  onReport,
  onPurchase,
}: SellingItemProps) {
  const carrierIcon = getCarrierIcon(carrier);

  return (
    <div className="relative w-full max-w-[180px] sm:max-w-[196px] mb-8">
      {/* 카드 본체 */}
      <div className="relative z-10 p-3 rounded-2xl bg-[#0E213F] shadow-md border border-[#175F89] flex flex-col min-h-[240px]">
        {/* 뱃지들 */}
        <div className="flex justify-between items-center mb-3">
          <div className="flex gap-1">
            <Badge showIcon={false} variant="carrier" className="text-[9px] px-2 py-0.5">
              {carrierIcon && (
                <Image
                  src={carrierIcon}
                  alt={carrier}
                  width={12}
                  height={12}
                  className="inline-block w-3 h-3 mr-1"
                />
              )}
              {carrier}
            </Badge>
            <Badge showIcon={false} variant="secondary" className="text-[9px] px-2 py-0.5">
              {networkType}
            </Badge>
          </div>
        </div>

        {/* 시간 영역 */}
        <span className="text-gray-400 text-[12px] text-right">{timeLeft}</span>

        {/* 프로필 영역 - 클릭 시 프로필 페이지로 이동 */}
        <div className="mb-3">
          <UserLink userId={sellerId} nickname={sellerNickname} className="flex items-center gap-2">
            <div className="size-10 rounded-full overflow-hidden border border-cyan-400/30 hover:border-cyan-400 transition-colors flex-shrink-0">
              <Image
                src={sellerProfileUrl || IMAGE_PATHS.AVATAR}
                alt={`${sellerNickname} 프로필`}
                width={32}
                height={32}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col min-w-0 flex-1">
              <span className="text-cyan-300 caption-12-bold font-medium truncate">
                {sellerNickname}
              </span>
              <span className="text-gray-400 caption-12-regular">프로필 보기</span>
            </div>
          </UserLink>
        </div>

        {/* 글 제목 */}
        <div className="mb-3">
          <span className="text-white text-sm font-semibold line-clamp-1 leading-tight">
            {title}
          </span>
        </div>

        {/* 용량 + 가격 */}
        <div className="flex justify-between items-baseline mb-4">
          <span className="text-white text-base font-bold">{capacity}</span>
          <span className="text-cyan-300 text-base font-bold">{price}</span>
        </div>

        {/* 구매/관리 버튼 */}
        <div className="flex justify-end items-center gap-1">
          {!isOwner ? (
            <>
              <Button
                variant="exploration-button"
                size="sm"
                className="text-xs px-2 py-1"
                onClick={onPurchase}
              >
                구매하기
              </Button>
              <Button
                variant="ghost"
                size="compact"
                onClick={onReport}
                className="p-1 hover:bg-red-500/20 rounded-full"
                aria-label="신고하기"
              >
                <Icon name="Siren" className="size-3" color="red" />
              </Button>
            </>
          ) : (
            <div className="flex justify-end items-centers w-full gap-1">
              <Button
                variant="ghost"
                size="compact"
                onClick={onEdit}
                className="p-1 hover:bg-white/10 rounded-full"
                aria-label="수정하기"
              >
                <Icon name="Edit" className="size-3 text-white/70 hover:text-white" />
              </Button>
              <Button
                variant="ghost"
                size="compact"
                onClick={onDelete}
                className="p-1 hover:bg-red-500/20 rounded-full"
                aria-label="삭제하기"
              >
                <Icon name="Trash2" className="size-3 text-red-300 hover:text-red-200" />
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* 받침대 */}
      <Image
        src={IMAGE_PATHS.STONE}
        alt="stone"
        width={220}
        height={60}
        className="absolute bottom-[-1.75rem] left-1/2 -translate-x-1/2 z-0 scale-[0.9]"
      />
    </div>
  );
}
