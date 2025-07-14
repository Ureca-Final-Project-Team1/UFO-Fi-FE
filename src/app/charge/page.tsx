'use client';

import { useRouter } from 'next/navigation';

import { IMAGE_PATHS } from '@/constants/images';
import { ZetChargePackageCard } from '@/features/charge/components/ZetChargePackageCard';
import { Icon } from '@/shared/ui/Icons';
import { Title } from '@/shared/ui/Title';
import '@/styles/globals.css';

const packages = [
  { id: 'A', zet: 180, price: 1800 },
  { id: 'B', zet: 360, price: 3600 },
  { id: 'C', zet: 360, price: 3600 },
  { id: 'D', zet: 1200, price: 12000 },
  { id: 'E', zet: 3000, price: 30000 },
];

export default function ZetChargePage() {
  const router = useRouter();

  return (
    <div className="relative min-h-full flex flex-col">
      <div className="px-4 pt-4">
        <div className="flex items-center justify-between mb-2">
          <Title title="ZET 코인 충전소" iconVariant="back" onClick={() => router.back()} />
        </div>
        <div className="flex items-center justify-between mb-4">
          <p className="body-16-medium text-white m-0">외계 전파 코인을 구매하세요!</p>
          <div
            className="flex items-center justify-center ml-2"
            style={{
              width: '124px',
              height: '36.46px',
              background: 'var(--color-primary-700)',
              border: '2px solid var(--color-border-zet)',
              borderRadius: '12px',
            }}
          >
            <Icon
              src={IMAGE_PATHS.PACKAGE_A}
              alt="패키지 아이콘"
              className="mr-2 w-[20px] h-[20px]"
            />
            <span className="body-16-bold text-badge-cyan">200</span>
            <span className="body-16-bold text-badge-cyan ml-1">ZET</span>
          </div>
        </div>
        <div className="flex flex-col gap-3 mb-6">
          {packages.map((pkg) => (
            <ZetChargePackageCard key={pkg.id} id={pkg.id} zet={pkg.zet} price={pkg.price} />
          ))}
        </div>
      </div>
    </div>
  );
}
