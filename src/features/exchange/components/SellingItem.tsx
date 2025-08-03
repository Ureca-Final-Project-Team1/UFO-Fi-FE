import Image from 'next/image';

import { Carrier } from '@/backend/types/carrier';
import { IMAGE_PATHS } from '@/constants';
import { ICON_PATHS } from '@/constants/icons';
import { Button, Icon, Badge, Avatar, UserLink } from '@/shared';

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
    <div className="relative w-[10rem] mb-5">
      {/* 카드 본체 */}
      <div className="relative z-10 p-4 rounded-2xl bg-[#0E213F] shadow-md border border-[#175F89] flex flex-col min-h-[186px]">
        <div className="flex flex-row gap-2 justify-between">
          <div>
            {/* 판매자 프로필 이미지 */}
            <Avatar variant="selling" size="sm">
              <Image
                src={sellerProfileUrl || IMAGE_PATHS.AVATAR}
                alt={`${sellerNickname} 프로필`}
                width={32}
                height={32}
                className="w-full h-full object-cover rounded-full"
              />
            </Avatar>
          </div>
          <div className="flex flex-col items-end mb-1">
            <div className="flex items-center gap-1 mb-1">
              <Badge showIcon={false} variant="carrier">
                {carrierIcon && (
                  <Image
                    src={carrierIcon}
                    alt={carrier}
                    width={12}
                    height={12}
                    className="object-contain"
                  />
                )}
              </Badge>
              <Badge showIcon={false} variant="secondary">
                {`${networkType}`}
              </Badge>
            </div>
            <span className="text-gray-400 text-xs">{timeLeft}</span>
          </div>
        </div>

        {/* 제목 */}
        <div>
          <span className="text-white text-[12px] font-semibold">{title}</span>
        </div>
        <div className="mt-auto">
          {/* 용량 + 가격 */}
          <div className="flex gap-2 items-baseline justify-between">
            <span className="text-white text-md font-bold">{capacity}</span>
            <span className="text-cyan-300 text-md font-bold">{price}</span>
          </div>
          {sellerNickname && (
            <div className="text-[0.7rem]">
              <span className="text-gray-400">by </span>
              <UserLink
                userId={sellerId}
                nickname={sellerNickname}
                className="text-cyan-300 hover:text-cyan-200 text-[0.7rem] underline-offset-2"
              />
            </div>
          )}

          {/* 구매 버튼 & 리포트/수정 버튼 */}
          <div className="flex justify-between items-center mt-1">
            {!isOwner ? (
              <>
                <Button
                  variant="exploration-button"
                  size="sm"
                  onClick={onPurchase}
                  className="text-white px-4 py-1"
                >
                  구매하기
                </Button>
                <Button
                  variant="ghost"
                  size="compact"
                  onClick={onReport}
                  className="p-1 hover:bg-white/10 rounded-full"
                >
                  <Icon name="Siren" className="size-4" color="white" />
                </Button>
              </>
            ) : (
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="compact"
                  onClick={onEdit}
                  className="p-1 hover:bg-white/10 rounded-full"
                >
                  <Icon name="Edit" className="size-4 text-white/70 hover:text-white" />
                </Button>
                <Button
                  variant="ghost"
                  size="compact"
                  onClick={onDelete}
                  className="p-1 hover:bg-red-500/20 rounded-full"
                >
                  <Icon name="Trash2" className="size-4 text-red-300 hover:text-red-200" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stone 받침대 */}
      <Image
        src={IMAGE_PATHS.STONE}
        alt="stone"
        width={260}
        height={70}
        className="absolute bottom-[-2rem] left-1/2 -translate-x-1/2 z-0"
      />
    </div>
  );
}
