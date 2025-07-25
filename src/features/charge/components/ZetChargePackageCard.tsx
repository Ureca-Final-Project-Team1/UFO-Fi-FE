import Image from 'next/image';

import { IMAGE_PATHS } from '@/constants/images';
import { Button } from '@/shared/ui/Button';

const PACKAGE_SIZES = {
  A: { width: 37, height: 37 },
  DEFAULT: { width: 56, height: 60 },
} as const;

interface ZetChargePackageCardProps {
  id: string;
  zet: number;
  price: number;
  onBuyClick: (packageId: string, zetAmount: number, price: number) => void;
  isLoading?: boolean;
}

export function ZetChargePackageCard({
  id,
  zet,
  price,
  onBuyClick,
  isLoading = false,
}: ZetChargePackageCardProps) {
  const size = PACKAGE_SIZES[id as 'A'] || PACKAGE_SIZES.DEFAULT;

  const handleBuyClick = () => {
    onBuyClick(id, zet, price);
  };

  return (
    <div className="gradient-card-1 w-[358px] h-[104px] rounded-2xl px-5 py-3 relative">
      <Image
        src={IMAGE_PATHS[`PACKAGE_${id}` as keyof typeof IMAGE_PATHS]}
        alt={`패키지 ${id} 이미지`}
        width={size.width}
        height={size.height}
        className={`absolute ${id === 'A' ? 'left-7' : 'left-5'} top-1/2 -translate-y-1/2`}
      />
      <div className="flex flex-col justify-center h-full ml-[64px]">
        <div className="flex items-center gap-[2px] mb-[2px]">
          <Image src={IMAGE_PATHS.PACKAGE_A} alt="패키지 아이콘" width={20} height={20} />
          <span className="body-16-bold text-white">패키지 {id}</span>
        </div>
        <div className="heading-24-bold text-cyan-400 mb-[2px]">{zet} ZET</div>
        <div className="body-16-semibold text-white">₩{price.toLocaleString()}</div>
      </div>
      <div className="absolute bottom-3 right-5">
        <Button
          variant="exploration-button"
          size="sm"
          onClick={handleBuyClick}
          disabled={isLoading}
        >
          {isLoading ? '처리중...' : '구매하기'}
        </Button>
      </div>
    </div>
  );
}
