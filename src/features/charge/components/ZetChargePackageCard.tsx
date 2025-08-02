import Image from 'next/image';
import { useMemo } from 'react';

import { IMAGE_PATHS } from '@/constants';
import { Button } from '@/shared';

// 패키지 크기 상수
const PACKAGE_SIZES = {
  A: { width: 37, height: 37 },
  DEFAULT: { width: 56, height: 60 },
} as const;

// 레이아웃 상수
const LAYOUT = {
  CARD_HEIGHT: 104,
  LEFT_PADDING_A: 28,
  LEFT_PADDING_DEFAULT: 20,
  CONTENT_LEFT_MARGIN: 64,
  ICON_SIZE: 20,
  SPACING: {
    SMALL: 2,
    MEDIUM: 12,
  },
} as const;

interface ZetChargePackageCardProps {
  id: string;
  zet: number;
  price: number;
  onBuyClick: (packageId: string, zetAmount: number, price: number) => void;
}

export function ZetChargePackageCard({ id, zet, price, onBuyClick }: ZetChargePackageCardProps) {
  // 패키지 크기 계산
  const packageSize = useMemo(() => {
    return PACKAGE_SIZES[id as 'A'] || PACKAGE_SIZES.DEFAULT;
  }, [id]);

  // 패키지 이미지 위치 계산
  const packageImagePosition = useMemo(() => {
    const leftPosition = id === 'A' ? LAYOUT.LEFT_PADDING_A : LAYOUT.LEFT_PADDING_DEFAULT;
    return `absolute left-[${leftPosition}px] top-1/2 -translate-y-1/2`;
  }, [id]);

  // 패키지 이미지 키 생성
  const packageImageKey = `PACKAGE_${id}` as keyof typeof IMAGE_PATHS;

  // 구매 버튼 핸들러
  const handleBuyClick = () => {
    onBuyClick(id, zet, price);
  };

  // 포맷된 가격
  const formattedPrice = `₩${price.toLocaleString()}`;

  return (
    <div
      className="gradient-card-1 w-full rounded-2xl px-5 py-3 relative transition-all duration-200 hover:shadow-lg"
      style={{ height: LAYOUT.CARD_HEIGHT }}
    >
      {/* 패키지 이미지 */}
      <Image
        src={IMAGE_PATHS[packageImageKey]}
        alt={`패키지 ${id} 이미지`}
        width={packageSize.width}
        height={packageSize.height}
        className={packageImagePosition}
        priority
      />

      {/* 패키지 정보 */}
      <div
        className="flex flex-col justify-center h-full"
        style={{ marginLeft: LAYOUT.CONTENT_LEFT_MARGIN }}
      >
        {/* 패키지 제목 */}
        <PackageTitle id={id} />

        {/* ZET 수량 */}
        <ZetAmount amount={zet} />

        {/* 가격 */}
        <Price price={formattedPrice} />
      </div>

      {/* 구매 버튼 */}
      <PurchaseButton onClick={handleBuyClick} />
    </div>
  );
}

// 패키지 제목 컴포넌트
function PackageTitle({ id }: { id: string }) {
  return (
    <div className="flex items-center gap-0.5" style={{ marginBottom: LAYOUT.SPACING.SMALL }}>
      <Image
        src={IMAGE_PATHS.PACKAGE_A}
        alt="패키지 아이콘"
        width={LAYOUT.ICON_SIZE}
        height={LAYOUT.ICON_SIZE}
      />
      <span className="body-16-bold text-white">패키지 {id}</span>
    </div>
  );
}

// ZET 수량 컴포넌트
function ZetAmount({ amount }: { amount: number }) {
  return (
    <div className="heading-24-bold text-cyan-400" style={{ marginBottom: LAYOUT.SPACING.SMALL }}>
      {amount.toLocaleString()} ZET
    </div>
  );
}

// 가격 컴포넌트
function Price({ price }: { price: string }) {
  return <div className="body-16-semibold text-white">{price}</div>;
}

// 구매 버튼 컴포넌트
function PurchaseButton({ onClick }: { onClick: () => void }) {
  return (
    <div className="absolute bottom-3 right-5">
      <Button
        type="button"
        variant="exploration-button"
        size="sm"
        onClick={onClick}
        className="transition-all duration-200 hover:scale-105 active:scale-95"
      >
        구매하기
      </Button>
    </div>
  );
}
